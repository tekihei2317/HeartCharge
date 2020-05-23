'use strict';

{
  // クリアタイムを表示
  let clearTimeElem=document.getElementById('clearTime');

  let time=sessionStorage['time'];
  console.log(time);
  if(time==null){
    location.href="index.html";
    /* リロードしたときの表示がおかしくなるので0にしておく */
    time=0;
  }
  sessionStorage.removeItem('time');

  let d=new Date(Number(time));
  const m=new String(d.getMinutes()).padStart(2,'0');
  const s=new String(d.getSeconds()).padStart(2,'0');
  const ms=new String(d.getMilliseconds()).padStart(3,'0');

  clearTimeElem.textContent=`${m}:${s}.${ms}`;

  // ツイート機能
  let tweetButton=document.getElementById('tweet');

  tweetButton.addEventListener("click", ()=>{
    const hashTag=encodeURIComponent('#')+"HeartCharge";
    const comment=`クリアタイムは「${m}:${s}.${ms}」でした！`;
    const link="https://heartchargeproject.web.app";
    const parameter=hashTag+encodeURI('\n')+comment+encodeURI('\n')+link;
    window.open(`https://twitter.com/intent/tweet?text=${parameter}`);
    // location.href=`https://twitter.com/intent/tweet?text=${parameter}`;
  });

  // Firebaseの設定(どこに書くべき...?)
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

  // モーダルウィンドウ(送信)
  const mask=document.getElementById('mask');
  const modalSubmit=document.getElementById('modalSubmit');
  const registerBtn=document.getElementById('register');
  const closeBtn=document.getElementById('close');
  const nameArea=document.getElementById('name');

  registerBtn.addEventListener('click', ()=>{
    modalSubmit.classList.remove('hidden');
    mask.classList.remove('hidden');
    nameArea.focus();
    if(sessionStorage['name']!=null){
      nameArea.value=sessionStorage['name'];
    }
  });

  closeBtn.addEventListener('click', ()=>{
    modalSubmit.classList.add('hidden');
    mask.classList.add('hidden');
  }); 

  mask.addEventListener('click', ()=>{
    closeBtn.click();
  });

  // モーダルウィンドウ(送信後)
  const modalAfter=document.getElementById('modalAfter');
  const comment=document.getElementById('comment');
  const closeBtn2=document.getElementById('close2');

  closeBtn2.addEventListener('click', ()=>{
    modalAfter.classList.add('hidden');
    mask.classList.add('hidden');
  });

  mask.addEventListener('click', ()=>{
    closeBtn2.click();
  });

  // 送信機能
  const form=document.querySelector('form');
  const submitBtn=document.getElementById('submit');

  form.addEventListener('submit', e=>{
    e.preventDefault();
    submitBtn.click();
  });

  submitBtn.addEventListener('click', ()=>{
    const name=nameArea.value.trim();
    if(name=="" || name.length>12) return;

    sessionStorage['name']=name;

    // 初登録or新記録=>追加/更新
    const docRef=collection.doc(name);
    docRef.get().then(doc=>{
      if(!doc.exists){
        // 存在しない場合は追加する
        docRef.set({
          name: name, 
          clearTime: Number(time)
        })
        .then(()=>{
          console.log("Document successfully written!");
        });
        comment.textContent="ランキング登録しました！";
        modalSubmit.classList.add('hidden');
        modalAfter.classList.remove('hidden');
      }
      else{
        // 新記録のとき更新する
        if(Number(time)<doc.data().clearTime){
          docRef.set({
            name: name, 
            clearTime: Number(time)
          })
          .then(()=>{
            console.log("Document successfully updated!");
          });
          comment.textContent="ランキング登録しました！";
          modalSubmit.classList.add('hidden');
          modalAfter.classList.remove('hidden');
        }
        else{
          comment.textContent="記録更新ならず...";
          modalSubmit.classList.add('hidden');
          modalAfter.classList.remove('hidden');
        }
      }
    });
  });

}
