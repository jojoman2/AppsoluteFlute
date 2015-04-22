newsFeedApp.controller('ListCtrl', function($rootScope, $scope){
    $scope.newsItems = [];

    var feed = new google.feeds.Feed('http://www.rendip.com/rss');
    feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
    feed.load(function(result){
        if (!result.error) {
            $scope.newsItems = result.feed.entries;
            for (var i = 0; i < result.feed.entries.length; i++) {
                entry = result.feed.entries[i];
                var mediaEntries = entry.xmlNode.getElementsByTagNameNS('*', 'thumbnail');
                for (var j = 0; j < mediaEntries.length; j++) {
                    var mediaEntry = mediaEntries[j];
                    var mediaThumbnailUrl = mediaEntry.attributes.getNamedItem('url').value
                    $scope.newsItems[i]['image'] = mediaThumbnailUrl;
                }
            }
            console.log($scope.newsItems);
            $scope.$apply();


        }

    });


});