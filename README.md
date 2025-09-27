# NexBox Movies (Expo SDK 54)

A React Native app built with **Expo SDK 54**, TypeScript, Redux Toolkit, and Axios.
Browse TMDB categories, search, view details, and save movies to a persistent wishlist.

---

## Prerequisites

- **Node.js**: v18 or v20 recommended
- **npm** (comes with Node)
- macOS/Windows/Linux
- iOS Simulator (Xcode) and/or Android Emulator (Android Studio) — or a physical device with the **Expo Go** app

Check versions:
```bash
node -v
npm -v
```

---

## 1) Install Dependencies

```bash
# clone your repo
git clone <your-repo-url>
cd <your-project-folder>

# install deps
npm install
```

> If you run into cache issues later, you can do: `npx expo start -c`

---

## 2) Ensure Expo **SDK 54**

This project targets Expo SDK 54.

```bash
# verify installed expo version
npm ls expo

# pin/upgrade to SDK 54 if needed
npx expo install expo@^54.0.0

# optional: check for issues
npx expo-doctor
```

---

## 3) Get a TMDB API Key & Set `.env`

1. Create/log in at https://www.themoviedb.org/ and generate a **TMDB v3 API key**.
2. In the project root, **rename** `.env.example` → `.env`.
3. Open `.env` and paste your key:

```env
TMDB_API_KEY=YOUR_TMDB_V3_API_KEY_HERE
```

> Do **not** commit your real key — `.env` should be git-ignored.

---

## 4) Run the App

Start the Metro bundler:
```bash
npx expo start
```

From the terminal prompt:
- Press **i** to launch the **iOS Simulator** (macOS with Xcode installed)
- Press **a** to launch the **Android Emulator** (Android Studio installed)
- Or scan the QR code with **Expo Go** on your physical device

> After editing `.env` or `app.config.ts`, **fully stop** Metro and run `npx expo start` again.

---

## Common Issues

- **No movies appear**  
  Ensure `.env` contains `TMDB_API_KEY` (valid v3 key) and you restarted Metro.
- **Expo version mismatch**  
  Run `npx expo-doctor` and if needed: `npx expo install expo@^54.0.0`.
- **Stale cache**  
  Try `npx expo start -c`.

---

## Project Structure (quick)

```
src/
  app/
    store/
      hooks.ts
      slices/
        movies.slice.ts
        wishlist.slice.ts
  components/
    MovieCard.tsx
  screens/
    HomeScreen.tsx
    SearchScreen.tsx
    MovieDetailScreen.tsx
    WishlistScreen.tsx
  services/
    api.ts
    tmdb.ts
App.tsx
app.json
```

---

## Scripts (optional)
```bash
# start Metro
npx expo start

# if you added npm scripts:
npm run start
npm run android
npm run ios
```

---
