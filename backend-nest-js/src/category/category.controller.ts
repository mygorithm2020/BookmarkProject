import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpException,
  HttpStatus,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import {
  AdminAuthGuard,
  CustomAuthGuard,
  RolesGuard,
} from 'src/middleware/auth.guard';
import { ServerCache } from 'src/publicComponents/memoryCache';

@ApiTags('category')
@UseGuards(RolesGuard)
// @UseInterceptors(LoggingInterceptor)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBody({
    schema: {
      properties: {
        UserId: { type: 'string' },
        Password: { type: 'string' },
      },
    },
  })
  @UseGuards(CustomAuthGuard)
  @Post()
  create(@Body() createCategoryDto: Category) {
    throw new HttpException(
      {
        errCode: 11,
        error: 'this api is not found',
      },
      HttpStatus.NOT_FOUND,
    );
    return this.categoryService.create(createCategoryDto);
  }

  @Post('/admin')
  @UseGuards(AdminAuthGuard)
  createAdmin(@Req() req: Request, @Body() createCategoryDto: Category) {
    return this.categoryService.create(createCategoryDto);
  }

  @Post('/daemon')
  createDaemon(@Req() req: Request, @Body() createCategoryDto: Category) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // let ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
    // console.log(ip);
    // console.log(req.headers);
    // console.log(req.cookies);
    // console.log(req.headers.cookie);
    // res.cookie("test", "test", {sameSite : "none", httpOnly : true});
    // res.end();
    let result = await ServerCache.getCategorys();

    if (!result || result.length === 0) {
      const newCategorys = await this.categoryService.findAllPublic();
      await ServerCache.setCategorys(newCategorys);
      result = await ServerCache.getCategorys();
    }

    // let data = await this.cRepo.find()
    return result;
  }

  @Get('/admin')
  @UseGuards(AdminAuthGuard)
  findAllAdmin(@Req() req: Request) {
    // res.cookie("test", "test");
    console.log(req.cookies);
    console.log(req.cookies['username3']);
    console.log(req.headers.cookie);
    return this.categoryService.findAllAdmin();
  }

  @Get('/admin/:id')
  @UseGuards(AdminAuthGuard)
  findOneAdmin(@Param('id') id: string) {
    if (!id) {
      throw new HttpException(
        {
          errCode: 11,
          error: 'no id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.categoryService.findOneAdmin(id);
  }

  @UseGuards(CustomAuthGuard)
  @Get(':id')
  findOne(@Req() req: Request) {
    const id: string = req.params['id'];
    if (!id) {
      throw new HttpException(
        {
          errCode: 11,
          error: 'no id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.categoryService.findOneAdmin(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoryService.findOne(id);
  // }

  @Patch('/admin')
  @UseGuards(AdminAuthGuard)
  async updateAdmin(@Body() category: Category) {
    const res = await this.categoryService.updateAdmin(
      category.CategoryId,
      category,
    );
    return res.affected;
  }

  // @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: Category) {
    // return this.categoryService.updateAdmin(id, updateCategoryDto);
  }

  @Delete('/admin')
  @UseGuards(AdminAuthGuard)
  removeAdmin(@Query('id') id: string) {
    console.log(id);
    return this.categoryService.remove(id);
  }

  // @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
