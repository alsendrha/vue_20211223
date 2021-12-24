<template>
  <div>
    
    <el-container>
      <el-header>
        <el-menu  class="el-menu-demo" mode="horizontal" :router="true">
          <el-menu-item index="home" ref="home">홈</el-menu-item>
          <el-menu-item index="login" ref="login" v-show="!logged">로그인</el-menu-item>
          <el-menu-item index="logout" ref="logout" v-show="logged">로그아웃</el-menu-item>
          <el-menu-item index="mypage" ref="mypage" v-show="logged">마이페이지</el-menu-item>
          <el-menu-item index="join" ref="join">회원가입</el-menu-item>
          <el-menu-item index="board" ref="board">게시판</el-menu-item>

        </el-menu>
      </el-header>
      <!-- v-if = 태그를 생성시키지 않음 
         v-show = 태그를 생성, 숨김으로 -->

      <el-main>
        <router-view @changeLogged="changeLogged"></router-view>
      </el-main>

      <el-footer>Footer</el-footer>
    </el-container>
    
  </div>
</template>

<script>
  import {useStore} from 'vuex';
  export default {
    // 가장먼저 호출됨. 태그를 생성이 완료가 안되서 태그를 찾거나 클릭 x
    // DOM 접근 불가 벡엔드로 데이터를 받는것.
    created(){
      
    
    },

    // DOM 접근이 가능 ex) 태그를 조작, 클릭등을 수행
    mounted(){
      //localhost:8080/abc / abc abc
      console.log(window.location.pathname.substr(1));
      const path = window.location.pathname.substr(1);
      this.changeLogged(path);
      //console.log(path);

      // 메소드 로그인상태를 체크해서 메뉴를 변경(로그인, 로그아웃)
      //path클릭을 해야되는 메뉴의 종류를 전달

      // store가 변화할떄 자동으로 수행
      this.store.subscribe((mutation, state)=>{
        console.log(mutation, state);

        if(mutation.type==='setMenu'){
          const tmp = mutation.payload;
          this.changeLogged(tmp);
        }
      });
    },

    data(){
      return{
        logged : false,
        store : useStore()
      }
    },

    methods:{
      
      changeLogged(path){//현재 로그인 상태를 확인하기
        console.log('changeLogged', path);
        // 세션 저장소로부터 토큰값(인증키)을 읽음
        const token = sessionStorage.getItem("TOKEN");

        if(token === null){ //로그인을 못했음
          this.logged = false; //state변수에 logged를 거짓
        }
        else{
          this.logged = true;
        }

        //this.$refs.home.click(); === this.$refs['home'].click();
        //this.$refs.login.click(); === this.$refs['login'].click();
        //this.$refs.path.click(); 레퍼런스에서 패스 찾기(x) === this.$refs[path].click(); //path 내용물 찾기
        

        this.$refs[path].$el.click(); //path 내용물 찾기

      }
    } 
  }
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #ffffff;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  /* text-align: center;
  line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
