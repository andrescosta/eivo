import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './UserService';
import { LvUser } from '@lingv/contracts';
import { User } from '../entities/User';
import { InjectMapper, MapInterceptor } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(MapInterceptor(User, LvUser))
  @UseInterceptors(MapInterceptor(LvUser, User))
  @ApiResponse({ type: LvUser })
  @ApiBody({ type: LvUser })
  async create(@Body() utilisateur: User): Promise<User> {
    return await this.userService.create(utilisateur);
  }

  @Get()
  @ApiResponse({ type: LvUser, isArray: true })
  @UseInterceptors(
    MapInterceptor(User, LvUser, { isArray: true }),
  )
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(User, LvUser))
  @ApiResponse({ type: LvUser, isArray: false })
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvUser, User))
  @ApiBody({ type: LvUser })
  async update(
    @Param('id') id: string,
    @Body() utilisateur: User,
  ): Promise<User> {
    try {
      return this.userService.update(+id, utilisateur);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      this.userService.remove(+id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
