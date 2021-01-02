'use strict'

const numberBox=document.querySelector('.numberlist');

// 로또 번호 배치
for(let i=1; i<46; i++){
    const number=document.createElement('button');
    number.setAttribute('class', 'num');
    number.setAttribute('data-number', i);
    number.innerHTML=`${i}`;
    numberBox.appendChild(number);
}