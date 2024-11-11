[![CodeFactor](https://www.codefactor.io/repository/github/krasipeace/dating-app/badge)](https://www.codefactor.io/repository/github/krasipeace/dating-app)

# HeartBound - Dating app

My `Learning by Doing` **Full-Stack App**, build with Next/React.

<details><summary>Home page</summary>
    <img src="assets/homepage.PNG" width="550" title="home page">
</details>

## Features 

In the app there are 2 roles: 
<details><summary>- <b>ADMIN</b>(for administrators) - Work with the app on the back scene.</summary>
    <img src="assets/adminview.PNG" width="350" title="Admin nav/menu">
</details>

<details><summary>- <b>MEMBER</b>(for users) - use the app as it should be used.</summary>
    <img src="assets/userMenu.PNG" width="350" title="User nav/menu">
</details>

<br />

#### As user

<details><summary>- Browse other users via different filters.</summary>
    <img src="assets/members.PNG" width="550" title="browse users">
</details>

<details><summary>- Like/unlike other users.</summary>
    <img src="assets/likes.PNG" width="550" title="check what you liked, what liked you">
</details>

<details><summary>- Send messages to other users.</summary>
    <img src="assets/messages.PNG" width="550" title="send messages, receive messages">
</details>

<details><summary>- Live chat with other users.</summary>
    <img src="assets/chat.PNG" width="550" title="live chat">
</details>

<details><summary>- Upload images</summary>
    <img src="assets/uploadImage.PNG" width="550" title="upload image">
</details>

<details><summary>- Delete/Report messages</summary>
    <img src="assets/reportMessageByUser.PNG" width="550" title="report message as user">
</details>

#### As Administrator

<details><summary>- Get Access to Server/Client sessions</summary>
    <img src="assets/adminhomepage.PNG" width="350" title="session">
</details>

<details><summary>- Moderate `user photos`</summary>
    <img src="assets/adminImages.PNG" width="550" title="admin photos view">
</details>

<details><summary>- Moderate `reported messages`</summary>
    <img src="assets/reportedmessages.PNG" width="550" title="admin reported messages view">
</details>

<details><summary>- Admin View</summary>
    <img src="assets/adminview.PNG" width="550" title="admin main view">
</details>

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

`N.B.:`
`You can register with your email and password, and your confirmation email will not be send, due to this, I highly recommend to use Github or Google as login at [https://heartbound.vercel.app](https://heartbound.vercel.app). Because of the nature of resend, which is my email-provider and its set-up only for testing as free version. You will also never receive email for reset-password functionality, due to same reason.`

<hr>
<details><summary>Registration (part 1)</summary>
    <img src="assets/registerpart1.PNG" width="350" title="registration with creds part 1">
</details>

<details><summary>Registration (part 2)</summary>
    <img src="assets/registerpart2.PNG" width="350" title="registration with creds part 2">
</details>

<details><summary>Registration (verification token in DB)</summary>
    <img src="assets/regpart2emailtoken.PNG" width="350" title="verification token on complete profile">
</details>

<details><summary>Verification Email</summary>
    <img src="assets/verificationmail.PNG" width="350" title="sent verification email">
    <img src="assets/afterVerification.PNG" width="350" title="in-app result after verification success">
</details>

Login and use the app.

<details><summary>  - Login via Github</summary>
    <img src="assets/githublogin.PNG" width="350" title="Github login">
</details>

<details><summary>  - Login via Gitlab</summary>
    <img src="assets/gitlablogin.PNG" width="350" title="Gitlab login">
</details>

<details><summary>  - Login via Google(might still not work, because Google is verifying it)</summary>
    <img src="assets/googlelogin.PNG" width="350" title="Logging with Google">
    <img src="assets/googlelogin2.PNG" width="350" title="Logging with Google confirmation privacy">
</details>

<details><summary>Finish Login with Social Acc</summary>
    <img src="assets/finishLoginWithSocialAcc.PNG" width="350" title="Complete your profile">
</details>

<br />

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
- Locally, you can check [`.env.example`](.env.example) for the needed secrets in your `.env` config to seed and run your own administrator.

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

Test Users pictures from [freepik](https://www.freepik.com)
Home page gif created with [Canva](https://www.canva.com)

### Deploy on Vercel

App is deployed on Vercel at [link](https://heartbound.vercel.app).

[to top](#heartbound---dating-app)