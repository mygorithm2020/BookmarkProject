export class MyBookmark {
    constructor(siteId, name, url, img, des, views){
        this._key = "my-bookmark";
        this.SiteId = siteId;
        this.Name = name;
        this.Url = url;
        this.Img = img;
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

    }
}

console.log("mybookmark");

