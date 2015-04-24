newsFeedApp.controller('ListCtrl', function($scope,$rootScope, NewsFeedModel){

    NewsFeedModel.toUpdate = function(){
        updateNewsFeed();
    };


    var updateNewsFeed = function() {
        NewsFeedModel.getItemsWithCategory(function (data) {
            $scope.newsItems = data;
        })
    };


    NewsFeedModel.getNewsItems(function(data){
        $scope.newsItems = data;
        $scope.$apply();

    })




});