# Sekta Selekta

A cross-platform event app built with Expo and React Native.

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
    npx expo start -c
   ```

3. Start the firebase emulator (in new terminal window)
   
   *needs firebase CLI, install with:*

   ```bash
    npm install -g firebase-tools
   ```

   **firebase services will not work on dev without emulators running**

   ```bash
    yarn emulators
   ```

   the emulator mock data will save locally on exit and be imported automatically the next time.

5. if working on functions, build and watch on change (in new terminal window)
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

