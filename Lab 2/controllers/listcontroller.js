newsFeedApp.controller('ListCtrl', function($rootScope, $scope, NewsFeedModel){
    
    NewsFeedModel.getNewsItems(function(data){
        $scope.newsItems = data;
        $scope.$apply();
    })


});