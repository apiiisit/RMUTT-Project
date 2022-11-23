# Backend

## Requirement
- node.js LTS >= 18.2.0
- pnpm

## Setup / Reset
1. ``pnpm install``
2. ``pnpm update`` optional
3. ``npx prisma migrate reset -f``
4. ``npx prisma db push``
5. ``npx prisma generate``
6. Create ``.env`` and change masterpassword and token secret. you can generate secret from node.

```js
> require('crypto').randomBytes(64).toString('hex')
'951f1ca12e97f77f3585fd5a8cc69b2f0a9f9cd64baed9cdfb60020dfb44ae64701b5766c22bc7c504aa2a68b9c4cde5ae16d742c232370458622b501bbe9872'
```

## Run
``pnpm run start``