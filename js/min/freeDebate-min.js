!function e(){var e=free_duration,t,r,n,i;r=function(e){var t;return t=e.get("seconds"),10>t&&(t="0"+t),e.get("minutes")+":"+t},i=function(e){return"right"===e?($("#free-left .toggle").prop("disabled",!1),$("#free-right .toggle").prop("disabled",!0),$("#free-right .toggle").addClass("btn-default btn-disabled"),$("#free-right .toggle").removeClass("btn-primary"),$("#free-left .toggle").addClass("btn-primary")):"left"===e?($("#free-left .toggle").prop("disabled",!0),$("#free-right .toggle").prop("disabled",!1),$("#free-left .toggle").addClass("btn-default btn-disabled"),$("#free-left .toggle").removeClass("btn-primary"),$("#free-right .toggle").addClass("btn-primary")):void 0},n=function(){return $("#free-left input").addClass("btn-primary"),$("#free-left input").removeClass("btn-default btn-disabled"),$("#free-right input").addClass("btn-primary"),$("#free-right input").removeClass("btn-default btn-disabled")},t=function(e,t){return $(e).html(r(t))},jQuery(function($){var r,l,a,f,o;return f=moment.duration(e,"minutes"),o=moment.duration(e,"minutes"),t("#free-left .time",f),t("#free-right .time",o),a=$("#free-right .toggle").on("click",function(){return r&&(clearInterval(r),i("right")),a=setInterval(function(){return o.as("seconds")>0?(o.subtract(moment.duration(1,"s")),t("#free-right .time",o)):clearInterval(self)},1e3)}),r=$("#free-left .toggle").on("click",function(){return a&&(clearInterval(a),i("left")),r=setInterval(function(){return f.as("seconds")>0?(f.subtract(moment.duration(1,"s")),t("#free-left .time",f)):clearInterval(self)},1e3)}),$("#free-pause").on("click",function(){return i("disabled"===$("#free-left .toggle").prop?"left":"right"),clearInterval(r),clearInterval(a)}),$("#free-reset").on("click",function(){return $("#free-time-input").val(e),l(e)}),$("#free-time-input").on("change",function(){return l(parseInt($("#free-time-input").val()))}),l=function(e){return clearInterval(r),clearInterval(a),f=moment.duration(e,"minutes"),o=moment.duration(e,"minutes"),t("#free-left .time",f),t("#free-right .time",o),$("#free-left input").prop("disabled",!1),$("#free-right input").prop("disabled",!1),n()}})}();