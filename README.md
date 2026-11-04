# My Closet 👚

A responsive e-commerce storefront built with React and designed as second hand clothing store.
This is a portfolio project built to learn React. It is a frontend application that uses a small, separately hosted backend to simulate Stripe payments.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-markup-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-styles-1572B6?logo=css3&logoColor=white)

## 🌐 Live Site
**[athomas97.github.io/ecommerce_website/](https://athomas97.github.io/ecommerce_website/)**

## Features
### Viewing the Products
- Product catalog with search, filters, and sorting
- Catalog displays a no-results message when search or filters find no products
- Out-of-stock products are clearly marked and cannot be added to the cart
### Maining the Shopping Cart
- Persistent shopping cart with options to add, update, and remove items
- The checkout page has real-time progress indicator for how far away the customer is from unlocking free shipping
- Checkout displays an empty-cart message when the cart has no items
### Checkout Process
- Stripe Sandbox checkout simulation; no real payments are processed
- Order confirmation displays the payment status after checkout
- Cart contents are cleared after successful payment

> [!WARNING]
> Do not enter real personal or payment information during checkout. Use the Stripe test details below:
>
> - **Email:** Any fictional email address
> - **Card number:** `4242 4242 4242 4242`
> - **Cardholder name:** Any fictional name
> - **Expiry:** `12/34`
> - **CVC:** `123`
>
> These details are for Stripe test mode only and do not process a real payment.

## Tech stack

- **React** 19
- **React Router** 7
- **Vite** 8
- Oxlint
- GitHub Actions and GitHub Pages for deployment

## Installation

```bash
git clone https://github.com/athomas97/ecommerce_website.git
cd ecommerce_website/ecommerce_website
npm ci
```

## Development

Start the local Vite development server:

```bash
npm run dev
```

Vite prints the local URL in the terminal (usually `http://localhost:5173`). Stop the server with `Ctrl+C`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot module replacement |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

To check a production build locally:

```bash
npm run build
npm run preview
```

## Deployment

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`. It installs dependencies, builds the frontend, prepares a `404.html` fallback for client-side routes, and deploys the `dist/` directory to GitHub Pages.

To enable deployment:

1. In GitHub, open the repository's **Settings → Pages**.
2. Set the build and deployment source to **GitHub Actions**.
3. Push or merge a change to the `main` branch, or manually run the **Deploy to GitHub Pages** workflow from the Actions tab.

The Vite base path is configured as `/ecommerce_website/` in `ecommerce_website/vite.config.js` to match this repository's GitHub Pages project URL. If the repository name or hosting path changes, update that `base` value before deploying.

## Checkout backend

This repository contains the storefront frontend. Checkout and payment verification use the API endpoint configured as `CHECKOUT_API_URL` in `ecommerce_website/src/constants.js`. The backend is hosted separately; a working deployed backend is required for payment and order-confirmation flows.

## Project layout

```text
ecommerce_website/
├── .github/workflows/       # GitHub Pages deployment workflow
├── README.md                # Project documentation
└── ecommerce_website/        # React + Vite application
    ├── src/
    │   ├── assets/          # Product images, icons, and catalog data
    │   ├── components/      # Shared UI components
    │   ├── hooks/           # React hooks
    │   ├── pages/           # Catalog, product, checkout, and confirmation pages
    │   └── utils/           # Filtering, sorting, cart, and asset helpers
    ├── package.json
    └── vite.config.js
```

## Product catalog

Product data is maintained in `ecommerce_website/src/assets/products.json`. Product images and shared icon assets are in `ecommerce_website/src/assets/`.
