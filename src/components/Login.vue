<template>
    <div>
        <h3>로그인</h3>
        <hr />
        <el-card shadow="always">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="아이디" label-width="80px">
                    <el-input v-model="member.userid" size="mini" placeholder="아이디" />
                </el-form-item>
            </el-form>

            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="암호" label-width="80px">
                    <el-input v-model="member.userpw" size="mini" type="password" placeholder="암호"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label=" " label-width="80px">
                    <el-button type="primary" size="mini" @click="handleLogin()">로그인</el-button>
                    <el-button type="info" size="mini">회원가입</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        
    </div>
</template>

<script>
    export default {
        methods:{
            handleLogin(){
                this.token = '34534543543534543543543534';
                sessionStorage.setItem("TOKEN", this.token);

                alert('로그인 되었습니다.');

                // 부모컴포넌트로 이벤트를 발생시킴
                // (이벤트명은 changeLogged)
                this.$emit('changeLogged');
                this.$router.push({name:'Home'});
            }
        },
        data(){
            return{
                member:{
                    userid :'',
                    userpw :'',
                }
            }
        }
        
    }
</script>

<style scoped>

</style>