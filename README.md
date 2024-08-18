# Bazaar

This modern e-commerce application is built with Next.js, featuring a responsive design and integration with the DummyJSON API for product data.

## Features

- **Product Listing**: Browse through a paginated list of products.
- **Search Functionality**: Search for products in real-time.
- **Shopping Cart**: Add products to your cart and manage quantities.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Order Confirmation**: Checkout process with a thank you page.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/lakshayman/bazaar.git
   ```

2. Navigate to the project directory:
   ```
   cd bazaar
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `pages/`: Contains the main pages of the application.
  - `index.tsx`: Home page with product listing and search functionality.
  - `cart/`: Shopping cart page.
  - `thank-you/`: Order confirmation page.
- `components/`: Reusable React components.
- `context/`: React context for global state management (e.g., CartContext).

## API Integration

This project uses the [DummyJSON](https://dummyjson.com/) API to fetch product data. The integration can be found in the `pages/index.tsx` file.

## Deployment

This application can be easily deployed to platforms like Vercel or Netlify. Refer to their respective documentation for deployment instructions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
