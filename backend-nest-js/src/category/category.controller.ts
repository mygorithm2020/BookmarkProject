import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, HttpException, HttpStatus, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';

@ApiTags("category")
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBody({
    schema: {
      properties: {
        userId: { type: "string" },
        password: { type: "string" }
      }
    }
  })
  @Post()
  create(@Body() createCategoryDto: Category) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    console.log(req.headers);
    console.log(req.headers['user-agent']);
    console.log(req.ip);
    console.log(req.cookies);
    // res.cookie("test", "test");
    return this.categoryService.findAll();
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

  // @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: Category) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
