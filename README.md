## STS

### Getting Started

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

### Required .env for [NextAuth.js](https://next-auth.js.org/getting-started/introduction)

```
NEXTAUTH_SECRET=
```

* Generate secret by:
    * ```openssl rand -base64 32```
    * [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

* Providers .env if required

    ```
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    
    GITHUB_CLIENT_ID=
    GITHUB_CLIENT_SECRET=
    ```


