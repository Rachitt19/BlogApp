const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');
const Post = require('./src/models/Post');
const Community = require('./src/models/Community');

// Sample data
const sampleUsers = [
  { email: 'alice@example.com', password: 'Password123!', displayName: 'Alice Johnson' },
  { email: 'bob@example.com', password: 'Password123!', displayName: 'Bob Smith' },
  { email: 'charlie@example.com', password: 'Password123!', displayName: 'Charlie Brown' },
  { email: 'diana@example.com', password: 'Password123!', displayName: 'Diana Prince' },
  { email: 'eve@example.com', password: 'Password123!', displayName: 'Eve Williams' }
];

const sampleCommunities = [
  { name: 'Web Development', description: 'Discuss web development trends, frameworks, and best practices', icon: '💻', category: 'technology' },
  { name: 'Mobile Apps', description: 'Share and discuss mobile app development', icon: '📱', category: 'technology' },
  { name: 'AI & Machine Learning', description: 'Explore AI and ML technologies', icon: '🤖', category: 'technology' },
  { name: 'Design', description: 'UI/UX design discussions and inspiration', icon: '🎨', category: 'design' },
  { name: 'Business', description: 'Entrepreneurship and business tips', icon: '💼', category: 'business' },
  { name: 'Travel', description: 'Travel stories and recommendations', icon: '✈️', category: 'travel' },
  { name: 'Food & Cooking', description: 'Share recipes and cooking tips', icon: '🍳', category: 'food' },
  { name: 'Photography', description: 'Photography tips and showcasing work', icon: '📸', category: 'hobbies' }
];

const samplePosts = [
  {
    title: 'Getting Started with React Hooks',
    content: 'React Hooks have revolutionized the way we write React components. In this comprehensive guide, I\'ll walk you through everything you need to know about Hooks - from useState to useEffect and custom hooks.\n\nHooks allow you to use state and other React features without writing a class. They make code reusable and easier to understand. The most common hooks are:\n\n1. useState - Add state to functional components\n2. useEffect - Perform side effects\n3. useContext - Access context values\n4. useReducer - Manage complex state\n\nLet\'s dive deep into each one and see how they work in practice.',
    category: 'technology',
    tags: ['react', 'javascript', 'hooks', 'frontend']
  },
  {
    title: 'The Art of Minimalist Design',
    content: 'Minimalism in design is not about having less. It\'s about having exactly what you need and nothing more. This philosophy has transformed the way companies approach product design.\n\nKey principles of minimalist design:\n- Clarity: Remove all distracting elements\n- Focus: Direct attention to what matters\n- Space: Use whitespace effectively\n- Typography: Let fonts do the talking\n- Color: Limited palette with purpose\n\nMany successful companies like Apple, Google, and Airbnb follow minimalist design principles.',
    category: 'design',
    tags: ['design', 'minimalism', 'ui', 'creativity']
  },
  {
    title: 'Starting Your Tech Startup: A Beginner\'s Guide',
    content: 'So you want to start a tech startup. Great! But before you dive in, here are the essential things you need to know.\n\nFirst, identify a real problem. Don\'t just build cool technology - build technology that solves problems people actually have.\n\nSecond, assemble a great team. Your team will make or break your startup. Choose people who are passionate, skilled, and complement each other.\n\nThird, focus on product-market fit. Get your product in front of users quickly and iterate based on feedback.\n\nFourth, manage your finances carefully. Keep your burn rate low while you validate your idea.\n\nAnd finally, be persistent. Most startups fail, but those that succeed are the ones that persist through the tough times.',
    category: 'business',
    tags: ['startup', 'entrepreneurship', 'business', 'tips']
  },
  {
    title: 'Hidden Gems: 5 Underrated Travel Destinations',
    content: 'Tired of the same old tourist destinations? Let me introduce you to some amazing places that don\'t get nearly enough attention.\n\n1. **Faroe Islands** - Between Iceland and Norway, these islands offer breathtaking landscapes and fewer tourists.\n\n2. **Ohrid, Macedonia** - A beautiful lakeside town with ancient history and stunning architecture.\n\n3. **Luang Prabang, Laos** - Serene temples, good food, and friendly locals make this a must-visit.\n\n4. **Sintra, Portugal** - Fairy-tale palaces nestled in misty mountains.\n\n5. **Chiang Rai, Thailand** - Less crowded than Bangkok and Chiang Mai, but equally captivating.\n\nThese destinations offer authentic experiences without the massive tourist crowds.',
    category: 'travel',
    tags: ['travel', 'destinations', 'adventure', 'tips']
  },
  {
    title: 'Mastering MongoDB: Indexing for Performance',
    content: 'Database performance is crucial for any application. One of the most effective ways to improve MongoDB performance is through proper indexing.\n\nWhy indexing matters:\n- Reduces query execution time\n- Reduces server CPU usage\n- Improves overall application performance\n\nBest practices for MongoDB indexing:\n1. Index frequently queried fields\n2. Use compound indexes for multi-field queries\n3. Monitor index usage with explain()\n4. Remove unused indexes\n5. Consider index size vs performance gain\n\nWhen used correctly, indexes can dramatically improve your database performance.',
    category: 'technology',
    tags: ['mongodb', 'database', 'performance', 'backend']
  },
  {
    title: 'The Coffee Culture Around the World',
    content: 'Coffee is more than just a beverage - it\'s a cultural phenomenon that brings people together across continents.\n\nIn Turkey, coffee is prepared slowly in a special pot called a cezve, and the ritual is as important as the drink itself.\n\nIn Italy, an espresso at the bar is a quick, social affair. Italians treat coffee with reverence.\n\nIn Ethiopia, coffee ceremonies are a traditional way of showing respect and friendship.\n\nIn Scandinavia, coffee is about coziness (hygge) and quality.\n\nIn the USA, coffee culture has evolved into specialty and third-wave coffee.\n\nEach culture has its own unique relationship with coffee, and exploring these differences is a wonderful way to understand different communities.',
    category: 'food',
    tags: ['coffee', 'culture', 'food', 'travel']
  },
  {
    title: 'Python Tips and Tricks for Developers',
    content: 'Python is a versatile language, but many developers don\'t know about some of its hidden features. Here are some useful tips:\n\n1. **List Comprehensions** - Write more concise and readable code:\n   ```python\n   squares = [x**2 for x in range(10)]\n   ```\n\n2. **Unpacking** - Extract multiple values easily:\n   ```python\n   a, b, *rest = [1, 2, 3, 4, 5]\n   ```\n\n3. **enumerate()** - Get both index and value:\n   ```python\n   for i, value in enumerate(my_list):\n   ```\n\n4. **f-strings** - Modern string formatting:\n   ```python\n   name = "John"\n   print(f"Hello, {name}!")\n   ```\n\nMastering these tricks will make you a more efficient Python developer.',
    category: 'technology',
    tags: ['python', 'programming', 'tips', 'development']
  },
  {
    title: 'Photography in Golden Hour: Capturing Perfect Light',
    content: 'The golden hour - that magical time shortly after sunrise or before sunset - is every photographer\'s favorite time to shoot.\n\nWhy is golden hour special?\n- Soft, directional light that flatters subjects\n- Warm color temperature\n- Long shadows that add depth\n- Natural diffusion through atmospheric particles\n\nTips for golden hour photography:\n1. Plan your shoots - know the exact time of golden hour\n2. Scout locations beforehand\n3. Use the warm light creatively\n4. Experiment with silhouettes\n5. Don\'t fear shadows - they create drama\n\nMost professional photographers will tell you that mastering golden hour photography is one of the best investments of your time.',
    category: 'hobbies',
    tags: ['photography', 'tips', 'golden-hour', 'art']
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed database
const seedDatabase = async () => {
  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Post.deleteMany({});
    await Community.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(user.password, salt);
        return new User({
          ...user,
          password: hashedPassword
        });
      })
    );

    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create communities
    console.log('🏘️  Creating communities...');
    const createdCommunities = await Community.insertMany(
      sampleCommunities.map((comm, index) => ({
        ...comm,
        creator: createdUsers[index % createdUsers.length]._id,
        members: [createdUsers[index % createdUsers.length]._id],
        moderators: [createdUsers[index % createdUsers.length]._id],
        memberCount: 1
      }))
    );
    console.log(`✅ Created ${createdCommunities.length} communities`);

    // Create posts with better community assignment
    console.log('📝 Creating posts...');
    
    // Map posts to communities based on category
    const postsToCommunities = [
      { postIndex: 0, communityIndex: 0 }, // React Hooks -> Web Development
      { postIndex: 1, communityIndex: 3 }, // Minimalist Design -> Design
      { postIndex: 2, communityIndex: 4 }, // Tech Startup -> Business
      { postIndex: 3, communityIndex: 5 }, // Travel Destinations -> Travel
      { postIndex: 4, communityIndex: 0 }, // MongoDB Indexing -> Web Development
      { postIndex: 5, communityIndex: 6 }, // Coffee Culture -> Food & Cooking
      { postIndex: 6, communityIndex: 0 }, // Python Tips -> Web Development
      { postIndex: 7, communityIndex: 7 }  // Photography Golden Hour -> Photography
    ];
    
    const createdPosts = await Post.insertMany(
      samplePosts.map((post, index) => {
        const assignment = postsToCommunities[index] || { postIndex: index, communityIndex: index % createdCommunities.length };
        const community = createdCommunities[assignment.communityIndex];
        
        return {
          ...post,
          author: createdUsers[index % createdUsers.length]._id,
          authorName: createdUsers[index % createdUsers.length].displayName,
          community: community._id,
          likes: [],
          views: Math.floor(Math.random() * 100) + 10, // Random views between 10-110
          comments: []
        };
      })
    );
    
    // Update communities with their posts
    console.log('📌 Linking posts to communities...');
    for (let i = 0; i < createdPosts.length; i++) {
      const assignment = postsToCommunities[i] || { postIndex: i, communityIndex: i % createdCommunities.length };
      const community = createdCommunities[assignment.communityIndex];
      community.posts.push(createdPosts[i]._id);
      await community.save();
    }
    
    console.log(`✅ Created ${createdPosts.length} posts`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`  • Users: ${createdUsers.length}`);
    console.log(`  • Communities: ${createdCommunities.length}`);
    console.log(`  • Posts: ${createdPosts.length}`);

    console.log('\n🔑 Test Accounts:');
    sampleUsers.forEach(user => {
      console.log(`  • Email: ${user.email} | Password: ${user.password}`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  }
};

// Run seeding
connectDB().then(seedDatabase);
