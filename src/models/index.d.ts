import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly mrp?: number | null;
  readonly volume?: number | null;
  readonly measure?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly mrp?: number | null;
  readonly volume?: number | null;
  readonly measure?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

type EagerBatch = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Batch, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly cpyName: string;
  readonly address: string;
  readonly link: string;
  readonly batchNumber: string;
  readonly productName: string;
  readonly mfgDate: string;
  readonly expiryDate: string;
  readonly mrp: string;
  readonly quantity: string;
  readonly value: string;
  readonly measure: string;
  readonly usp: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBatch = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Batch, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly cpyName: string;
  readonly address: string;
  readonly link: string;
  readonly batchNumber: string;
  readonly productName: string;
  readonly mfgDate: string;
  readonly expiryDate: string;
  readonly mrp: string;
  readonly quantity: string;
  readonly value: string;
  readonly measure: string;
  readonly usp: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Batch = LazyLoading extends LazyLoadingDisabled ? EagerBatch : LazyBatch

export declare const Batch: (new (init: ModelInit<Batch>) => Batch) & {
  copyOf(source: Batch, mutator: (draft: MutableModel<Batch>) => MutableModel<Batch> | void): Batch;
}