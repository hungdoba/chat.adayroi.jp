# Hungba Chat Support

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- Vietnamese news in Japan
- Edit prompt, fix, translate, and more
- Modern UI with Tailwind CSS
- Theme switching (light/dark)
- Optimized Google Fonts
- API routes for prompt, fix, and translate
- TypeScript for type safety
- ESLint and Prettier for code quality

## Folder Structure

```
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js app directory (routing, layout, providers)
│   ├── components/        # React components
│   │   └── ui/            # UI primitives
│   ├── constants/         # Static values (e.g., external links)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── services/          # API service functions
│   ├── types/             # TypeScript types
│   └── ...
├── .eslintrc.json         # ESLint config
├── .prettierrc            # Prettier config
├── jest.config.js         # Jest config
├── jest.setup.js          # Jest setup
├── README.md              # Project documentation
└── ...
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Noto Sans JP](https://fonts.google.com/specimen/Noto+Sans+JP).

## Testing

This project uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and integration tests.

To run tests:

```bash
pnpm test
```

Test files are located alongside components, e.g. `src/components/Navbar.test.tsx`.

## Code Quality

- ESLint and Prettier are configured for consistent code style and best practices.
- TypeScript is used throughout for type safety.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
