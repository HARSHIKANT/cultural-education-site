# Indian Cultural Learning Adventure - React Version

A beautiful, interactive cultural education website built with React and Three.js, designed to teach children about Indian culture through 3D experiences, games, and stories.

## Features

- 🎮 **Interactive 3D Scene**: Explore Indian cultural symbols in 3D
- 🏛️ **Cultural Monuments**: Learn about famous Indian landmarks
- 🎭 **Traditional Arts**: Discover classical dances and music
- 🍛 **Culinary Heritage**: Explore Indian cuisine and food culture
- 🎪 **Festivals**: Celebrate Diwali, Holi, and other festivals
- 📚 **Interactive Learning**: Art & craft, stories, and music activities
- 📱 **Responsive Design**: Works on all devices

## Technologies Used

- **React 18**: Modern React with hooks
- **Three.js**: 3D graphics and animations
- **CSS3**: Modern styling with gradients and animations
- **JavaScript ES6+**: Modern JavaScript features

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## Project Structure

```
src/
├── components/
│   ├── LoadingScreen.js      # Loading animation
│   ├── Navigation.js         # Navigation bar
│   ├── Hero.js              # Hero section with 3D scene
│   ├── ThreeScene.js        # Three.js 3D scene component
│   ├── Features.js         # Features grid
│   ├── InteractiveLearning.js # Learning activities
│   ├── CallToAction.js     # CTA section
│   └── Footer.js           # Footer component
├── App.js                   # Main app component
├── App.css                  # Main styles
├── index.js                 # React entry point
└── index.css                # Global styles
```

## Key Components

### ThreeScene Component
- Handles all 3D rendering with Three.js
- Creates interactive cultural objects (Rangoli, Lotus, Chakra)
- Manages mouse/touch interactions
- Includes floating particles and lighting

### Interactive Features
- Smooth scrolling navigation
- Hover animations and effects
- Click interactions with notifications
- Responsive design for mobile devices

## Customization

### Adding New Cultural Objects
1. Create a new function in `ThreeScene.js`
2. Add the object to the scene
3. Push to `culturalObjectsRef.current` array

### Styling
- Modify `App.css` for main styles
- Update component-specific styles in individual component files
- Use CSS custom properties for easy theming

### Adding New Features
1. Create new components in the `components/` folder
2. Import and use in `App.js`
3. Add corresponding styles

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Notes

- 3D scene is optimized for smooth 60fps animations
- Lazy loading for better initial page load
- Responsive images and optimized assets
- Efficient memory management for 3D objects

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or support, please contact:
- Email: harshikantdubey999@gmail.com
- Phone: +91 7091157431

---

Made with ❤️ for young learners exploring Indian culture!

