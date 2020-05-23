'use strict';

{
  // Firebaseの設定(初期化?)
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

  const table=document.querySelector('table');
  
  function timeFormat(time)
  {
    const d=new Date(time);
    const m=new String(d.getMinutes()).padStart(2, '0');
    const s=new String(d.getSeconds()).padStart(2, '0');
    const ms=new String(d.getMilliseconds()).padStart(3, '0');
    return m+":"+s+"."+ms;
  };

  let curRank=0;
  collection.orderBy("clearTime").get().then(snapshot=>{
    snapshot.forEach(doc=>{
      let row=document.createElement('tr');
      let rank=document.createElement('td');
      let name=document.createElement('td');
      let time=document.createElement('td');

      curRank++;
      rank.textContent=`${curRank}位`;
      name.textContent=doc.data().name;
      time.textContent=timeFormat(doc.data().clearTime);

      row.appendChild(rank);
      row.appendChild(name);
      row.appendChild(time);
      table.appendChild(row);
    });
  });
}
