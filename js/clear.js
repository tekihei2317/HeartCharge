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
  const close2=document.getElementById('close2');

  close2.addEventListener('click', ()=>{
    modalAfter.classList.add('hidden');
    mask.classList.add('hidden');
  });

  // 送信機能
  const submitBtn=document.getElementById('submit');
  submitBtn.addEventListener('click', ()=>{
    const name=nameArea.value.trim();
    if(name=="") return;

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
        comment.textContent="ランキング登録しました";
        modalSubmit.classList.add('hidden');
        modalAfter.classList.remove('hidden');
      }
      else{
        // 新記録のとき更新する
        if(Number(time)>=doc.data().clearTime){
          comment.textContent="記録更新ならず...";
          modalSubmit.classList.add('hidden');
          modalAfter.classList.remove('hidden');
        }
        else{
          docRef.set({
            name: name, 
            clearTime: Number(time)
          })
          .then(()=>{
            console.log("Document successfully updated!");
          });
          comment.textContent="ランキング登録しました";
          modalSubmit.classList.add('hidden');
          modalAfter.classList.remove('hidden');
        }
      }
    });
  });
}
