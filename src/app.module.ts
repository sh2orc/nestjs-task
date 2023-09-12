import { User } from './auth/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'testuser',
      password: 'testpwd',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Task, User],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
