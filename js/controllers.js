var paceApp = angular.module('paceApp', []);

paceApp.controller('calcCtrl', function ($scope) {
	$scope.paceMin = "00";
	$scope.paceSec = "00";
	$scope.dist = 0;
	$scope.unit = "Miles";
	$scope.unitStr = "mile";

	$scope.guesses = [];
	$scope.ranges = [
		{
			"t" : "5k",
			"d" : 3.1,
			"l" : 840,
			"h" : 3600
		},
		{
			"t" : "5m",
			"d" : 5,
			"l" : 1500,
			"h" : 6000
		},
		{
			"t" : "8k",
			"d" : 4.97,
			"l" : 1500,
			"h" : 6000
		},
		{
			"t" : "10k",
			"d" : 6.2,
			"l" : 1860,
			"h" : 7500
		},
		{
			"t" : "10m",
			"d" : 10,
			"l" : 3000,
			"h" : 12000
		},
		{
			"t" : "13.1m",
			"d" : 13.1,
			"l" : 3900,
			"h" : 15720
		},
		{
			"t" : "26.2m",
			"d" : 26.2,
			"l" : 7860,
			"h" : 31440
		}
	]

	$scope.applyDistance = function(d) {
		$scope.dist = d;
		$scope.unit = "Miles";
		$scope.calculate();
	};

	$scope.calculate = function() {
		var hours = $scope.timeHrs;
		var min = $scope.timeMin;
		var sec = $scope.timeSec;

		// do some error checking for NaN
		if (isNaN(hours)) hours = 0;
		if (isNaN(min)) min = 0;
		if (isNaN(sec)) sec = 0;
		var totalSec = (hours * 3600) + (min * 60) + (sec * 1);

		// try to guess at the distance
		$scope.guesses = [];
		$.each($scope.ranges, function(i, v) {
			if (totalSec >= v.l && totalSec <= v.h) $scope.guesses.push(i);
		});

		// don't calculate until there's a distance
		if ($scope.dist > 0) {
			// apply unity scaler based on unit type
			// scale everything to miles
			var unitScale = 1;
			if ($scope.unit == "Kms") 
				unitScale = 0.621371;
			else if ($scope.unit == "Meters")
				unitScale = 0.000621371;
			else if ($scope.unit == "Yards")
				unitScale = 0.000568182;

			var pace = (totalSec / ($scope.dist * unitScale)) / 60;

			$scope.paceMin = Math.floor(pace);
			$scope.paceSec = Math.floor((pace - $scope.paceMin) * 60);

			if ($scope.paceSec < 10) $scope.paceSec = "0" + $scope.paceSec;

			$scope.unitStr = $scope.unit.substring(0, ($scope.unit.length - 1)).toLowerCase();
		} else {
			$scope.paceMin = "00";
			$scope.paceSec = "00";
		}
	};

	// now that angular is loaded show hidden elements
	// this is to prevent ugly screen flicker on inital page load
	$(".row").removeClass("hide");
});