import { TypeOrmExModule } from './typeorm-ex.module';
import { TasksRepository } from './task.repository';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TasksRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
