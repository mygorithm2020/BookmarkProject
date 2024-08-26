export interface ApiResult {
    ResCode : number;
    ResMsg : string;
}


export interface ApiResultExpand<T> extends ApiResult{
    Body : T;
}


let sss : ApiResultExpand<string>;