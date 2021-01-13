import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  items: PaginatedItems;
  item?: Maybe<Item>;
};


export type QueryItemsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryItemArgs = {
  id: Scalars['Int'];
};

export type PaginatedItems = {
  __typename?: 'PaginatedItems';
  items: Array<Item>;
  hasMore: Scalars['Boolean'];
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['Float'];
  name: Scalars['String'];
  price: Scalars['Float'];
  inventory: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateItem?: Maybe<Item>;
  deleteItem: Scalars['Boolean'];
  uploadItemFile: Scalars['Boolean'];
};


export type MutationUpdateItemArgs = {
  inventory?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['Int'];
};


export type MutationUploadItemFileArgs = {
  file: Scalars['Upload'];
};


export type UploadItemFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadItemFileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadItemFile'>
);


export const UploadItemFileDocument = gql`
    mutation uploadItemFile($file: Upload!) {
  uploadItemFile(file: $file)
}
    `;
export type UploadItemFileMutationFn = Apollo.MutationFunction<UploadItemFileMutation, UploadItemFileMutationVariables>;

/**
 * __useUploadItemFileMutation__
 *
 * To run a mutation, you first call `useUploadItemFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadItemFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadItemFileMutation, { data, loading, error }] = useUploadItemFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadItemFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadItemFileMutation, UploadItemFileMutationVariables>) {
        return Apollo.useMutation<UploadItemFileMutation, UploadItemFileMutationVariables>(UploadItemFileDocument, baseOptions);
      }
export type UploadItemFileMutationHookResult = ReturnType<typeof useUploadItemFileMutation>;
export type UploadItemFileMutationResult = Apollo.MutationResult<UploadItemFileMutation>;
export type UploadItemFileMutationOptions = Apollo.BaseMutationOptions<UploadItemFileMutation, UploadItemFileMutationVariables>;