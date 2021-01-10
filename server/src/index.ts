import express = require("express");
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import session from "express-session";
import "reflect-metadata"; // https://blog.logrocket.com/integrating-typescript-graphql/
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { ItemResolver } from "./resolvers/item";
import { MyContext } from "./types";

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );

  app.use(
    session({
      name: "E-commerce cookie",
      resave: false,
      saveUninitialized: false, // Will create a session by default (but setting to false prevents this)
      secret: "hello",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years max age
        path: "/",
        httpOnly: true, // Security reason --> JS code on frontend cant access cookie
        sameSite: "lax", // csrf
        domain: undefined
      }
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, ItemResolver]
    }),
    context: ({ req, res }): MyContext => ({
      req,
      res
    })
  });

  apolloServer.applyMiddleware({
    app,
    cors: false
  });

  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000");
  });
};

main().catch(err => {
  console.log(err);
});
