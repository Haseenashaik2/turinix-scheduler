import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() body) {
    return this.ordersService.createOrder(body);
  }

  @Get()
  findAll() {
    return this.ordersService.getOrders();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.ordersService.updateOrder(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordersService.deleteOrder(id);
  }
}