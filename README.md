# Taekus Demo

A fintech card management demo app built with React Native, Expo, TypeScript, RTK Query, and Redux Toolkit.

## Screenshots

### Light Mode

| Login | Home | Card Detail |
|---|---|---|
| ![Login Light](screenshots/demo-login-light.png) | ![Home Light](screenshots/demo-home-light.png) | ![Card Detail Light](screenshots/demo-card-detail-light.png) |

| Activity | Transaction | Settings |
|---|---|---|
| ![Activity Light](screenshots/demo-activity-light.png) | ![Transaction Light](screenshots/demo-transaction-light.png) | ![Settings Light](screenshots/demo-settings-light.png) |

### Dark Mode

| Login | Home | Card Detail |
|---|---|---|
| ![Login Dark](screenshots/demo-login-dark.png) | ![Home Dark](screenshots/demo-home-dark.png) | ![Card Detail Dark](screenshots/demo-card-detail-dark.png) |

| Activity | Transaction | Settings |
|---|---|---|
| ![Activity Dark](screenshots/demo-activity-dark.png) | ![Transaction Dark](screenshots/demo-transaction-dark.png) | ![Settings Dark](screenshots/demo-settings-dark.png) |

## Tech Stack

- React Native + Expo (managed workflow)
- TypeScript
- Redux Toolkit + RTK Query
- React Navigation (bottom tabs + nested stacks)
- React Native Reanimated
- @shopify/flash-list
- expo-local-authentication, expo-haptics, expo-secure-store

## Architecture

- Feature-based directory structure
- Three-layer state management: RTK Query (server), Redux slice (auth), local state (UI)
- Custom data hooks separating business logic from UI
- Theme system with light/dark/system support
- Shared component library with accessibility defaults