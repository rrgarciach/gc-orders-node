import {createConnection} from '@typedorm/core';
import { ordersTable } from '../tables/orders';

createConnection({
  table: ordersTable,
  entities: 'entities/*.entity.ts',
});

