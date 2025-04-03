import { MapInterceptor } from '@automapper/nestjs';
import { UserData } from '@eivo/contracts';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../../auth/user/user.service';
import { User } from '../entity/user.entity';
import { EntityNotFoundError } from '../../common/entity/entity-not-found.error';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(MapInterceptor(User, UserData))
  @UseInterceptors(MapInterceptor(UserData, User))
  @ApiResponse({ type: UserData })
  @ApiBody({ type: UserData })
  async create(@Body() utilisateur: User): Promise<User> {
    return await this.userService.save(utilisateur);
  }

  @Get()
  @ApiResponse({ type: UserData, isArray: true })
  @UseInterceptors(MapInterceptor(User, UserData, { isArray: true }))
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(User, UserData))
  @ApiResponse({ type: UserData, isArray: false })
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(UserData, User))
  @ApiBody({ type: UserData })
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    try {
      return this.userService.save(user);
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
