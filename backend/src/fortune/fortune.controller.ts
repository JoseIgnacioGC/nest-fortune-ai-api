import { Controller } from '@nestjs/common';
import { FortuneService } from './fortune.service';

@Controller('fortune')
export class FortuneController {
  constructor(private readonly fortuneService: FortuneService) {}

  // @Get('random')
  // async getRandomFortune() {
  //   return this.fortuneService.getRandomFortune();
  // }

  // @Post()
  // create(@Body() createFortuneDto: CreateFortuneDto) {
  //   return this.fortuneService.create(createFortuneDto);
  // }

  // @Get()
  // findAll() {
  //   return this.fortuneService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.fortuneService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFortuneDto: UpdateFortuneDto) {
  //   return this.fortuneService.update(+id, updateFortuneDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.fortuneService.remove(+id);
  // }
}
