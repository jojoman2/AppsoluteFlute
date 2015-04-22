/**
 * Created by Fredrik on 2015-04-22.
 */
newsFeedApp.factory('NewsFeedModel', function () {

    var NewsFeedModel = function () {
        this.newsItems = null;
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
                    for (var i = 0; i < result.feed.entries.length; i++) {
                        entry = result.feed.entries[i];
                        var mediaEntries = entry.xmlNode.getElementsByTagNameNS('*', 'thumbnail');
                        for (var j = 0; j < mediaEntries.length; j++) {
                            var mediaEntry = mediaEntries[j];
                            var mediaThumbnailUrl = mediaEntry.attributes.getNamedItem('url').value
                            this.newsItems[i]['image'] = mediaThumbnailUrl;
                        }
                    }
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