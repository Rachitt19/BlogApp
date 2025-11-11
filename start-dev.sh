#!/bin/bash

echo "🚀 Starting BlogApp..."
echo ""
echo "Starting Backend Server (Port 7777)..."
cd server
npm run dev &
SERVER_PID=$!

sleep 3

echo ""
echo "Starting Frontend Server (Port 3000)..."
cd ../client
npm run dev &
CLIENT_PID=$!

echo ""
echo "✅ Both servers are running!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:7777/api"
echo ""
echo "To stop the servers, press Ctrl+C"
echo ""

# Keep the script running
wait
