import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { NextPageContext } from "next";
import { withApollo as createWithApollo } from "next-apollo";
import { PaginatedItems } from "../generated/graphql";

const client = (ctx: NextPageContext) =>
  new ApolloClient({
    link: createUploadLink({
      uri: "http://localhost:4000/graphql",
    }),
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    }, // Sending cookie from next js to client

    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            items: {
              keyArgs: [], // No other arguments, since limit and cursor are related to pagination, if there was a query arg then maybe put there
              merge(
                existing: PaginatedItems | undefined,
                incoming: PaginatedItems
              ): PaginatedItems {
                console.log(
                  "EXISTING ITEMS: ",
                  existing,
                  "INCOMING ITEMS: ",
                  incoming
                );
                return {
                  ...incoming,
                  items: [...(existing?.items || []), ...incoming.items],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(client);
