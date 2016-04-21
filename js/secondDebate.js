(function secondDebate() {
	var duration=second_duration;
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
			$("#second-left .toggle").prop("disabled", false);
			$("#second-right .toggle").prop("disabled", true);
			$("#second-right .toggle").addClass("btn-default btn-disabled");
			$("#second-right .toggle").removeClass("btn-primary");
			return $("#second-left .toggle").addClass("btn-primary");
		} else if (elem === "left") {
			$("#second-left .toggle").prop("disabled", true);
			$("#second-right .toggle").prop("disabled", false);
			$("#second-left .toggle").addClass("btn-default btn-disabled");
			$("#second-left .toggle").removeClass("btn-primary");
			return $("#second-right .toggle").addClass("btn-primary");
		}
	};

	resetButtonClasses = function() {
		$("#second-left input").addClass("btn-primary");
		$("#second-left input").removeClass("btn-default btn-disabled");
		$("#second-right input").addClass("btn-primary");
		return $("#second-right input").removeClass("btn-default btn-disabled");
	};

	displayTime = function(elem, time) {
		return $(elem).html(getTimeString(time));
	};

	jQuery(function($) {
		var leftTimer, resetAll, rightTimer, t1, t2;
		t1 = moment.duration(duration, "minutes");
		t2 = moment.duration(duration, "minutes");
		displayTime("#second-left .time", t1);
		displayTime("#second-right .time", t2);
		rightTimer = $('#second-right .toggle').on('click', function() {
			if (leftTimer) {
				clearInterval(leftTimer);
				toggleButtons("right");
			}
			return rightTimer = setInterval(function() {
				if (t2.as('seconds') > 0) {
					t2.subtract(moment.duration(1, 's'));
					return displayTime("#second-right .time", t2);
				} else {
					return clearInterval(self);
				}
			}, 1000);
		});
		leftTimer = $('#second-left .toggle').on('click', function() {
			if (rightTimer) {
				clearInterval(rightTimer);
				toggleButtons("left");
			}
			return leftTimer = setInterval(function() {
				if (t1.as('seconds') > 0) {
					t1.subtract(moment.duration(1, 's'));
					return displayTime("#second-left .time", t1);
				} else {
					return clearInterval(self);
				}
			}, 1000);
		});
		$("#second-pause").on('click', function() {
			if ($("#second-left .toggle").prop === "disabled") {
				toggleButtons("left");
			} else {
				toggleButtons("right");
			}
			clearInterval(leftTimer);
			return clearInterval(rightTimer);
		});
		$("#second-reset").on('click', function() {
			$('#second-time-input').val(duration);
			return resetAll(duration);
		});
		$('#second-time-input').on('change', function() {
			return resetAll(parseInt($('#second-time-input').val()));
		});
		return resetAll = function(minutes) {
			clearInterval(leftTimer);
			clearInterval(rightTimer);
			t1 = moment.duration(minutes, "minutes");
			t2 = moment.duration(minutes, "minutes");
			displayTime("#second-left .time", t1);
			displayTime("#second-right .time", t2);
			$("#second-left input").prop("disabled", false);
			$("#second-right input").prop("disabled", false);
			return resetButtonClasses();
		};
	});
})();