import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { NextPageContext } from "next";
import { withApollo as createWithApollo } from "next-apollo";

const client = (ctx: NextPageContext) =>
  new ApolloClient({
    link: createUploadLink({
      uri: "http://localhost:4000/graphql"
    }),
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || ""
    }, // Sending cookie from next js to client 

    cache: new InMemoryCache()
  });

export const withApollo = createWithApollo(client);
