"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const item_1 = require("./resolvers/item");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express();
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true
    }));
    app.use(express_session_1.default({
        name: "E-commerce cookie",
        resave: false,
        saveUninitialized: false,
        secret: "hello",
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            domain: undefined
        }
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver, item_1.ItemResolver]
        }),
        context: ({ req, res }) => ({
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
});
main().catch(err => {
    console.log(err);
});
//# sourceMappingURL=index.js.map