import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { Book } from 'src/books/entities/book.entity';

@Controller('test')
export class TestController {

    constructor(private readonly httpService: HttpService){};

    @Get()
    getTest() : string{
        return "Test";
    }

    // mysql db 연결 해보자
    @Get("con")
    getConnection() {
        
    }

    @Get("nestAxios")
    async findAll(): Promise<string[]> {
        const { data } = await firstValueFrom(
          this.httpService.get<string[]>('https://naver.com').pipe(
            catchError((error: AxiosError) => {
                console.log(error);
                throw 'An error happened!';
            }),
          ),
        );
        return data;
    }

    @Get("axios")
    async findAllAxios() {
        console.log("axios test");
        // Axios의 promise는 상태코드가 2xx의 범위를 넘어가면 거부(reject)합니다. 
        //에러 객체에 응답(response) 또는 요청(request) 프로퍼티가 포함되어 있는지 확인하여 에러에 대한 자세한 정보를 확인할 수 있습니다.
        let q = axios.get("https://www.snaver.com", {
            timeout : 4000
        })
        .then((response) => console.log(response.status))
        .catch((err) => {
            console.log(err);

        });
        
    }

    @Get("fetch")
    async getUsers(): Promise<any> {

        // // We can use the `Headers` constructor to create headers
        // // and assign it as the type of the `headers` variable
        // const headers: Headers = new Headers()
        // // Add a few headers
        // headers.set('Content-Type', 'application/json')
        // headers.set('Accept', 'application/json')
        // // Add a custom header, which we can use to check
        // headers.set('X-Custom-Header', 'CustomValue')
      
        // // Create the request object, which will be a RequestInfo type. 
        // // Here, we will pass in the URL as well as the options object as parameters.
        // const request: RequestInfo = new Request('./users.json', {
        //   method: 'GET',
        //   headers: headers
        // })
        // 


        //Fetch는 404 에러나 다른 HTTP 에러 응답을 받았다고 해서 promise를 거부(reject)하지 않습니다. 
        // Fetch는 네트워크 장애가 발생한 경우에만 promise를 거부(reject) 합니다. 
        // 따라서 .then절을 사용해 수동으로 HTTP 에러를 처리해야 합니다.
        let q = await fetch("https://www.snaver.com", {
            method: "GET", // 다른 옵션도 가능합니다 (POST, PUT, DELETE, etc.)
        }).then((res) => res).then(console.log)
        .catch((err) => {
            console.log(err);
        });
        console.log(q);
      
        // // For our example, the data is stored on a static `users.json` file
        // return fetch(request)
        //   // the JSON body is taken from the response
        //   .then(res => res.body)
        //   .then(res => {
        //     // The response has an `any` type, so we need to cast
        //     // it to the `User` type, and return it from the promise
        //     return res
        //   })
      }
}
