import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, HttpException, HttpStatus, Res, UseFilters } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { HttpExceptionFilter } from 'src/middleware/http-exception.filter';

@ApiTags("category")
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
  createAdmin(@Body() createCategoryDto: Category) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    console.log(req.headers);
    console.log(req.headers["referer"]);
    console.log(req.headers['user-agent']);
    console.log(req.ip);
    console.log(req.cookies);
    // res.cookie("test", "test");
    return this.categoryService.findAllPublic();
  }

  @Get("/admin")
  findAllAdmin(@Req() req: Request) {
    // res.cookie("test", "test");
    return this.categoryService.findAll();
  }

  @Get('/admin/:id')
  findOneAdmin(@Param('id') id: string) {
    console.log(id);
    if (!id){
      throw new HttpException("no id", HttpStatus.BAD_REQUEST);
    }
    return this.categoryService.findOne(id);
  }

  @Get(':id')
  findOne(@Req() req: Request) {
    const id : string = req.params["id"];
    console.log(id);
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
