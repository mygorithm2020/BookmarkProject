import { Category } from "src/category/entities/category.entity";
import { Site } from "src/site/entities/site.entity";
import { Lock } from "async-lock";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ServerCache {

    // private static readonly _categoryLock = new Lock();
    private static cachedCategorys : {lastDate : Date, categorys : Category[]};
    private static recommendSites : {lastDate : Date, sites : Site[]};
    private static sesstionList : Map<string, Date>;
    private static restrictedViews : {lastUpdate : Date, keyValues : Set<string>};

    static setCategorys(categorys : Category[]) {
        this.cachedCategorys = {
            lastDate : new Date(),
            categorys : categorys
        }        
    }


    // 그냥 시간으로 하지말고 새로 카테고리를 추가하면 자동으로 변경되는게 나을 듯...
    static getCategorys() : Category[]{ 
           
        // 시간이 지났거나, 값이 없으면 => 하루마다
        if (!this.cachedCategorys || !this.cachedCategorys.categorys || 
            this.cachedCategorys.lastDate.getUTCDate() !== new Date().getUTCDate()){
                return null;
            }

        return this.cachedCategorys.categorys;   
    }

    static setRecommendSites(sites : Site[]) {
        this.recommendSites = {
            lastDate : new Date(),
            sites : sites
        }        
    }

    
    // 나중에 다양한 조건으로 더 알맞은 사이트 추천
    // 생일(나이), 성별, 관심 카테고리
    static getRecommendSites(categorys? : Category[], birth? : string, gender? : string) : Site[]{ 
        // 시간이 지났거나, 값이 없으면 => 시간마다
        if (!this.recommendSites || !this.recommendSites.sites || 
            this.recommendSites.lastDate.getUTCHours() !== new Date().getUTCHours()){
                return null;
            }

        return this.recommendSites.sites;   
    }
    
    static setSession(sessionId : string){
        if (!this.sesstionList){
            this.sesstionList = new Map();
        }
        this.sesstionList.set(sessionId, new Date());
    }

    static getSessionId(sessionId : string) : string{
        let res = sessionId;

        if (!this.sesstionList || !this.sesstionList.has(sessionId)){
            res = "";
            return res;            
        }

        const date = this.sesstionList.get(sessionId);
        const now = new Date();
        
        // 세션 유지시간........하루...???
        let dif = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
        if (dif > 1) {
            this.sesstionList.delete(sessionId);
            res = "";
            return res;
        }

        // 인증 시간 갱신
        this.setSession(sessionId);
        return res;

    }

    
    // 조회수 조작을 막기 위해 같은 정보로 동일하게 오면 제한, 대신 메모리로 관리하므로 시간마다 값 초기화
    static checkRestrictedViews(reqUserAgent: string, reqIp : string, SiteId : string) : boolean {
        // 1시간마다 측정하자
        const newStr : string = Math.trunc(new Date().getUTCHours())  + reqUserAgent + reqIp + SiteId;
        let res = false;
        if (!this.restrictedViews){
            this.restrictedViews = {
                lastUpdate : new Date(),
                keyValues : new Set<string>()
            }  
        } else if (this.restrictedViews.lastUpdate.getUTCHours() !== new Date().getUTCHours()){
            this.restrictedViews.lastUpdate = new Date();
            this.restrictedViews.keyValues.clear();
        }

        if (this.restrictedViews.keyValues.has(newStr)){
            res = true;
        } else{
            this.restrictedViews.keyValues.add(newStr);
        }

        console.log(this.restrictedViews);
        return res;      
    }

}