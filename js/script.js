var second_duration=2.5;
var free_duration=4;

(function countdownTimer() {
	'use strict';

	//declare
	var output = document.getElementById('timer');
	var toggle = document.getElementById('toggle');
	var clear = document.getElementById('clear');
	var running = false;
	var paused = false;
	var timer;

	// timer start time
	var then;
	// pause duration
	var delay;
	// pause start time
	var delayThen;


	// start timer
	var start = function() {
		delay = 0;
		running = true;
		then = Date.now();
		timer = setInterval(run,51);
		toggle.innerHTML = 'stop';
	};


	// parse time in ms for output
	var parseTime = function(elapsed) {
		// array of time multiples [hours, min, sec, decimal]
		var d = [3600000,60000,1000,10];
		var time = [];
		var i = 0;

		while (i < d.length) {
			var t = Math.floor(elapsed/d[i]);

			// remove parsed time for next iteration
			elapsed -= t*d[i];

			// add '0' prefix to m,s,d when needed
			t = (i > 0 && t < 10) ? '0' + t : t;
			time.push(t);
			i++;
		}

		return time;
	};


	// run
	var run = function() {
		// get output array and print
		var time = parseTime(Date.now()-then-delay);
		output.innerHTML = time[0] + ':' + time[1] + ':' + time[2] + '.' + time[3];
	};


	// stop
	var stop = function() {
		paused = true;
		delayThen = Date.now();
		toggle.innerHTML = 'resume';
		clear.dataset.state = 'visible';
		clearInterval(timer);

		// call one last time to print exact time
		run();
	};


	// resume
	var resume = function() {
		paused = false;
		delay += Date.now()-delayThen;
		timer = setInterval(run,51);
		toggle.innerHTML = 'stop';
		clear.dataset.state = '';
	};


	// clear
	var reset = function() {
		running = false;
		paused = false;
		toggle.innerHTML = 'start';
		output.innerHTML = '0:00:00.00';
		clear.dataset.state = '';
	};


	// evaluate and route
	var router = function() {
		if (!running) {start();}
		else if (paused) {resume();}
		else {stop();}
	};

	toggle.addEventListener('click',router);
	clear.addEventListener('click',reset);

})();

(function secondDebate() {
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
			$("#left .toggle").prop("disabled", false);
			$("#right .toggle").prop("disabled", true);
			$("#right .toggle").addClass("btn-default btn-disabled");
			$("#right .toggle").removeClass("btn-primary");
			return $("#left .toggle").addClass("btn-primary");
		} else if (elem === "left") {
			$("#left .toggle").prop("disabled", true);
			$("#right .toggle").prop("disabled", false);
			$("#left .toggle").addClass("btn-default btn-disabled");
			$("#left .toggle").removeClass("btn-primary");
			return $("#right .toggle").addClass("btn-primary");
		}
	};

	resetButtonClasses = function() {
		$("#left input").addClass("btn-primary");
		$("#left input").removeClass("btn-default btn-disabled");
		$("#right input").addClass("btn-primary");
		return $("#right input").removeClass("btn-default btn-disabled");
	};

	displayTime = function(elem, time) {
		return $(elem).html(getTimeString(time));
	};

	jQuery(function($) {
		var leftTimer, resetAll, rightTimer, t1, t2;
		t1 = moment.duration(second_duration, "minutes");
		t2 = moment.duration(second_duration, "minutes");
		displayTime("#left .time", t1);
		displayTime("#right .time", t2);
		rightTimer = $('#right .toggle').on('click', function() {
			if (leftTimer) {
				clearInterval(leftTimer);
				toggleButtons("right");
			}
			return rightTimer = setInterval(function() {
				if (t2.as('seconds') > 0) {
					t2.subtract(moment.duration(1, 's'));
					return displayTime("#right .time", t2);
				} else {
					return clearInterval(self);
				}
			}, 1000);
		});
		leftTimer = $('#left .toggle').on('click', function() {
			if (rightTimer) {
				clearInterval(rightTimer);
				toggleButtons("left");
			}
			return leftTimer = setInterval(function() {
				if (t1.as('seconds') > 0) {
					t1.subtract(moment.duration(1, 's'));
					return displayTime("#left .time", t1);
				} else {
					return clearInterval(self);
				}
			}, 1000);
		});
		$("#pause").on('click', function() {
			if ($("#left .toggle").prop === "disabled") {
				toggleButtons("left");
			} else {
				toggleButtons("right");
			}
			clearInterval(leftTimer);
			return clearInterval(rightTimer);
		});
		$("#reset").on('click', function() {
			$('#time-input').val(20);
			return resetAll(20);
		});
		$('#time-input').on('change', function() {
			return resetAll(parseInt($('#time-input').val()));
		});
		return resetAll = function(minutes) {
			clearInterval(leftTimer);
			clearInterval(rightTimer);
			t1 = moment.duration(minutes, "minutes");
			t2 = moment.duration(minutes, "minutes");
			displayTime("#left .time", t1);
			displayTime("#right .time", t2);
			$("#left input").prop("disabled", false);
			$("#right input").prop("disabled", false);
			return resetButtonClasses();
		};
	});
})();
