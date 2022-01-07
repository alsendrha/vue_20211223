<template>
    <div>
                <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                    <el-form-item label="암호입력" label-width="80px">
                        <el-input v-model="member.userpw" ref="userpw" size="mini" 
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
                    userpw : '',
                },
                token : sessionStorage.getItem("TOKEN"),
            }
        },

        methods:{
            async handleBy(){
                if(this.member.userpw === ""){
                    alert('암호를 입력하세요.');
                    this.$refs.userpw.focus();
                    return false
                }
                const ret = confirm('정말 탈퇴하시겠습니까');
                if(ret){
                    const url = '/member/mypage?menu=3';
                    const headers = {
                        "Content-Type":"application/json",
                        "token": this.token
                    };
                    const body = this.member
                    const response = await this.axios.put(url, body, {headers:headers});
                    console.log(response.data);
                    if(response.data.status===200){
                        alert('탈퇴완료.');  
                        //1.토큰삭제,
                        //2.페이지이동
                        //3.App.vue의 메뉴 활성화
                        this.$router.push({name:'Logout'});
                    }
                    else{
                    alert('암호가 틀렸습니다.');
                }
                   
                }
            },
        }
        
    }
</script>

<style scoped>

</style>