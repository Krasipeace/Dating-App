# HeartBound - Dating app

My `Learning by Doing` **Full-Stack App**, build with Next/React.

## Features 

In the app there are 2 roles: 
- `ADMIN`(for administrators) - Work with the app on the back scene.
- `MEMBER`(for users) - use the app as it should be used.

#### As user
- Browse other users via different filters.
- Like/unlike other users.
- Send messages to other users.
- Live chat with other users.
- Upload images
- Report messages

#### As Administrator
- Get Access to Server/Client sessions
- Moderate `user photos`
- Moderate `reported messages`

### Getting Started

#### As Developer
- Install Dependencies
    ```bash
    npm install
    ```

- Run development server:
    ```bash
    npm run dev
    ```

- PostgreDB as Docker Container set-up

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
- Apply migrations + seed database
  
    ```bash
    npx prisma reset
    ```

- Run Prisma studio
  
    ```bash
    npx prisma studio
    ```

Open .env.example to understand what secrets do you need in your .env config file.

#### As User 

Login and use the app.
  - Login via Github
  - Login via Google

Login with test users info:
- TestUser1 - Anna:
  - Email: `anna@test.com`
  - Password: `testPassword`
- TestUser2 - Cassia:
  - Email: `cassia@test.com`
  - Password: `testPassword`
- TestUser3 - Andrei:
  - Email: `andrei@test.com`
  - Password: `testPassword`
- TestUser4 - Elin:
  - Email: `elin@test.com`
  - Password: `testPassword`

#### As Administrator

- Login as admin is not available at `heartbound.vercel.app`
- Locally, you can check `.env.example` for the needed secrets in your `.env` config to seed(**implemented**) and run your own administrator.

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
- [Docker](https://www.docker.com/)
- [Cloudinary](https://cloudinary.com/)
- [Pusher](https://pusher.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Resend](https://resend.com/)

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

[to top](#heartbound---dating-app)