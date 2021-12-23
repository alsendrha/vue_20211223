<template>
  <div>
    
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo"
          mode="horizontal" @select="handleSelect" router="true">
          <el-menu-item index="home">홈</el-menu-item>

          <el-menu-item index="login" v-if="!logged">로그인</el-menu-item>
          <el-menu-item index="logout" v-if="logged">로그아웃</el-menu-item>
          <el-menu-item index="mypage" v-if="logged">마이페이지</el-menu-item>
          <el-menu-item index="join">회원가입</el-menu-item>
          
        </el-menu>
      </el-header>

      <el-main>
        <router-view @changeLogged="changeLogged"></router-view>
      </el-main>

      <el-footer>Footer</el-footer>
    </el-container>
    
  </div>
</template>

<script>
  export default {
    created(){
      console.log('created');
      const tmp = sessionStorage.getItem("activeIndex");
      console.log(tmp);
      if(tmp === null){
        this.activeIndex ='home';
        this.$router.push({path:'/home'});
      }
      else{
        this.activeIndex = tmp;
      }

      this.changeLogged();
    },
    mounted(){
      console.log('mounted');
    },

    updated(){
      console.log('updated');
    },
    data(){
      return{
        activeIndex : '',
        logged      : false,
      }
    },

    methods:{
      handleSelect(idx){
        console.log('App.vue => handleSelect', idx);
        this.$router.push({path:idx});
        // 세션저장소에 현재의 메뉴의 index를 저장

        if(idx === 'home') {
          this.$router.push({name:'Home'});
        }
        if(idx === 'login') {
          this.$router.push({name:'Login'});
        }
        if(idx === 'logout') {
          this.$router.push({name:'Logout'});
        }
        if(idx === 'join') {
          this.$router.push({name:'Join'});
        }
        if(idx === 'mypage') {
          this.$router.push({name:'Mypage'});
        }
        // 세션저장소에 현재의 메뉴의 index를 저장
        sessionStorage.setItem('activeIndex', idx);
      },

      changeLogged(){
        const token = sessionStorage.getItem("TOKEN");
        if(token === null){
          this.logged = false;
        }
        else{
          this.logged = true;
        }
        this.activeIndex ='home';

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
