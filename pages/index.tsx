import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { Layout } from "../components/Layout";
import { useItemsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data, error, loading, fetchMore, variables } = useItemsQuery({
    variables: {
      limit: 10,
      cursor: "0",
    },
    notifyOnNetworkStatusChange: true,
  });

  // Something went wrong if got no data back
  if (!loading && !data) {
    return <div>Your query failed with an error: {error?.message}</div>;
  }

  return (
    <Layout>
      <Flex>
        <Heading>All Items</Heading>
      </Flex>

      <br />

      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.items.items.map((i) =>
            !i ? null : (
              <Flex key={i.id} p={5} shadow="md" borderWidth="1px">
                <Box flex={1}>
                  <Flex>
                    <Flex direction="column">
                      <NextLink href="/item/[id]" as={`/item/${i.id}`}>
                        <Link>
                          <Heading fontSize="xl">{i.name}</Heading>
                        </Link>
                      </NextLink>
                    </Flex>
                  </Flex>

                  <Text mt={4}>Price: {i.price}</Text>
                  <Text mt={4}>Inventory: {i.inventory}</Text>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.items.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor: data.items.items[
                    data.items.items.length - 1
                  ].id.toString(),
                },
              });
            }}
            isLoading={loading}
            m="auto"
            my={8}
            colorScheme="green"
          >
            Load More Items
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
