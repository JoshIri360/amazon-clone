# Amazon Clone with Next.js

Welcome to the Amazon Clone project! This is a web application built using Next.js, designed to replicate the functionality of the Amazon platform. The project incorporates the Stripe API for payment processing, Zustand for state management, and utilizes the FakeStore API to fetch product data. Next Auth has been implemented for user authentication.

## Features

- **Amazon-like Interface**: The project provides a user-friendly interface inspired by the Amazon website, ensuring a familiar and intuitive user experience.

- **Stripe Integration**: Securely process payments using the Stripe API. Users can seamlessly make purchases with confidence.

- **Zustand State Management**: Zustand is employed to manage the application's state, ensuring efficient and scalable state management.

- **FakeStore API Integration**: Fetch realistic product data from the FakeStore API to simulate a real e-commerce environment with diverse products.

- **Next Auth for Authentication**: User authentication is implemented using Next Auth, providing a secure and streamlined authentication process.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JoshIri360/amazon-clone
   ```

2. Navigate to the project directory:

   ```bash
   cd amazon-clone
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a copy of `.env.example` and save as `.env.local` file in the root of the project and fill accordingly.

### Run the Application

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the Amazon Clone in action.

## Contributing

Contributions are welcome! Feel free to open issues, submit pull requests, or suggest improvements. Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgments

- The project makes use of the FakeStore API (link to the FakeStore API documentation).
- Thanks to the creators of Next.js, Stripe, Zustand, and Next Auth for their fantastic tools and libraries.