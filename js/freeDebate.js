(function freeDebate() {
	var duration = free_duration;
	var displayTime, getTimeString, resetButtonClasses, toggleButtons;

	getTimeString = function(time) {
		var secs;
		secs = time.get('seconds');
		if (secs < 10) {
			secs = "0" + secs;
		}
		return (time.get('minutes')) + ":" + secs;
	};

	toggleButtons = function(elem) {
		if (elem === "right") {
			$("#free-left .toggle").prop("disabled", false);
			$("#free-right .toggle").prop("disabled", true);
			$("#free-right .toggle").addClass("btn-default btn-disabled");
			$("#free-right .toggle").removeClass("btn-primary");
			return $("#free-left .toggle").addClass("btn-primary");
		} else if (elem === "left") {
			$("#free-left .toggle").prop("disabled", true);
			$("#free-right .toggle").prop("disabled", false);
			$("#free-left .toggle").addClass("btn-default btn-disabled");
			$("#free-left .toggle").removeClass("btn-primary");
			return $("#free-right .toggle").addClass("btn-primary");
		}
	};

	resetButtonClasses = function() {
		$("#free-left input").addClass("btn-primary");
		$("#free-left input").removeClass("btn-default btn-disabled");
		$("#free-right input").addClass("btn-primary");
		return $("#free-right input").removeClass("btn-default btn-disabled");
	};

	displayTime = function(elem, time) {
		return $(elem).html(getTimeString(time));
	};

	jQuery(function($) {
		var leftTimer, resetAll, rightTimer, t1, t2;
		t1 = moment.duration(duration, "minutes");
		t2 = moment.duration(duration, "minutes");
		displayTime("#free-left .time", t1);
		displayTime("#free-right .time", t2);
		rightTimer = $('#free-right .toggle').on('click', function() {
			if (leftTimer) {
				clearInterval(leftTimer);
				toggleButtons("right");
			}
			return rightTimer = setInterval(function() {
				if (t2.as('seconds') > 0) {
					t2.subtract(moment.duration(1, 's'));
					return displayTime("#free-right .time", t2);
				} else {
					return clearInterval(self);
				}
			}, 1000);
		});
		leftTimer = $('#free-left .toggle').on('click', function() {
			if (rightTimer) {
				clearInterval(rightTimer);
				toggleButtons("left");
			}
			return leftTimer = setInterval(function() {
				if (t1.as('seconds') > 0) {
					t1.subtract(moment.duration(1, 's'));
					return displayTime("#free-left .time", t1);
				} else {
					return clearInterval(self);
				}
			}, 1000);
		});
		$("#free-pause").on('click', function() {
			if ($("#free-left .toggle").prop === "disabled") {
				toggleButtons("left");
			} else {
				toggleButtons("right");
			}
			clearInterval(leftTimer);
			return clearInterval(rightTimer);
		});
		$("#free-reset").on('click', function() {
			$('#free-time-input').val(duration);
			return resetAll(duration);
		});
		$('#free-time-input').on('change', function() {
			return resetAll(parseInt($('#free-time-input').val()));
		});
		return resetAll = function(minutes) {
			clearInterval(leftTimer);
			clearInterval(rightTimer);
			t1 = moment.duration(minutes, "minutes");
			t2 = moment.duration(minutes, "minutes");
			displayTime("#free-left .time", t1);
			displayTime("#free-right .time", t2);
			$("#free-left input").prop("disabled", false);
			$("#free-right input").prop("disabled", false);
			return resetButtonClasses();
		};
	});
})();