# HeartBound 

Full-Stack Dating App build with React.

## Features 

In the app there are 2 roles: 
- User - use the app as it should be used.
- Adminitrator - Work with the app on the back scene.

#### As user
- Manage your User Data and/or images as registered user.
- Browse other users via different filters.
- Like/unlike other users.
- Send messages to other users.
- Live chat with other users.

#### As Administrator
- Approve/Disapprove images users upload.
- Manage reported messages from users.

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

### Tech Stack / Libraries / Packages

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
- [Pusher](https://pusher.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Resend](https://resend.com/)

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
