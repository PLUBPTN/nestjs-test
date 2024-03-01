import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { REQUEST } from '@nestjs/core';
import { Scope } from '@nestjs/common';

class ListAllEntities {
  limit: number
}

@UseInterceptors(ClassSerializerInterceptor)
@Controller({
  path: 'users'
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    console.log('instantiating users controller...')
  }

  @SerializeOptions({excludePrefixes: ['__']})
  @Get()
  findAll(@Query() query: ListAllEntities) {
    return this.usersService.findAll();
  }

  @SerializeOptions({groups: ['detail']})
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateUserDto){
    return this.usersService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.usersService.remove(id)
    return true;
  }

  @Get(':id/withBook')
  findOneWithBook() {
    return `test method api trigger..`;
  }
  
  //-------------------------------------------------

  @SerializeOptions({excludePrefixes: ['__']})
  @Get('/test')
  test() {
    return `test method api trigger..`;
  }

  @Get(':id/:secret')
  findOneWithSecret(@Param('id') id: number, @Param('secret') secret: string) {
    return `id = ${id}, secret = ${secret}`
  }
}
