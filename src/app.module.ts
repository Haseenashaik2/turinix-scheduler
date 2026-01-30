// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { OrdersModule } from './orders/orders.module';
// import { QueueModule } from './queue/queue.module';

// @Module({
//   imports: [AuthModule, UsersModule, OrdersModule, QueueModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AuthModule,
    OrdersModule,
    QueueModule,
  ],
})
export class AppModule {}