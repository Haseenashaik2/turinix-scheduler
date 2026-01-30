import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { ScheduledOrder } from './order.entity';

@Injectable()
export class OrdersService {
  private orders: ScheduledOrder[] = [];

  constructor(
    @InjectQueue('order-queue')
    private orderQueue: Queue,
  ) {}

  async createOrder(data: Partial<ScheduledOrder>) {
    const order: ScheduledOrder = {
      id: Date.now(),
      userId: data.userId!,
      scheduleTime: data.scheduleTime!,
      recurrence: data.recurrence || 'ONCE',
      status: 'ACTIVE',
      item: 'Fixed Product',
      quantity: 1,
    };

    this.orders.push(order);

    const delay =
      new Date(order.scheduleTime).getTime() - Date.now();

    await this.orderQueue.add(
      'place-order',
      {
        userId: order.userId,
        item: order.item,
        quantity: order.quantity,
      },
      {
        delay: delay > 0 ? delay : 0,
        repeat:
          order.recurrence === 'DAILY'
            ? { every: 24 * 60 * 60 * 1000 }
            : undefined,
      },
    );

    return {
      message: 'Order scheduled successfully',
      order,
    };
  }

  getOrders() {
    return this.orders;
  }

  updateOrder(id: number, data: Partial<ScheduledOrder>) {
    const order = this.orders.find(o => o.id === Number(id));
    if (!order) throw new NotFoundException('Order not found');

    Object.assign(order, data);
    return { message: 'Order updated', order };
  }

  deleteOrder(id: number) {
    const index = this.orders.findIndex(o => o.id === Number(id));
    if (index === -1) throw new NotFoundException('Order not found');

    this.orders.splice(index, 1);
    return { message: 'Order deleted' };
  }
}