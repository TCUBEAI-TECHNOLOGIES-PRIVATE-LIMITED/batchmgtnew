// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, Batch } = initSchema(schema);

export {
  Product,
  Batch
};