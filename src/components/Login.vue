<template>
    <div>
        <h3>로그인</h3>
        <hr />
        <el-card shadow="always">
            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="아이디" label-width="80px">
                    <el-input v-model="member.uid" ref="uid" size="mini" placeholder="아이디" />
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="암호" label-width="80px">
                    <el-input v-model="member.upw" ref="upw" size="mini" type="password" placeholder="암호" @keyup.enter="handleLogin" ></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label=" " label-width="80px">
                    <el-button type="primary" size="mini" @click="handleLogin">로그인</el-button>
                    <el-button type="info" size="mini" @click="handleJoin">회원가입</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        
    </div>
</template>

<script>
    import {useStore} from 'vuex';
    export default {
        methods:{
            async handleLogin(){
                if(this.member.uid === ""){
                    alert('아이디를 입력하세요.');
                    this.$refs.uid.focus();
                    return false
                }
                 if(this.member.upw === ""){
                    alert('암호를 입력하세요.');
                    this.$refs.upw.focus();
                    return false
                }

                const url =`/member/select`;
                const headers = {"Content-Type":"application/json"};
                const body = this.member;
                const response = await this.axios.post(url, body, {headers:headers}) 
                console.log(response.data);
                if(response.data.status===200){
                    this.$router.push({name:'Join'});
                    //1. 토큰을 저장소에 보관
                    sessionStorage.setItem("TOKEN", response.data.result.token);
                    alert('로그인 되었습니다.');
                    //2. 홈으로 이동한다
                    this.$router.push({name:'Home'});

                    //3. App.vue에 메뉴의 상태를 통지함.
                    this.store.commit('setMenu', 'home');
                }
                else{
                    alert('아이디 또는 암호가 틀렸습니다.');
                }

                
                // 부모컴포넌트로 이벤트를 발생시킴
                // (이벤트명은 changeLogged)
                //this.$emit('changeLogged', 'home');
            },
            handleJoin(){
                // App.vue로 메뉴가 변경된것을 통보해야됨.
                // App.vue가 강단메뉴를 바꾸게 됨.
                this.$router.push({name:'Join'});
                this.store.commit('setMenu', 'join');
            }
        },
        data(){
            return{
  
                member:{
                    uid :'',
                    upw :'',
                    token : '',
                },
                store : useStore()
            }
        },
    }
</script>

<style scoped>

</style>