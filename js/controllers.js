var paceApp = angular.module('paceApp', []);

paceApp.controller('calcCtrl', function ($scope) {
	$scope.paceMin = "00";
	$scope.paceSec = "00";
	$scope.dist = 0;
	$scope.unit = "Miles";
	$scope.unitStr = "mile";
	$scope.timeHrs = "hh";
	$scope.timeMin = "mm";
	$scope.timeSec = "ss";

	$scope.rangeLbls = [];
	var ranges = {
		"5k" : {
			"t" : "5k",
			"d" : 3.1,
			"l" : 840,
			"h" : 3600
		},
		"5m" : {
			"t" : "5m",
			"d" : 5,
			"l" : 1500,
			"h" : 6000
		},
		"8k" : {
			"t" : "8k",
			"d" : 4.97,
			"l" : 1500,
			"h" : 6000
		},
		"10k" : {
			"t" : "10k",
			"d" : 6.2,
			"l" : 1860,
			"h" : 7500
		},
		"10m" : {
			"t" : "10m",
			"d" : 10,
			"l" : 3000,
			"h" : 12000
		},
		"13p1" : {
			"t" : "13.1m",
			"d" : 13.1,
			"l" : 3900,
			"h" : 15720
		},
		"26p2" : {
			"t" : "26.2m",
			"d" : 26.2,
			"l" : 7860,
			"h" : 31440
		}
	}

	$scope.applyDistance = function(d) {
		$scope.dist = d;
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
		$scope.rangeLbls = [];
		$.each(ranges, function(i, v) {
			if (totalSec >= v.l && totalSec <= v.h) $scope.rangeLbls.push(v);
		});

		// don't calculate until there's a distance
		if ($scope.dist > 0) {
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

	$("#raceRow").removeClass("hide");
	$("#orRow").removeClass("hide");
	$("#paceRow").removeClass("hide");
});