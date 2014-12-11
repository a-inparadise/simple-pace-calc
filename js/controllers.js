var paceApp = angular.module('paceApp', []);

paceApp.controller('calcCtrl', function ($scope) {
	$scope.paceMin = "00";
	$scope.paceSecs = "00";
	$scope.dist = 0;
	$scope.unit = "Miles";
	$scope.unitStr = "mile";
	$scope.timeHrs = "hrs";
	$scope.timeMin = "min";
	$scope.timeSecs = "secs";

	$scope.calculate = function() {
		// don't calculate until there's a distance
		if ($scope.dist > 0) {
			var hours = $scope.timeHrs;
			var min = $scope.timeMin;
			var secs = $scope.timeSecs;

			// do some error checking for NaN
			if (isNaN(hours)) hours = 0;
			if (isNaN(min)) min = 0;
			if (isNaN(secs)) secs = 0;

			var totalSecs = (hours * 3600) + (min * 60) + (secs * 1);

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