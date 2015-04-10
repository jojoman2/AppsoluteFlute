/**
 * Created by Fredrik on 2015-04-10.
 */
function HeaderController($scope, $location)
{
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}