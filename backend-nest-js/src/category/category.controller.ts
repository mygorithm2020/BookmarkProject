import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, HttpException, HttpStatus, Res, UseFilters, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { RolesGuard } from 'src/middleware/auth.guard';
import { LoggingInterceptor } from 'src/middleware/logging.interceptor';

@ApiTags("category")
@UseGuards(RolesGuard)
// @UseInterceptors(LoggingInterceptor)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBody({
    schema: {
      properties: {
        UserId: { type: "string", },
        Password: { type: "string" }
      }
    }
  })
  @Post()
  create(@Body() createCategoryDto: Category) {
    throw new HttpException({
      errCode : 11,
      error : "this api is not found"
    }, HttpStatus.NOT_FOUND);
    return this.categoryService.create(createCategoryDto);
  }

  
  @Post("/admin")  
  createAdmin(@Req() req: Request, @Body() createCategoryDto: Category) {
    
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Req() req: Request, @Res({passthrough : true}) res : Response) {
    // let ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
    // console.log(ip);
    // console.log(req.headers);
    console.log(req.cookies);
    console.log(req.headers.cookie);
    res.cookie("test", "test", {sameSite : "none", httpOnly : true});
    // res.end();
    return this.categoryService.findAllPublic();
  }

  @Get("/admin")
  findAllAdmin(@Req() req: Request) {
    // res.cookie("test", "test");
    console.log(req.cookies);
    console.log(req.cookies["username3"]);
    console.log(req.headers.cookie);
    return this.categoryService.findAll();
  }

  @Get('/admin/:id')
  findOneAdmin(@Param('id') id: string) {
    if (!id){
      throw new HttpException("no id", HttpStatus.BAD_REQUEST);
    }
    return this.categoryService.findOne(id);
  }

  @Get(':id')
  findOne(@Req() req: Request) {
    const id : string = req.params["id"];
    if (!id){
      throw new HttpException("no id", HttpStatus.BAD_REQUEST);
    }
    return this.categoryService.findOne(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoryService.findOne(id);
  // }

  @Patch('/admin')
  async updateAdmin(@Body() category: Category) {
    let res = await this.categoryService.update(category.CategoryId, category);
    return res.affected;
  }

  // @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: Category) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
