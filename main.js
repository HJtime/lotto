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

// 혼합선택 버튼
const selectBtn=document.querySelector('#select');
const popup=document.querySelector('.pop-up');

selectBtn.addEventListener('click',()=>{
    popup.classList.add('visible');
})

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
})

// 번호 랜덤 생성
const autoBtn=document.querySelector('#auto');
let autoCount=1;
let j=0;
let num;

autoBtn.addEventListener('click',()=>{
    popup.classList.remove('visible');
    numClear();

    let i=0;

    if(autoCount>5 || lineCount>5){
        alert('더이상 추가할 수 없습니다.');
        return;
    }

    do{
        num=Math.floor(Math.random()*45)+1;
        for(j=0; j<=i; j++){
            if(num==result[j])break; //결과 배열에 이미 저장된 숫자인지 체크
        }
        if(j<i) continue;
        result[i]=num; //결과 배열에 랜덤 값 저장
        i++;
    }while(i<6)
    
    numPrint();
    moneyChange();
    autoCount++;
})

// 수량 변경(텍스트)
const select=document.querySelector('#count-select');
const countTxt=document.querySelector('.number__box .money span');
let amount=1;

select.addEventListener('change',()=>{
    const selectValue=select.options[select.selectedIndex].value;
    countTxt.textContent=`${selectValue},000원`;
    amount=selectValue;
})

// 금액 변경
const moneyTxt=document.querySelector('.choice__money .money');

function moneyChange(){
    moneyTxt.textContent=`${lineCount-1},000원`;
}

// 예치금
const balance=document.querySelector('.balance');
const balanceMoney=5
balance.textContent=`${balanceMoney},000원`;

function balanceMinus(){
    balance.textContent=`${balanceMoney-(lineCount-1)},000원`;
    console.log(balanceMoney);
}

// 확인 버튼
const submitBtn=document.querySelector('.number__count .check');

submitBtn.addEventListener('click', ()=>{
    if(count<6){
        alert('번호 6개를 선택하십시오.');
    }else{
        let i=0;
        while(i<amount){
            numPrint();
            i++;
        }
        numClear();
        moneyChange();
    }
})

// 구매하기 버튼
const payBtn=document.querySelector('.choice__pay button');
payBtn.addEventListener('click', ()=>{
    const checkConfirm=confirm('구매하시겠습니까?');

    if(checkConfirm===true){
        alert('구매가 완료되었습니다.');
        balanceMinus();
        console.log(lineCount);
        choiceClear();
    }else{
        alert('구매가 취소되었습니다.');
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
}

// 선택 번호판 리셋 버튼(우측)
const choiceResetBtn=document.querySelector('.choice__top .reset');

choiceResetBtn.addEventListener('click', ()=>{
    choiceClear();
})

function choiceClear(){
    const choicenum=document.querySelectorAll('.choicenum');
    const circle=document.querySelectorAll('.circle');

    for(let i=0; i<choicenum.length; i++){
        choicenum[i].remove();
    }

    for(let i=0; i<circle.length; i++){
        circle[i].style.background='#eeeeee';
    }

    lineCount=1;
    autoCount=1;
    moneyChange();
}

// 라인 삭제
const miniMenu=document.querySelector('.choice__number');

miniMenu.addEventListener('click',(event)=>{
    const id=event.target.className==='delete'? event.target.dataset.id : event.target.parentNode.dataset.id;

    if(id===undefined||id===null){
        return;
    }

    if(id){
        const choicenum=document.querySelectorAll(`.choice__num[data-line="${id}"] .choicenum`);
        const romoveCircle=document.querySelectorAll(`.choice__num[data-line="${id}"] .circle`);
    
        for(let i=0; i<6; i++){
            choicenum[i].remove();
            romoveCircle[i].style.background='#eeeeee';
        }
    }

    count=1;
    autoCount--;
    lineCount--;
    moneyChange();
})

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