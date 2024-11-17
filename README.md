# Sekta Selekta

A cross-platform event app built with Expo and React Native.

## 🛠 Technology Stack

- **Frontend**

  - Expo/React Native
  - Tamagui UI Framework
  - Firebase
  - React Query for data fetching
  - React Table for building tables
  - React Hook Form for form management with yup
  - Expo Router for navigation

- **Backend**
  - Firebase
    - Authentication
    - Firestore
    - Cloud Functions
    - Storage
    - Hosting

## 📱 Supported Platforms

- iOS
- Android
- Web (work in progress)

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
    npx expo start -c
   ```

3. Start the firebase emulator (new terminal window)
   need firebase CLI, install with:

   ```bash
    npm install -g firebase-tools
   ```

   firebase functions will not work on dev without emulators running.

   ```bash
    yarn emulators
   ```

   the emulator mock data will save locally on exit and be imported automatically the next time.

4. build and watch functions (new terminal window)
   ```bash
    cd functions
    npm run build:watch
   ```

## 🚢 Deployment

### Web Deployment

1. Deploy to Firebase Hosting:
   ```bash
   npm run deploy-hosting
   ```

### Functions Deployment

1. Build the functions:

   ```bash
   cd functions
   npm run predeploy
   ```

2. Deploy to Firebase Functions:
   ```bash
   npm run deploy
   ```

### Mobile Deployment

Use EAS Build to create production builds.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
