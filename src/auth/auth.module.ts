import { TypeOrmExModule } from './../tasks/typeorm-ex.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './users.repository';

@Module({
  imports:[TypeOrmExModule.forCustomRepository([UsersRepository])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
