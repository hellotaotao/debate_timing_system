!function t(){"use strict";var t=moment.duration(discuss_duration,"minutes"),e=t,n=document.getElementById("stopwatch-discuss-timer"),s=document.getElementById("stopwatch-discuss-toggle"),a=document.getElementById("stopwatch-discuss-clear"),i=!1,r=!1,o,c,u,d,l=function(){u=0,i=!0,c=Date.now(),o=setInterval(v,51),s.innerHTML="stop"},f=function(t){for(var e=[36e5,6e4,1e3,10],n=[],s=0;s<e.length;){var a=Math.floor(t/e[s]);t-=a*e[s],a=s>0&&10>a?"0"+a:a,n.push(a),s++}return n},m=function(){var e=f(t);n.innerHTML=e[1]+":"+e[2]},v=function(){e=c+t-Date.now()-u,0>=e&&(L(),$("#stopwatch_left").style("background: red;"));var s=f(e);n.innerHTML=s[1]+":"+s[2]},L=function(){r=!0,d=Date.now(),s.innerHTML="resume",a.dataset.state="visible",clearInterval(o),v()},w=function(){r=!1,u+=Date.now()-d,o=setInterval(v,51),s.innerHTML="stop",a.dataset.state=""},M=function(){i=!1,r=!1,s.innerHTML="start",n.innerHTML="00:00.00",a.dataset.state="",m()},g=function(){i?r?w():L():l()};m(),s.addEventListener("click",g),a.addEventListener("click",M)}();