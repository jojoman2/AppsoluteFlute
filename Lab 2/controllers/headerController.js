/**
 * Created by Fredrik on 2015-04-22.
 */
 // $scope gör att saker kan kommas åt från html filen
newsFeedApp.controller('HeaderController', function($scope,NewsFeedModel, $rootScope){
    if(!$scope.filter){
        $scope.filter="Technology";
    }

    $scope.changeFilter = function(filter){
        NewsFeedModel.changeFilter(filter);
        //console.log(filter);
        //$scope.filter = filter;

    }
});