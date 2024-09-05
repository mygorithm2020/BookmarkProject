import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter, CustomExceptionFilter, HttpExceptionFilter } from './middleware/http-exception.filter';
import { CustomUtils, FileAdapter } from './publicComponents/utils';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  //server timeout 설정
  const server = app.getHttpServer();

  // server.setTimeout(10);

  // swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swaggerApi', app, document);

  // cors 설정
  app.enableCors({
    // origin : ["http://127.0.0.1:5500"]
    origin : [/127.0.0.1:/, /localhost:/, /220.72.179.212:/, /dothomeftp.dothome.co.kr/, /mygorithm2020.mycafe24.com/, /browseys.site/],
    credentials : true
  });

  // 공통 상위 경로 설정
  app.setGlobalPrefix("api")

  // 쿠기 미들웨어 설정
  app.use(cookieParser());

  
  //global middleware or config 설정 여기서는 function으로만 가능
  // app.use(midLogger);

  // global filter
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new CustomExceptionFilter(new CustomUtils(), new FileAdapter()));
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(new HttpAdapterHost()));

  await app.listen(3000);
}
bootstrap();
