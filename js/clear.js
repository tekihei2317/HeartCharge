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
  console.log(tweetButton);

  // デプロイしたときにリンクを書き換える
  tweetButton.addEventListener("click", ()=>{
    const comment=`〜の記録は「${m}:${s}.${ms}」でした！`;
    const link="/home/tekihei/Desktop/HeartCharge";
    const parameter=comment+encodeURI('\n')+link;
    location.href=`https://twitter.com/intent/tweet?text=${parameter}`;
  });
}
