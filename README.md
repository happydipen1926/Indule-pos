# Indulge Cafe POS — Square-inspired build

This is an original POS interface inspired by common modern checkout patterns: a custom item grid, favourites, categories, search, cart, saved carts, cash/card recording, item library, reports, staff, settings and backup/restore.

It does **not** copy Square branding, code, logos, or proprietary assets.

## Upload to GitHub Pages
Upload all files in this folder to the root of your GitHub repository, replacing older POS files.

Main files:
- `index.html` — login
- `register.html` — account creation
- `dashboard.html` — dashboard
- `pos.html` — checkout screen
- `products.html` — item library
- `categories.html` — category management
- `orders.html` — transaction history
- `sales.html` — reports
- `staff.html` — staff list
- `backup.html` — backup and restore
- `settings.html` — business settings
- `styles.css`, `app.js`, `data.js`, `config.js`

## First use
1. Open the GitHub Pages URL.
2. Create an account.
3. Sign in.
4. Open Checkout.
5. Test a Cash transaction.
6. Open Reports and Orders.
7. Download a backup.

## Important limitation
This version uses browser localStorage. It works on one browser/device, but it is not a production cloud database and does not process real card payments.

For production use:
- connect Supabase or another secure database,
- add proper authentication/roles,
- use a supported payment/EFTPOS provider,
- keep regular backups,
- test tax/receipt requirements with your accountant or POS/payment provider.
