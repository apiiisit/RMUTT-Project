# Backend

## Requirement
- [node.js LTS 18](https://github.com/nodesource/distributions/blob/master/README.md)
- [PostgreSQL 15](https://wiki.postgresql.org/wiki/Apt)
- [pnpm](https://pnpm.io/installation)

## Setup
### Install PostgreSQL 15
import the repository signing key
```bash
sudo apt install curl ca-certificates gnupg -y
curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/apt.postgresql.org.gpg > /dev/null
```

add PostgreSQL's repo
```bash
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
```

install
```bash
sudo apt update
sudo apt install postgresql-15 -y
```

create db and user
```bash
sudo su - postgres
psql
create role USERNAME with login superuser createdb createrole password 'PASSWORD';
create database DBNAME encoding utf8;
grant all privileges on database DBNAME to USERNAME;
```

This is your DATABASE_URL for ``.env``

```DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DBNAME?schema=public"```

### Installation

1. ``pnpm install``
2. ``pnpm push:force``
3. ``pnpm generate``
4. Create ``.env``

you can generate token secret from this nodejs command.

```js
> require('crypto').randomBytes(64).toString('hex')
'951f1ca12e97f77f3585fd5a8cc69b2f0a9f9cd64baed9cdfb60020dfb44ae64701b5766c22bc7c504aa2a68b9c4cde5ae16d742c232370458622b501bbe9872'
```

## Run
``pnpm run start``