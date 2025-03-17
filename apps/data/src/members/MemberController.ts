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
import { Member } from '../entities/Member';
import { LvMember } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @UseInterceptors(MapInterceptor(Member, LvMember))
  @UseInterceptors(MapInterceptor(LvMember, Member))
  @ApiResponse({ type: LvMember })
  @ApiBody({ type: LvMember })
  async create(@Body() membre: Member): Promise<Member> {
    return this.memberService.create(membre);
  }

  @Get()
  @ApiResponse({ type: LvMember, isArray: true })
  @UseInterceptors(MapInterceptor(Member, LvMember, { isArray: true }))
  async findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Member, LvMember))
  @ApiResponse({ type: LvMember, isArray: false })
  async findOne(@Param('id') id: string): Promise<Member | null> {
    return this.memberService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvMember, Member))
  @ApiBody({ type: LvMember })
  async update(@Param('id') id: string, @Body() membre: Member): Promise<void> {
    try {
      return this.memberService.update(+id, membre);
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
