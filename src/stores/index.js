//CMD> npm i vuex@next --save
import { createStore } from "vuex";
import axios from 'axios';

export default createStore({

    // 상태변수(전역변수)
    // 어떤 컴포넌트에서 바꿀수있는 변수
    state : {
        counter : 20,
        menu    : 'home',
        items   : [], 
    },

    // 결과 값을 가지고 가는 메소드
    getters : {
        getItems(state){
            return state.items;
        },

        getMenu(state){
            return state.menu;
            
        },
        getCounter(state) { // 그대로 값
            return state.counter;
        },

        getCounter1: state => { // 가공된 값
            return state.counter * 2;
        }
    },
    // 결과값을 바꾸는 것(동기 : 순차적으로 실행)
    mutations : {
        setItems(state, value){
            state.items = value;
        },

        setMenu : (state, value) => {
            state.counter =value;
        },

        setCounter : (state, value) => {
            state.counter =value;
        },

        setCounter1(state, value){
            state.counter = value + 100;
        }
    },

    // 결과값을 바꾸는 것(비동기 : 시작순서만 순차적 끝나는 시점은 X)
    actions : {
       
        // 사용하고자 하는 컴포넌트에서 page정보를 절달함
        async handleData(context, payload){
            const page = payload.page;
            console.log(page);

            const url = `http://ihongss.com/json/board.json?page=${page}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers:headers});
            if(response.data.ret === 'y'){
                context.commit('setItems', response.data.data);
            }
        }
    },

})