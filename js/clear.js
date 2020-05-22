'use strict';

{
  // クリアタイムを表示
  let clearTimeElem=document.getElementById('clearTime');

  const parameter=location.search.substring(1);
  const time=parameter.split('=')[1];

  let d=new Date(Number(time));
  const m=new String(d.getMinutes()).padStart(2,'0');
  const s=new String(d.getSeconds()).padStart(2,'0');
  const ms=new String(d.getMilliseconds()).padStart(3,'0');

  clearTimeElem.textContent=`${m}:${s}.${ms}`;


  // ツイート機能
  let tweetButton=document.getElementById('tweet');

  // TODO: リンクを書き換える
  tweetButton.addEventListener("click", ()=>{
    const comment=`〜の記録は「${m}:${s}.${ms}」でした！`;
    const link="/home/tekihei/Desktop/HeartCharge";
    const parameter=comment+encodeURI('\n')+link;
    location.href=`https://twitter.com/intent/tweet?text=${parameter}`;
  });


  // Firebaseの設定
  const firebaseConfig = {
    apiKey: "AIzaSyCM-ptIaONdCWnT0jcda1D9Bas4WUcrLrU",
    authDomain: "heartchargeproject.firebaseapp.com",
    databaseURL: "https://heartchargeproject.firebaseio.com",
    projectId: "heartchargeproject",
    storageBucket: "heartchargeproject.appspot.com",
    messagingSenderId: "136477776839",
    appId: "1:136477776839:web:bed1ab1664c9a6896d97e2",
    measurementId: "G-S7SZVR8Q1R"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db=firebase.firestore();
  const collection=db.collection('records');

  /*
  collection.add({
  })
  .then(doc=>{
    console.log(`${doc.id} added!`);
  })
  .catch(error=>{
    console.log(error);
  });
  */

  // モーダルウィンドウ
  const modal=document.getElementById('modal');
  const mask=document.getElementById('mask');
  const rankingBtn=document.getElementById('ranking');
  const closeBtn=document.getElementById('close');
  const nameArea=document.getElementById('name');

  rankingBtn.addEventListener('click', ()=>{
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', ()=>{
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  }); 

  mask.addEventListener('click', ()=>{
    closeBtn.click();
  });


  // 送信機能
  const submitBtn=document.getElementById('submit');

  submitBtn.addEventListener('click', ()=>{
    const name=nameArea.value.trim();
    if(name=="") return;

    collection.add({
      name: name, 
      clearTime: Number(time)
    })
    .then(doc=>{
      console.log(`${doc.id} added!`);
    })
    .catch(error=>{
      console.log(error);
    });
  });
}
