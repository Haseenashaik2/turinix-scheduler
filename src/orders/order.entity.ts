export class ScheduledOrder {
  id: number;
  userId: number;
  scheduleTime: string; // ISO date
  recurrence: 'ONCE' | 'DAILY';
  status: 'ACTIVE' | 'CANCELLED';
  item: string;
  quantity: number;
}