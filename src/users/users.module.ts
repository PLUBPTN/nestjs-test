import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { Book } from './book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}