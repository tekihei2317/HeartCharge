'use strict';

{
  let heart=document.getElementById('heart2');
  console.log(heart);
  let style=heart.style;
  console.log(style);

  const heartHeight=560;
  const heartWidth=600;
  let curHeight=200;

  console.log(`rect(${heartHeight-curHeight}px, ${heartWidth}px, ${heartHeight}px, 0px)`);
  style.clip=`rect(${heartHeight-curHeight}px, ${heartWidth}px, ${heartHeight}px, 0px)`;
}
