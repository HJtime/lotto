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

const buttonContainer=document.querySelector('.number__categories');

buttonContainer.addEventListener('click', (event)=>{
    const active=document.querySelector('.category_btn.active');
    active.classList.remove('active');
    const target=event.target.className==='category_btn'? event.target : event.target.parentNode;
    target.classList.add('active');
});

// 번호 버튼 선택
let count=1;
let lineCount=1;
let i=0;
let result=[0,0,0,0,0,0];

numberBox.addEventListener('click', (event)=>{
    if(lineCount>5){
        alert('더이상 추가할 수 없습니다.');
        return;
    }

    if(count>6){
        alert('번호는 6개만 선택할 수 있습니다.');
        return;    
    }

    const filter=event.target.dataset.number||event.target.parentNode.dataset.number;

    if(filter===undefined||filter===null){
        return;
    }

    const target=event.target.nodeName==='BUTTON'? event.target : event.target.parentNode;
    target.classList.add('active');

    result[i]=filter;

    i++;
    count++;

    console.log(result);
})

// 확인 버튼
const submitBtn=document.querySelector('.number__count .check');

submitBtn.addEventListener('click', ()=>{
    if(count<6){
        alert('번호 6개를 선택하십시오.');
    }else{
        numPrint();
        numClear();
    }
})

// 번호판 초기화 버튼(좌측)
const numResetBtn=document.querySelector('.menu .reset');
const nums=document.querySelectorAll('.num');

numResetBtn.addEventListener('click', ()=>{
    numClear();
})

function numClear(){
    count=1;
    i=0;

    for(let i=0; i<6; i++){
        result[i]=0;
    }

    for(let i=0; i<45; i++){
        nums[i].classList.remove('active');
    }
    console.log(result);
}

// 숫자 출력
function numPrint(){
    const circle=document.querySelectorAll(`.choice__num[data-line="${lineCount}"] .circle`); //라인번호
    result.sort(function (a,b){ return a-b; }); //오름차순 정렬

    for(let i=0; i<6; i++){
        const number=document.createElement('span');
        number.setAttribute('class', 'choicenum');
        number.innerHTML=`${result[i]}`;
        circle[i].appendChild(number);
        switch(Math.ceil(result[i]/10)){
            case 1:
                circle[i].style.background='#FADC6E';
                break;
            case 2:
                circle[i].style.background='#82D5FA';
                break;
            case 3:
                circle[i].style.background='#FA8582';
                break;   
            case 4:
                circle[i].style.background='#AE8CEB';
                break; 
            case 5:
                circle[i].style.background='#97DB68';
                break;    
        }
    }

    count=1;
    lineCount++;
}