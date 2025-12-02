const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined their room`);
        });

        socket.on('join_chat', (chatId) => {
            socket.join(chatId);
            console.log(`Socket ${socket.id} joined chat ${chatId}`);
        });

        socket.on('send_message', async (data) => {
            try {
                const { chatId, senderId, content } = data;

                // Save message to database
                const message = new Message({
                    chat: chatId,
                    sender: senderId,
                    content
                });
                await message.save();

                // Update chat's last message
                await Chat.findByIdAndUpdate(chatId, {
                    lastMessage: message._id,
                    updatedAt: Date.now()
                });

                // Populate sender info
                await message.populate('sender', 'displayName photoURL');

                // Emit to chat room
                io.to(chatId).emit('receive_message', message);

                // Notify participants (for chat list updates)
                const chat = await Chat.findById(chatId);
                chat.participants.forEach(participantId => {
                    if (participantId.toString() !== senderId) {
                        io.to(participantId.toString()).emit('chat_updated', {
                            chatId,
                            lastMessage: message
                        });
                    }
                });

            } catch (error) {
                console.error('Error sending message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
