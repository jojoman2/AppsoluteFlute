/**
 * Created by Fredrik on 2015-04-22.
 */
 // the Model
 
newsFeedApp.factory('NewsFeedModel', function () {

    var NewsFeedModel = function () {
        this.newsItems = null;
        this.filter = "Science";
    };

//funktion för att byta filter
    NewsFeedModel.prototype.changeFilter = function(filter){
        this.filter = filter;
        if(this.toUpdate){
            this.toUpdate();
        }
    };


    NewsFeedModel.prototype.getItemsWithCategory = function(callback){
        this.getNewsItems((function(data){
            var newsItems = [];
            for(var i=0; i<data.length; i++){
                for(var j=0; j<data[i]["categories"].length;j++){
                    if(data[i]["categories"][j] === this.filter){
                        newsItems.push(data[i]);
                    }
                }
            }
            console.log("hej");
            callback(newsItems);

        }).bind(this));

    };

    NewsFeedModel.prototype.getNewsItems = function (callback) {
        if (this.newsItems !== null) {
            callback(this.newsItems);
        }
        else {

            this.newsItems = [];


            var feed = new google.feeds.Feed('http://www.rendip.com/rss');
            feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
            feed.load((function (result) {
                if (!result.error) {
                    this.newsItems = result.feed.entries;

                    var index = 0;
                    for (var i = 0; i < result.feed.entries.length; i++) {
                        var entry = result.feed.entries[i];
                        this.newsItems[i]["index"] = index;
                        var mediaEntries = entry.xmlNode.getElementsByTagNameNS('*', 'thumbnail');
                        for (var j = 0; j < mediaEntries.length; j++) {
                            var mediaEntry = mediaEntries[j];
                            var mediaThumbnailUrl = mediaEntry.attributes.getNamedItem('url').value
                            this.newsItems[i]['image'] = mediaThumbnailUrl;
                        }
                        index++;
                    }
                    console.log(this.newsItems);
                    callback(this.newsItems);


                }

            }).bind(this))
        }
    };

    NewsFeedModel.prototype.getNewsItem = function(id){

        return this.newsItems[id];
    };

    return new NewsFeedModel();

});