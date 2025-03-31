# SpendWise

SpendWise is a Full-Stack SaaS application designed to help users efficiently track their expenses. It provides insightful analytics and seamless payment management using Stripe.

## Features

- **Expense Tracking**: Easily add, edit, and delete expenses.
- **Analytics Dashboard**: Gain insights into spending patterns using PostHog.
- **User Authentication**: Secure authentication system.
- **Subscription Management**: Integrates with Stripe for managing payments.
- **Responsive UI**: Built with a modern and intuitive design for a seamless experience.

## Tech Stack

**Frontend:**
- Next.js
- TypeScript
- TailwindCSS

**Backend:**
- Node.js (Next.js API routes)
- PostgreSQL (Database)
- Prisma ORM

**Other Services:**
- Stripe (Payments)
- PostHog (Analytics)
- Kinde (Authentication)

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- PostgreSQL
- A Stripe account
- A PostHog account

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/spendwise.git
   cd spendwise
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and add the following variables:
   ```env
   DATABASE_URL=your_database_url
   NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
   POSTHOG_API_KEY=your_posthog_key
   ```

4. Run database migrations:
   ```sh
   npx prisma migrate dev
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

1. Register or log in to your account.
2. Add your expenses and categorize them.
3. View analytics to understand your spending habits.
4. Subscribe to premium features via Stripe for enhanced tracking.

## License

This project is licensed under the MIT License.