import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('compiles')
export class CompilesController {
  @Post()
  async create(@Body() createCatDto) {
    return createCatDto;
  }
  @Get('/world')
  async hello() {
    return 'hello world';
  }
}
