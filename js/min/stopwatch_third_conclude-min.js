!function t(){"use strict";var t=moment.duration(third_conclude_duration,"minutes"),e=t,n=document.getElementById("stopwatch-third-conclude-timer"),r=document.getElementById("stopwatch-third-conclude-toggle"),a=document.getElementById("stopwatch-third-conclude-clear"),o=!1,c=!1,i,d,s,u,l=function(){s=0,o=!0,d=Date.now(),i=setInterval(m,51),r.innerHTML="stop"},f=function(t){for(var e=[36e5,6e4,1e3,10],n=[],r=0;r<e.length;){var a=Math.floor(t/e[r]);t-=a*e[r],a=r>0&&10>a?"0"+a:a,n.push(a),r++}return n},h=function(){var e=f(t);n.innerHTML=e[1]+":"+e[2]+"."+e[3]},m=function(){e=d+t-Date.now()-s,0>=e&&(v(),$("#stopwatch_left").style("background: red;"));var r=f(e);n.innerHTML=r[1]+":"+r[2]+"."+r[3]},v=function(){c=!0,u=Date.now(),r.innerHTML="resume",a.dataset.state="visible",clearInterval(i),m()},L=function(){c=!1,s+=Date.now()-u,i=setInterval(m,51),r.innerHTML="stop",a.dataset.state=""},w=function(){o=!1,c=!1,r.innerHTML="start",n.innerHTML="00:00.00",a.dataset.state="",h()},M=function(){o?c?L():v():l()};h(),r.addEventListener("click",M),a.addEventListener("click",w)}();