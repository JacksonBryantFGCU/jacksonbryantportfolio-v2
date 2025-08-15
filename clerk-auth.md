# Clerk Auth Integration

## Setup
1. Create project on Clerk.dev
2. Get your Publishable and Secret keys
3. Wrap your app in `<ClerkProvider>`
4. Use `useUser()` or `SignedIn`, `SignedOut` for conditional rendering

## Protect Routes
- Wrap `/admin` in `<SignedIn>` or use a custom `PrivateRoute`
