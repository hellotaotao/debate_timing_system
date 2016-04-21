(function countdownTimerDiscuss() {
    'use strict';
    var duration = moment.duration(discuss_duration, "minutes");
    var time_left=duration;
    //declare
    var output = document.getElementById('stopwatch-discuss-timer');
    var toggle = document.getElementById('stopwatch-discuss-toggle');
    var clear = document.getElementById('stopwatch-discuss-clear');
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


    // init
    var init = function() {
        var time = parseTime(duration);
        output.innerHTML = time[1] + ':' + time[2] + '.' + time[3];
    };

    // run
    var run = function() {
        // get output array and print
        time_left = then+duration-Date.now()-delay;
        if (time_left<=0) {
            stop();
            $("#stopwatch_left").style("background: red;");
        }
        var time = parseTime(time_left);
        output.innerHTML = time[1] + ':' + time[2] + '.' + time[3];
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
        output.innerHTML = '00:00.00';
        clear.dataset.state = '';
        init();
    };


    // evaluate and route
    var router = function() {
        if (!running) {start();}
        else if (paused) {resume();}
        else {stop();}
    };
    init();
    toggle.addEventListener('click',router);
    clear.addEventListener('click',reset);

})();


