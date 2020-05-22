'use strict';

{
  let heart=document.getElementById('heart');
  let style=heart.style;

  /* ハートを再表示する */
  style.display="inline";

  const heartHeight=600;
  const heartWidth=720;
  let curHeight=0;
  style.clip=`rect(${heartHeight-curHeight}px, ${heartWidth}px, ${heartHeight}px, 0px`;

  function addHeight(){
    if(curHeight<heartHeight){
      curHeight+=2;
      style.clip=`rect(${heartHeight-curHeight}px, ${heartWidth}px, ${heartHeight}px, 0px`;
      setTimeout(addHeight, 5);
    }
  }
  addHeight();

}
