# PERN - TypeScript - Administrador de productos

REST API para administrar productos.

## Tecnologías

* Node
* Express
* TypeScript
* Sequelize


## Dependencias

### Desarrollo

* nodemon
* ts-node
* typescript (tsc para compilar ts a js)
* prisma

### Producción

* express
* express and node types
* prisma client

## Comandos útiles

```cmd
tsc -w
nodemon dist/index.js
```

## Prisma

Se utiliza prisma para gestionar las migraciones de los modelos a la base de datos, algunos comandos útlies son:

```cmd
npx prisma init
npx prisma migrate dev --name init
npx prisma studio
```
