import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {

    @Get()
    getTest() : string{
        return "Test";
    }

    // mysql db 연결 해보자
    @Get("con")
    getConnection() {

    }
}
