#!/bin/bash

echo "🚀 Starting BlogApp Full Stack..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"
echo ""

# Start Backend
echo "📦 Starting Backend Server on port 7777..."
cd /Users/rachitgupta/Desktop/BlogApp/server
npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

sleep 3

# Start Frontend
echo "🎨 Starting Frontend Server on port 3000..."
cd /Users/rachitgupta/Desktop/BlogApp/client
npx next dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo "✅ Both servers are starting!"
echo ""
echo "📍 URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:7777/api"
echo ""
echo "📋 Logs:"
echo "   Backend: tail -f /tmp/backend.log"
echo "   Frontend: tail -f /tmp/frontend.log"
echo ""
echo "To stop servers, run: kill $BACKEND_PID $FRONTEND_PID"
echo "Or press Ctrl+C and then manually stop the processes"
echo ""

# Keep script running
wait
