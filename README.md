This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

## Command for local https

```bash
npx local-ssl-proxy --key localhost-key.pem --cert localhost.pem --source 3001  --target 3000
```

[https://www.makeswift.com/blog/accessing-your-local-nextjs-dev-server-using-https](
    https://www.makeswift.com/blog/accessing-your-local-nextjs-dev-server-using-https
)
