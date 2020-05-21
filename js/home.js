'use strict';

document.addEventListener('keydown', (event)=>{
  var keyName=event.key;
  console.log(`${keyName}`);
  if(keyName===" "){
    location.href="countdown.html";
  }
});
