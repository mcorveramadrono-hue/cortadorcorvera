# Project rules

- Card payments use Stripe hosted Checkout (redirect via `create-checkout` returning `url`), not the embedded iframe — the embedded dialog broke on Link verification, mobile and 3D Secure.
- The cart is cleared only after `verify-stripe-session` confirms payment, so cancelled card payments keep the customer's basket.
- Local ham-cutting pages use the existing city route and matching sitemap entries; structured data describes service coverage, not unverified local offices.
