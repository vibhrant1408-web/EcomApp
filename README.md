# EcomApp - Setup Guide

A modern React Native ecommerce application with authentication, product browsing, shopping cart, and checkout functionality.

## 📱 Project Overview

**EcomApp** is a full-featured mobile ecommerce application built with React Native featuring:
- User authentication (Login/Signup)
- Product browsing and discovery
- Shopping cart management
- Checkout process with shipping & payment options
- User profile management
- Redux state management
- Firebase integration

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **React Native CLI** - Install globally: `npm install -g react-native-cli`
- **Android Studio** with Android SDK (for Android development)
- **Java Development Kit (JDK)** 11 or higher
- **Xcode** (for iOS development on macOS)
- **Git** for version control

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd EcomApp
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Firebase Configuration**
   - Place your `google-services.json` file in `android/app/` directory
   - Update Firebase configuration in `src/services/firebase.js` if needed

4. **Android Setup (if developing for Android)**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

5. **Clear Metro Bundler Cache**
   ```bash
   npm run clear
   ```

## 📲 Running the App

### Android
```bash
npm run android
```

### iOS (macOS only)
```bash
npm run ios
```

### Start Metro Bundler (Manual)
```bash
npm start
```

Then press:
- `a` for Android
- `i` for iOS
- `r` to reload
- `d` to open developer menu

## 📁 Project Structure

```
EcomApp/
├── src/
│   ├── assets/              # Images, icons, and other static files
│   ├── components/          # Reusable React components
│   │   ├── Button.js
│   │   ├── CartItem.js
│   │   ├── ProductCard.js
│   │   ├── TextField.js
│   │   └── ...
│   ├── navigation/          # Navigation configuration
│   │   ├── RootNavigator.js
│   │   ├── MainNavigator.js
│   │   └── AuthNavigator.js
│   ├── redux/               # Redux store and slices
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── cartSlice.js
│   │       ├── productsSlice.js
│   │       └── orderSlice.js
│   ├── screens/             # Screen components
│   │   ├── HomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── CartScreen.js
│   │   ├── CheckoutScreen.js
│   │   ├── ProfileScreen.js
│   │   └── ...
│   ├── services/            # API and external services
│   │   ├── api.js
│   │   └── firebase.js
│   └── utils/               # Utility functions and theme
│       ├── theme.js
│       ├── validation.js
│       └── index.js
├── android/                 # Android native code
├── ios/                     # iOS native code
├── App.tsx                  # Root component
├── index.js                 # Entry point
├── package.json             # Dependencies
└── README.md                # Documentation
```

## 🛠️ Available Scripts

```bash
# Start development
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Build Android APK
npm run build

# Clear Android build cache
npm run clear

# Run tests
npm test

# Lint code
npm run lint
```

## 🎨 Features

### Authentication
- User login and registration
- Firebase authentication integration
- Secure password handling
- Session persistence

### Home Screen
- Browse featured and trending products
- Search functionality
- Category filters
- Product recommendations

### Product Details
- Detailed product information
- High-quality product images
- Customer ratings and reviews
- Quick add to cart button

### Shopping Cart
- View all cart items
- Adjust quantities
- Remove items
- Real-time price updates
- Persistent cart state

### Checkout Process
- Multi-step checkout (Shipping → Payment → Confirmation)
- Shipping address form
- Shipping method selection
- Payment method selection
- Order summary and confirmation

### User Profile
- View user information
- Order history
- Saved addresses
- Wishlist management
- Account settings

## 🔧 Configuration

### Theme Customization
Edit `src/utils/theme.js` to customize colors, spacing, and typography:

```javascript
export const colors = {
  primary: '#508A7B',
  white: '#FCFCFD',
  dark: '#1A1D26',
  gray_400: '#777E90',
  // ... more colors
};

export const spacing = {
  sm: 4,
  md: 16,
  lg: 24,
  // ... more spacing values
};
```

### API Configuration
Update API endpoints in `src/services/api.js`:

```javascript
const API_BASE_URL = 'your_api_endpoint_here';
```

### Redux Store
State management is handled through Redux. Check `src/redux/slices/` for store configuration.

## 📦 Dependencies

- **React Navigation** - Navigation library
- **Redux Toolkit** - State management
- **Firebase** - Authentication and backend
- **Axios** - HTTP client
- **React Native Gesture Handler** - Touch handling

## 🐛 Troubleshooting

### Android Build Issues
```bash
# Clear build cache
npm run clear

# Invalidate Android Studio cache
# File → Invalidate Caches → Invalidate and Restart
```

### Metro Bundler Issues
```bash
# Clear Metro cache
npm start -- --reset-cache
```

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Android SDK Issues
- Ensure Android SDK is properly installed
- Update SDK tools in Android Studio
- Set correct `ANDROID_HOME` environment variable

### Firebase Configuration
- Verify `google-services.json` is in correct location
- Ensure Firebase project is properly configured
- Check Firebase console for project settings

## 🔐 Security Considerations

- Never commit sensitive files (`.env`, `google-services.json`)
- Use environment variables for API keys
- Validate all user input
- Secure authentication tokens
- Use HTTPS for API calls

## 📱 Testing

```bash
# Run Jest tests
npm test

# Run lint check
npm run lint
```

## 🎯 Next Steps

1. **Customize Branding** - Update app name, logo, and colors
2. **Configure Firebase** - Set up Firebase project and authentication
3. **Connect API** - Update backend API endpoints
4. **Add More Features** - Implement additional screens and functionality
5. **Test Thoroughly** - Test on multiple devices and OS versions

## 📚 Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [Redux Documentation](https://redux.js.org/)
- [Firebase Docs](https://firebase.google.com/docs)
- [React Native Community](https://github.com/react-native-community)

## 🤝 Support

For issues or questions:
1. Check existing GitHub issues
2. Consult the troubleshooting section
3. Review React Native documentation
4. Contact development team

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Contributors

- Development Team

---

**Last Updated:** March 2026

For the latest information, check the project repository and documentation files.
