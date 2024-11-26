class Site{
    // SiteId;
    // URL;        
    // Name;        
    // NameKR;        
    // IPAddress;        
    // Img;        
    // SiteDescription;        
    // AppLinkAndroid;        
    // AppLinkIOS;
    // Views;        
    // Good;        
    // Bad;        
    // MemberId;        
    // Status;
    // Title;
    // FaviconImg;
    // Description;
    // Keywords;
    // OGTitle;
    // OGSiteName;        
    // OGImg;
    // OGDescription;
    // OGURL; 
    // IsDeleted;
    // CreatedDate;
    // UpdatedDate;
    constructor(siteObj){        
        this.SiteId = siteObj.SiteId;
        this.URL = siteObj.URL;        
        this.Name = siteObj.Name;        
        this.NameKR = siteObj.NameKR;        
        this.IPAddress = siteObj.IPAddress;        
        this.Img = siteObj.Img;        
        this.SiteDescription = siteObj.SiteDescription;        
        // this.AppLinkAndroid = siteObj.AppLinkAndroid;        
        // this.AppLinkIOS = siteObj.AppLinkIOS;        
        this.Status = siteObj.Status;
        this.Title = siteObj.Title;
        this.FaviconImg = siteObj.FaviconImg;
        this.Description = siteObj.Description;
        this.Keywords = siteObj.Keywords;
        this.OGTitle = siteObj.OGTitle;
        this.OGSiteName = siteObj.OGSiteName;        
        this.OGImg = siteObj.OGImg;
        this.OGDescription = siteObj.OGDescription;
        this.OGURL = siteObj.OGURL; 
    }
}

exports.Site = Site;