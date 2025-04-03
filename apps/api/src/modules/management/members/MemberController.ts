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
import { MemberService } from './MemberService';
import { MemberData } from '@eivo/contracts';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Member } from '../entities/Member.entity';
import { EntityNotFoundError } from '../../common/entities/EntityNotFoundError';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @UseInterceptors(MapInterceptor(Member, MemberData))
  @UseInterceptors(MapInterceptor(MemberData, Member))
  @ApiResponse({ type: MemberData })
  @ApiBody({ type: MemberData })
  async create(@Body() membre: Member): Promise<Member> {
    return this.memberService.save(membre);
  }

  @Get()
  @ApiResponse({ type: MemberData, isArray: true })
  @UseInterceptors(MapInterceptor(Member, MemberData, { isArray: true }))
  async findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Member, MemberData))
  @ApiResponse({ type: MemberData, isArray: false })
  async findOne(@Param('id') id: string): Promise<Member | null> {
    return this.memberService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(MemberData, Member))
  @ApiBody({ type: MemberData })
  async update(@Param('id') id: string, @Body() membre: Member): Promise<void> {
    try {
      this.memberService.save(membre);
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
      return this.memberService.remove(+id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
