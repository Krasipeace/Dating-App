# Dating App

Simple Dating App build with React and PostgreSQL. 

## Tech Stack / Libraries / Packages

- [Next.js](https://nextjs.org/)
- [NextUI](https://nextui.org/)
- [NextAuth.js](https://authjs.dev/getting-started/installation)
- [React](https://react.dev/)
- [React-Icons](https://react-icons.github.io/react-icons/)
- [React Hook Form](https://www.react-hook-form.com/)
- [React-Toastify](https://www.npmjs.com/package/react-toastify)
- [TailwindCSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)
- [PrismaORM](https://authjs.dev/getting-started/adapters/prisma)
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [Cloudinary](https://cloudinary.com/)
- [NextCloudinary](https://next.cloudinary.dev/)

### Getting Started

- Run development server:
    ```bash
    npm run dev
    ```

- Postgres DB as Docker Container set-up

    ```bash
    docker compose up -d
    ```

    ```bash
    npx prisma generate
    ```

    ```bash
    npx prisma db push
    ```

    ```bash
    npx prisma db seed
    ```

- Run Prisma studio
    ```bash
    npx prisma studio
    ```

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
