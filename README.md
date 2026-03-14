# EcomShop - React Native E-Commerce Application

A modern e-commerce mobile application built with React Native, demonstrating professional app development practices with focus on clean architecture and state management.

## Framework Choice

**React Native** was chosen for this project because:
- Strong ecosystem and community support
- Code reusability across iOS and Android with single codebase
- Fast development and iteration cycles
- Excellent performance for mobile applications
- Large pool of developers and libraries
- Ideal for MVP and rapid prototyping

## Features

### ✨ Core Functionality
- **Product Listing**: Browse products fetched from FakeStore API
- **Product Details**: View detailed information including description, rating, and pricing
- **Shopping Cart**: Add/remove items, adjust quantities with real-time total calculations
- **Checkout**: Order confirmation with order summary
- **Search & Filter**: Find products quickly with search functionality
- **Error Handling**: Graceful error states and retry mechanisms
- **Loading States**: Smooth loading indicators while fetching data

### 🏗️ Technical Architecture

#### State Management
- **Redux** with traditional setup (actions, reducers, types)
- React-Redux hooks (`useSelector`, `useDispatch`) for component integration
- Separate action creators and reducers for clarity
- Four store modules: auth, products, cart, orders

#### API Integration
- **Fake Store API** for product data (https://fakestoreapi.com)
- **Firebase** for authentication and user management
- **Axios** for HTTP requests with timeout configuration (10s)
- Clean separation of API logic in services layer

#### Code Organization
```
src/
├── components/        # Reusable UI components
├── screens/          # Screen/page components
├── redux/            # State management
│   ├── actions/      # Action creators
│   ├── reducers/     # Reducer functions
│   ├── types.js      # Action type constants
│   └── store.js      # Redux store configuration
├── services/         # API and external service integration
├── navigation/       # Navigation configuration
└── utils/           # Helper functions and themes
```
## How to Run

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- React Native CLI: `npm install -g react-native`
- Android Studio (for Android emulator) or Xcode (for iOS)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EcomShop
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on Android**
   ```bash
   npm run android
   # or
   react-native run-android
   ```

5. **Run on iOS**
   ```bash
   npm run ios
   # or
   react-native run-ios
   ```

### Development Server

The Metro bundler will start automatically and provide hot reload functionality. Simply save your file changes and the app will reload.

## Project Structure Details

### Redux Setup

**Actions** (`src/redux/actions/`):
- `authActions.js`: Authentication actions
- `productsActions.js`: Product fetching and filtering
- `cartActions.js`: Cart management (add, remove, update)
- `orderActions.js`: Order creation

**Reducers** (`src/redux/reducers/`):
- Handle state immutability
- Process action types and update state accordingly
- Include filter logic for products

**Types** (`src/redux/types.js`):
- Centralized action type constants
- Prevents typos and improves maintainability

### Screens

- **HomeScreen**: Product listing with search/filter
- **ProductDetailsScreen**: Detailed product view with add-to-cart button
- **CartScreen**: Shopping cart management
- **CheckoutScreen**: Order confirmation

### Components

- **ProductCard**: Product display with image, title, price, and rating
- **CartItem**: Individual cart item with quantity controls and remove button
- **SearchBar**: Product search with clear functionality
- **EmptyState**: Fallback UI when no data available
- **Loading**: Full-screen loading indicator
- **TextField**: Reusable text input with support for icons and multiline
- **PrimaryButton**: Main call-to-action button with loading state

## Key APIs

### Fake Store API Endpoints
- `GET /products` - Fetch all products with pagination
- `GET /products/{id}` - Fetch single product details
- `GET /products?title={query}` - Search products by title

## Input Validation

The app implements validation for:
- Email format validation in authentication
- Quantity validation (must be > 0)
- Cart item existence checks
- API response validation

## Error Handling

- Network error catch blocks with user-friendly messages
- Retry mechanisms for failed API calls
- Empty state handling for no products
- Loading state management during async operations

## Known Limitations

1. **Payment Processing**: Checkout shows confirmation only, no real payment gateway integration
2. **Cart Persistence**: Cart data not persisted across app restarts (can be enhanced with AsyncStorage)
3. **Product Images**: Some products may display placeholder images
4. **Offline Mode**: No offline-first capabilities implemented
5. **Real-time Updates**: No WebSocket or real-time sync with backend
6. **Category Filtering**: Limited to API-provided categories

## Future Improvements

### Priority 1 (High Impact)
- Add AsyncStorage for cart persistence
- Implement user authentication UI
- Add product image caching
- Implement wishlist functionality

### Priority 2 (Medium Impact)
- Add product reviews and ratings display
- Implement sort options (price, popularity, rating)
- Add order history screen
- Implement user profile management

### Priority 3 (Nice to Have)
- Add dark mode theme
- Implement barcode/QR scanning for products
- Add product recommendations
- Implement filters by price range, ratings
- Add multiple language support
- Implement push notifications

## Performance Optimizations

- FlatList with proper key extraction
- Component memoization where beneficial
- Redux selector optimization
- Image lazy loading and caching
- Pagination for large product lists

## Testing

To add tests:
```bash
npm test
```

Test files use Jest. Write tests in `__tests__` directory following the naming convention `*.test.js`.

## Dependencies

### Core
- `react-native`: Mobile app framework
- `react-navigation`: Navigation library
- `redux`: State management
- `react-redux`: React-Redux bindings
- `axios`: HTTP client

### UI
- `react-native-gesture-handler`: Gesture handling
- `react-native-safe-area-context`: Safe area support
- `react-native-screens`: Native screen containers

### Development
- `@babel/*`: Babel transpiler
- `eslint`: Code linting
- `jest`: Testing framework

## Building for Production

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
xcodebuild -workspace ios/EcomShop.xcworkspace -scheme EcomShop -configuration Release
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes following the existing code style
3. Write/update tests as needed
4. Submit a pull request with description

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues, questions, or contributions:
- Create an issue on GitHub
- Submit pull requests with detailed descriptions

---

**Last Updated**: March 2026
**Version**: 1.0.0
