/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct(
    $filter: ModelSubscriptionProductFilterInput
    $owner: String
  ) {
    onCreateProduct(filter: $filter, owner: $owner) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct(
    $filter: ModelSubscriptionProductFilterInput
    $owner: String
  ) {
    onUpdateProduct(filter: $filter, owner: $owner) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct(
    $filter: ModelSubscriptionProductFilterInput
    $owner: String
  ) {
    onDeleteProduct(filter: $filter, owner: $owner) {
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
export const onCreateBatch = /* GraphQL */ `
  subscription OnCreateBatch(
    $filter: ModelSubscriptionBatchFilterInput
    $owner: String
  ) {
    onCreateBatch(filter: $filter, owner: $owner) {
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
export const onUpdateBatch = /* GraphQL */ `
  subscription OnUpdateBatch(
    $filter: ModelSubscriptionBatchFilterInput
    $owner: String
  ) {
    onUpdateBatch(filter: $filter, owner: $owner) {
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
export const onDeleteBatch = /* GraphQL */ `
  subscription OnDeleteBatch(
    $filter: ModelSubscriptionBatchFilterInput
    $owner: String
  ) {
    onDeleteBatch(filter: $filter, owner: $owner) {
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
