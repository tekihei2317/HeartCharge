'use strict';

{
  let timer=document.getElementById('timer');

  let startTime=Date.now();
  let clearTime;
  let timeoutId;

  function printElapsedTime(){
    const d=new Date(Date.now()-startTime);
    const m=new String(d.getMinutes()).padStart(2, '0');
    const s=new String(d.getSeconds()).padStart(2, '0');
    const ms=new String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent=`${m}:${s}:${ms}`;

    timeoutId=setTimeout(()=>{
      printElapsedTime();
    }, 10);
  }

  printElapsedTime();
  
  const needCnt=70;
  let cnt=0;

  let heart=document.getElementById('heart');
  const maxHeight=280;
  const maxWidth=280;
  let curHeight=0;

  let style=heart.style;
  style.clip=`rect(${maxHeight-curHeight}px, ${maxWidth}px, ${maxHeight}px, 0px)`;
  style.display="inline";

  document.addEventListener('keyup', (event)=>{
    if(event.key==="j"){
      cnt++;

      curHeight+=maxHeight/needCnt;
      style.clip=`rect(${maxHeight-curHeight}px, ${maxWidth}px, ${maxHeight}px, 0px)`;
    }

    if(cnt===needCnt){
      clearTime=Date.now()-startTime;
      clearTimeout(timeoutId);
      sessionStorage['time']=clearTime;
      location.href=`clear.html`;
    }
  });
}
