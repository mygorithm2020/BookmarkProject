export class Bookmark {    
    static SESSION_KEY = "my-bookmark";
    static items = [];  

    constructor(siteId, name, url, img, des, views){
        this._key = "my-bookmark";
        this.SiteId = siteId;
        this.Name = name;
        this.URL = url;
        this.Image = img;
        this.Des = des;
        this.Views = views;
    }

    addItem(item){
        this.items.push(item);
    }

    removeItem(itemId){
        for (let idx = 0; idx < this.items.length; idx++){
            if (this.items[idx].SiteId === itemId){
                this.items.splice(idx, 1);
                break;
            }
        }
    }

    static myBookmarkList(){
        if (this.items.length === 0){
            const t = localStorage.getItem(Bookmark.SESSION_KEY);
            if (t){
                this.items = JSON.parse(t);
            }
        }
        
        return this.items;
    }

    static addMyBookmark(siteId, name, url, image, description, views){

        this.myBookmarkList();

        //  이미 있으면 리턴
        for (let i =0; i< this.items.length; i++){
            if (this.items[i].URL === url){
                return false;
            }
        }

        // 새로추가
        this.items.push(
            {
                SiteId:siteId, 
                Name : name, 
                URL : url, 
                Image : image, 
                Description : description, 
                Views : views
            }
        );        

        // 로컬스토리지에 추가
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(this.items));
        return true;
    }

    static removeBookmark(url){
        
        let newItems = [];

        for (let i =0; i< this.items.length; i++){
            if (this.items[i].URL === url){
                continue;
            }
            newItems.push(this.items[i]);
        }
        if (this.items.length === newItems.length){
            return false;
        } else {
            localStorage.setItem(this.SESSION_KEY, JSON.stringify(newItems));
            this.items = [...newItems];
            return true;
        }

        
    }

    addMyBookmark(items, siteList, keyValue){
        
        for (let i=0 ; i < items.length; i++){
            if (items[i].URL === keyValue){
                alert("있어");
                return false;
            }
        }               
        
        siteList.forEach((es) => {
            if (es.URL === keyValue){
                let newSite = new Bookmark(
                    es.SiteId,
                    es.Name,
                    es.URL,
                    es.Image,
                    es.Description,
                    es.Views,
                );
                
                items.push(newSite);
                localStorage.setItem(Bookmark.SESSION_KEY, JSON.stringify(items));   
                return true;
            }
        });
    
        return false;
    }
}