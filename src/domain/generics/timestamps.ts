import { Indexable } from './indexable';

export type Timestamps = Indexable & {
  insertedAt: Date;
  updatedAt: Date;
};