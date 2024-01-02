/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      mrp
      volume
      measure
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        mrp
        volume
        measure
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBatch = /* GraphQL */ `
  query GetBatch($id: ID!) {
    getBatch(id: $id) {
      id
      cpyName
      address
      link
      batchNumber
      productName
      mfgDate
      expiryDate
      mrp
      quantity
      value
      measure
      usp
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listBatches = /* GraphQL */ `
  query ListBatches(
    $filter: ModelBatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cpyName
        address
        link
        batchNumber
        productName
        mfgDate
        expiryDate
        mrp
        quantity
        value
        measure
        usp
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
