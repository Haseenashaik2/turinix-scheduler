// import { Module } from '@nestjs/common';

// @Module({})
// export class QueueModule {}


import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { OrderProcessor } from './order.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'order-queue',
    }),
  ],
  providers: [OrderProcessor],
})
export class QueueModule {}