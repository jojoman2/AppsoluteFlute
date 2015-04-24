/**
 * Created by Fredrik on 2015-04-22.
 */
newsFeedApp.controller('DetailsController', function($scope, $routeParams,NewsFeedModel){
    var newsItemId = $routeParams.itemId;

    $scope.newsItem = NewsFeedModel.getNewsItem(newsItemId);

});
