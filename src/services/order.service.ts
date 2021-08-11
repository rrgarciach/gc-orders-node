import { getEntityManager } from '@typedorm/core';
import DynamoService from './DynamoService';
import { Order } from '../dorm/entities/Order';

export default class OrderService extends DynamoService<Order> {
  protected entityManger;

  constructor() {
    super();
    this.entityManger = getEntityManager();
  }

  async find() {
    const order = await this.entityManger.find(Order, {
      id: response.id,
      status: 'onboarding',
      active: true,
    });
  }

  async findOne() {
    const order = await this.entityManger.findOne(Order, {
      id: response.id,
      status: 'onboarding',
      active: true,
    });
  }

  async create() {
    let order = new Order();
    order.name = 'My awesome org';
    order.status = 'onboarding';
    order.active = true;

    // create item
    const response = await this.entityManger.create(order);
  }


  async remove() {
    await this.entityManger.delete(Order, {
      id: response.id,
      status: 'onboarding',
      active: true,
    });
  }

}
