'use strict';

{
  let timer=document.getElementById('timer');
  console.log(timer);

  let rest=3;
  function countDown(){
    rest--;
    if(rest>0){
      timer.textContent=rest;
      setTimeout(countDown, 1000);
    }else{
      location.href="play.html";
    }
  }
  // 最初の一秒を調整
  setTimeout(countDown, 900);
}
