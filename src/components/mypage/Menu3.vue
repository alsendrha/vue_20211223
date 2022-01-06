<template>
    <div>
                <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                    <el-form-item label="암호입력" label-width="80px">
                        <el-input v-model="member.usertpw" ref="usertpw" size="mini" 
                        type="password" placeholder="암호입력" />
                    </el-form-item>
                    <el-form-item label="" label-width="80px">
                        <el-button type="primary" size="mini" @click="handleBy">회원탈퇴</el-button>
                    </el-form-item>
                </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                member : {
                    usertpw : '',
                }
            }
        },

        methods:{
            async handleBy(){
                if(this.member.usertpw === ""){
                    alert('암호를 입력하세요.');
                    this.$refs.usertpw.focus();
                    return false
                }
                const url = '주소';
                const headers = {
                    "Content-Type":"application/json",
                    "TOKEN": this.token
                };
                const body = {
                    usertpw : this.member.usertpw,
                };
                const response = await this.axios.put(url, body, {headers:headers});
                console.log(response);

                alert('탈퇴완료.');  
                sessionStorage.removeItem("TOKEN");
                this.$emit('changeLogged','home');

            },
        }
        
    }
</script>

<style scoped>

</style>