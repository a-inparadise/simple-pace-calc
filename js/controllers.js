var paceApp = angular.module('paceApp', []);

paceApp.controller('calcCtrl', function ($scope) {
	$scope.paceMin = "00";
	$scope.paceSec = "00";
	$scope.dist = 0;
	$scope.unit = "Miles";
	$scope.unitStr = "mile";
	$scope.timeHrs = "hrs";
	$scope.timeMin = "min";
	$scope.timeSec = "sec";

	$scope.calculate = function() {
		// don't calculate until there's a distance
		if ($scope.dist > 0) {
			var hours = $scope.timeHrs;
			var min = $scope.timeMin;
			var sec = $scope.timeSec;

			// do some error checking for NaN
			if (isNaN(hours)) hours = 0;
			if (isNaN(min)) min = 0;
			if (isNaN(sec)) secs = 0;

			var totalSec = (hours * 3600) + (min * 60) + (sec * 1);

			var pace = (totalSec / $scope.dist) / 60;

			$scope.paceMin = Math.floor(pace);
			$scope.paceSec = Math.floor((pace - $scope.paceMin) * 60);

			if ($scope.paceSec < 10) $scope.paceSec = "0" + $scope.paceSec;

			$scope.unitStr = $scope.unit.substring(0, ($scope.unit.length - 1)).toLowerCase();
		} else {
			$scope.paceMin = "00";
			$scope.paceSec = "00";
		}
	};

	$("#paceRow").removeClass("hide");
});