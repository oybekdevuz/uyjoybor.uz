import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFiles, Query, UseGuards } from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CookieGetter } from '../decorators/cookie-getter.decorator';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsUser } from '../guards/is-user.guard';
import { Home } from './schema/home.schema';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  
  @ApiTags("Mening e'lonlarim")
  @ApiOperation({summary: "E'lon yaratish", description: "agar foydalanuvchi ro'yxatdan o'tgan bo'lsagini yangi e'lon qo'sha oladi"})
  @Post()
  @UseGuards(IsUser)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 10 },
  ]))
  create(@Body() createHomeDto: CreateHomeDto,@UploadedFiles() images: { images?: any }, @CookieGetter('refresh_token') refreshToken:string) {
    return this.homeService.createHome(createHomeDto, images, refreshToken);
  }
  
  @ApiTags("Home page")
  @ApiOperation({summary: "E'lonni qidirish", description: "agar foydalanuvchi ro'yxatdan o'tgan bo'lsagini yangi e'lon qo'sha oladi"})
  @ApiQuery({ name: 'city', required: false, description: 'City name for filtering' })
  @ApiQuery({ name: 'district', required: false, description: 'District name for filtering' })
  @ApiQuery({ name: 'neighbourhood', required: false, description: 'Neighbourhood name for filtering' })
  @ApiQuery({ name: 'type', required: false, description: 'Type of home (hovli, dom, dacha)' })
  @ApiQuery({ name: 'price', required: false, description: 'Price of the home' })
  @ApiQuery({ name: 'currency', required: false, description: 'Currency (sum, euro, usd)' })
  @ApiQuery({ name: 'status', required: false, description: 'Status for filtering' })
  @ApiQuery({ name: 'kv_metr', required: false, description: 'Square meter area' })
  @ApiQuery({ name: 'is_sale', required: false, description: 'Is for sale' })
  @ApiQuery({ name: 'is_rent', required: false, description: 'Is for rent' })
  @ApiQuery({ name: 'toWhom', required: false, description: 'To whom the home belongs' })
  @ApiQuery({ name: 'floor_count', required: false, description: 'Number of floors' })
  @ApiQuery({ name: 'floor', required: false, description: 'Floor number' })
  @ApiQuery({ name: 'room', required: false, description: 'Room number' })
  @ApiQuery({ name: 'shower', required: false, description: 'Number of showers' })
  @ApiQuery({ name: 'cellar', required: false, description: 'Has a cellar' })
  @ApiQuery({ name: 'yard', required: false, description: 'Has a yard' })
  @ApiQuery({ name: 'wifi', required: false, description: 'Has WiFi' })
  @ApiQuery({ name: 'refrigerator', required: false, description: 'Has a refrigerator' })
  @ApiQuery({ name: 'washer', required: false, description: 'Has a washer' })
  @ApiQuery({ name: 'ac', required: false, description: 'Has an air conditioner' })
  @ApiQuery({ name: 'trade', required: false, description: 'Is available for trade' })
  @ApiQuery({ name: 'min_price', required: false, description: 'Minimum price for filtering' })
  @ApiQuery({ name: 'max_price', required: false, description: 'Maximum price for filtering' })
  @ApiResponse({ status: 200, description: 'Muaffaqiyatli bajarildi' })
  @ApiResponse({ status: 400, description: 'Malumot topilmadi' })
  @Get()
  async filter(@Query() query: any) {
    return this.homeService.filter(query);
  }
  
  @ApiTags("Home page")
  @ApiOperation({summary: "E'lonni bittasini olish Id bo'yicha", description: "agar foydalanuvchi ro'yxatdan o'tmagan bo'lsa ham bo'laveradi"})
  @ApiResponse({ status: 200, type: Home})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeService.findOne(id);
  }
  
  @ApiTags("Mening e'lonlarim")
  @ApiOperation({summary: "E'lonni tahrirlash", description: "e'londagi xatolarni tuzatish va shunga o'xshash"})
  @Put(':id')
  @UseGuards(IsUser)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 15 },
  ]))
  update(@Param('id') id: string, @Body() updateHomeDto: UpdateHomeDto, @UploadedFiles() images: { images?: any }, @CookieGetter('refresh_token') refreshToken:string) {
    return this.homeService.update(id, updateHomeDto, images, refreshToken);
  }
  
  @ApiTags("Mening e'lonlarim")
  @ApiOperation({summary: "E'lonni o'chirish", description: "e'lonni o'chirish"})
  @Delete(':id')
  @UseGuards(IsUser)
  remove(@Param('id') id: string, @CookieGetter('refresh_token') refreshToken:string) {
    return this.homeService.remove(id, refreshToken);
  }
  
  @ApiTags("Mening e'lonlarim")
  @ApiOperation({summary: "Userga tegishli bo'lgan e'lonlar", description: "e'lonni faqat userning o'zi ko'rishi kerak"})
  @Get('myads')
  @UseGuards(IsUser)
  getUserHome( @CookieGetter('refresh_token') refreshToken:string ) {
    return this.homeService.getUserHome(refreshToken);
  }
}
