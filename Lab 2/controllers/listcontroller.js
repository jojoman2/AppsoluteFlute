newsFeedApp.controller('ListCtrl', function($rootScope, $scope){
    $scope.newsItems = [];

    var feed = new google.feeds.Feed('http://www.rendip.com/rss');
    feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
    feed.load(function(result){
        console.log(result);
        if (!result.error) {
            $scope.newsItems = result.feed.entries;
            $scope.$apply();

        }

    });


});