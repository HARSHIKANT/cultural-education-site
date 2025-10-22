#!/bin/bash

echo "🇮🇳 Setting up Indian Cultural Learning Adventure - React Version"
echo "================================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "❌ Node.js version 14 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 To start the development server, run:"
    echo "   npm start"
    echo ""
    echo "🌐 The app will be available at: http://localhost:3000"
    echo ""
    echo "📚 For more information, check the README.md file"
else
    echo "❌ Failed to install dependencies. Please check the error messages above."
    exit 1
fi

