import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { Book } from './book.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: {books: true} });
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  create(dto: CreateUserDto): Promise<User> {
    const userEntity = this.usersRepository.create(dto);
    if(dto.books){
      const bookEntities = this.booksRepository.create(dto.books);
      console.log(bookEntities)
      userEntity.books = bookEntities
    }
    return this.usersRepository.save(userEntity); 
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}