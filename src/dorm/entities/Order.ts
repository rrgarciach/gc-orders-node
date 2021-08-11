import { Attribute, Entity, AutoGenerateAttribute, INDEX_TYPE, AUTO_GENERATE_ATTRIBUTE_STRATEGY } from '@typedorm/common';

@Entity({
  name: 'order',
  primaryKey: {
    partitionKey: 'ORD#{{id}}',
    sortKey: 'ORD#{{id}}',
  },
  indexes: {
    // specify GSI1 key - "GSI1" named global secondary index needs to exist in above table declaration
    GSI1: {
      partitionKey: 'ORD#{{id}}#STATUS#{{status}}',
      sortKey: 'ORD#{{id}}#ACTIVE#{{active}}',
      type: INDEX_TYPE.GSI,
    },
    // specify LSI1 key
    LSI: {
      sortKey: 'TICKETS#UPDATED_AT#{{updatedAt}}',
      type: INDEX_TYPE.LSI
    }
  },
})
export class Order {

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  status: string;

  @Attribute()
  active: boolean;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH,
    autoUpdate: true // this will make this attribute and any indexes referencing it auto update for any write operation
  })
  updatedAt: number;
}
