import swaggerJsdoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express"

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API",
      version: "1.0.0",
      description: "REST API | NodeJs | Express | Typescript"
    },
    tags: [
      {
        name: "Products",
        description: "API endpoints related to products"
      }
    ]
  },
  apis: ["./src/products/routes/*.ts"]
}

const openApiSpecification = swaggerJsdoc(options)
const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link {
      content: url("https://res.cloudinary.com/dn1zvmx7q/image/upload/v1726624458/znhahictgh75ailemahy.png");
      height: 5rem;
      width: 5rem;
      margin-inline: auto;
    }
    .swagger-ui .topbar a {
      flex: 0
    }
    @media(min-width: 600px) {
    .topbar-wrapper .link {
      margin-inline: unset;
    }
    }
    .swagger-ui .topbar {
      background-color: #384B70;
    }
  `,
  customSiteTitle: "REST API - Express | TS"
}

export default openApiSpecification
export {
  swaggerUiOptions
}