!function t(){"use strict";var t=moment.duration(first_duration,"minutes"),e=t,n=document.getElementById("stopwatch-first-timer"),r=document.getElementById("stopwatch-first-toggle"),a=document.getElementById("stopwatch-first-clear"),i=!1,o=!1,s,c,u,d,f=function(){u=0,i=!0,c=Date.now(),s=setInterval(v,51),r.innerHTML="stop"},l=function(t){for(var e=[36e5,6e4,1e3,10],n=[],r=0;r<e.length;){var a=Math.floor(t/e[r]);t-=a*e[r],a=r>0&&10>a?"0"+a:a,n.push(a),r++}return n},m=function(){var e=l(t);n.innerHTML=e[1]+":"+e[2]+"."+e[3]},v=function(){e=c+t-Date.now()-u,0>=e&&(L(),$("#stopwatch_left").style("background: red;"));var r=l(e);n.innerHTML=r[1]+":"+r[2]+"."+r[3]},L=function(){o=!0,d=Date.now(),r.innerHTML="resume",a.dataset.state="visible",clearInterval(s),v()},w=function(){o=!1,u+=Date.now()-d,s=setInterval(v,51),r.innerHTML="stop",a.dataset.state=""},M=function(){i=!1,o=!1,r.innerHTML="start",n.innerHTML="00:00.00",a.dataset.state="",m()},g=function(){i?o?w():L():f()};m(),r.addEventListener("click",g),a.addEventListener("click",M)}();