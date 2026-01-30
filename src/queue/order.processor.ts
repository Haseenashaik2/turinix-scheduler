import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';

@Processor('order-queue')
export class OrderProcessor {

  @Process('place-order')
  async handleOrder(job: Job) {
    const { userId, item, quantity } = job.data;

    console.log('==============================');
    console.log('✅ ORDER TRIGGERED');
    console.log('User ID:', userId);
    console.log('Item:', item);
    console.log('Quantity:', quantity);
    console.log('Triggered At:', new Date().toISOString());
    console.log('==============================');

    return { status: 'ORDER_PLACED' };
  }
}