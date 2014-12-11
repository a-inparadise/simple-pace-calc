var paceApp = angular.module('paceApp', []);

paceApp.controller('calcCtrl', function ($scope) {
	$scope.paceMin = "00";
	$scope.paceSecs = "00";
	$scope.dist = 0;
	$scope.unit = "Miles";
	$scope.unitStr = "mile";
	$scope.timeHrs = 0;
	$scope.timeMin = 0;
	$scope.timeSecs = 0;

	$scope.calculate = function() {
		if ($scope.dist > 0) {
			var totalSecs = ($scope.timeHrs * 3600) + ($scope.timeMin * 60) + ($scope.timeSecs * 1);

			var pace = (totalSecs / $scope.dist) / 60;

			$scope.paceMin = Math.floor(pace);
			$scope.paceSecs = Math.floor((pace - $scope.paceMin) * 60);

			if ($scope.paceSecs < 10) $scope.paceSecs = "0" + $scope.paceSecs;

			$scope.unitStr = $scope.unit.substring(0, ($scope.unit.length - 1)).toLowerCase();
		} else {
			$scope.paceMin = "00";
			$scope.paceSecs = "00";
		}
	};

	$("#paceRow").removeClass("hide");
});