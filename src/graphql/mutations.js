/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createBatch = /* GraphQL */ `
  mutation CreateBatch(
    $input: CreateBatchInput!
    $condition: ModelBatchConditionInput
  ) {
    createBatch(input: $input, condition: $condition) {
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
export const updateBatch = /* GraphQL */ `
  mutation UpdateBatch(
    $input: UpdateBatchInput!
    $condition: ModelBatchConditionInput
  ) {
    updateBatch(input: $input, condition: $condition) {
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
export const deleteBatch = /* GraphQL */ `
  mutation DeleteBatch(
    $input: DeleteBatchInput!
    $condition: ModelBatchConditionInput
  ) {
    deleteBatch(input: $input, condition: $condition) {
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
