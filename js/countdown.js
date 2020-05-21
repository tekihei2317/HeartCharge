'use strict';

{
  let timer=document.getElementById('timer');
  console.log(timer);

  /*
  let rest=3;
  function countDown(){
    rest--;
    if(rest>0){
      timer.textContent=rest;
    }else{
      location.href="play.html";
    }
  }
  setInterval(countDown, 1000);
  */

  // 改良版(最初の一秒が遅かったので)
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
  setTimeout(countDown, 900);
}
