import { createStore } from 'redux';


//Dom 레퍼런스 (vanilla JS로 HTML에 있는 DOM 요소 선택)
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');


//액션(변수) 생성 - 액션이름 지정
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';


//액션생성함수
//'액션(변수)'을 넣어 '액션 객체(toggleSwitch)' 생성
const toggleSwitch = () => ({ type: TOGGLE_SWITCH})
const increase = (difference) => ({ type: INCREASE, difference})
const decrease = () => ({ type: DECREASE})


//초기값(초기state)
const initialState = {
    toggle: false,
    counter: 0
}


//reducer 함수 : 변화를 일으키는 함수
//action의 type에 따라 state를 변화시킨 결과물 반환
//(state가 undefined일 때는 initialState를 기본값으로 사용)
function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SWITCH:
            return {
                ...state,
                toggle: !state.toggle,
            }
        case INCREASE:
            return {
                ...state,
                counter: state.counter + action.difference,
            }
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1
            }
        default:
            return state;
    }
}


//reducer에서 처리한 내용을 store를 생성해서 저장
const store = createStore(reducer);


//render 함수 => state가 업데이트될 때마다 호출됨
const render = () => {
  //store에 저장되어 있는 현재 상태를 불러온다.
  const state = store.getState();

  //토글 처리
  //toggle이 true인 경우에는
  //divToggle의 class에 'active'를 추가하고
  //(divToggle이 active인 경우에는 노란색으로 변함)
  if (state.toggle) {
    divToggle.classList.add('active');
  } else {
    divToggle.classList.remove('active');
  }

  //카운터 처리
  //counter DOM의 안쪽 text를 state의 counter로 바꿈
  //(이미 여기서 DOM을 지정해주므로 아래 onclick 함수 필요없음)
  counter.innerText = state.counter;
};


//render 함수: 상태가 '업데이트'될 때마다 호출됨
render();


//store에 render함수를 구독
//subscribe: 파라미터로 전달된 함수를 추후 액션이 발생하여 상태가 업데이트될 때마다 호출
//store의 상태가 바뀔 때마다 render함수가 호출되도록 함
store.subscribe(render);



//dispatch(액션생성함수에서 만든 액션 객체) : 액션을 발생시킴
//store.dispatch(액션 객체) : 발생시킨 액션을 store에게 전달
//각 DOM을 클릭 시 store에 액션함수를 전달하게 함
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
    store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
    store.dispatch(decrease());
};
