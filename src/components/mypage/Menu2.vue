<template>
    <div>
            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="기존암호" label-width="80px">
                    <el-input v-model="member.userpw" ref="userpw" size="mini" 
                    type="password" placeholder="기존암호" />
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="새암호" label-width="80px">
                    <el-input v-model="member.usernpw" ref="usernpw" size="mini" 
                    type="password" placeholder="새암호" />
                </el-form-item>
            </el-form>
        
            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="암호확인" label-width="80px">
                    <el-input v-model="member.userpw1" ref="userpw1" size="mini" 
                    type="password" placeholder="암호확인" />
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-10px">
                    <el-form-item label=" " label-width="80px">
                        <el-button type="primary" size="mini"  @click="handlePass">수정</el-button>
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
                    usernpw : '',
                    userpw1 : '',
                }
            }
        },

        methods:{
            async handlePass(){
                if(this.member.userpw === ""){
                    alert('기존 암호를 입력하세요.');
                    this.$refs.userpw.focus();
                    return false
                }
                if(this.member.usernpw === ""){
                    alert('새암호를 입력하세요.');
                    this.$refs.usernpw.focus();
                    return false
                }
                if(this.member.userpw1 === ""){
                    alert('암호확인을 입력하세요.');
                    this.$refs.userpw1.focus();
                    return false
                }
                if(this.member.userpw1 !== this.member.usernpw){
                    alert('암호가 일치하지 않습니다!');
                    this.$refs.userpw1.focus();
                    return false
                }
                const url = '주소';
                const headers = {
                    "Content-Type":"application/json",
                    "TOKEN": this.token
                };
                const body = {
                    userpw : this.member.userpw,
                    usernpw : this.member.usernpw,
                    userpw1 : this.member.userpw1,
                };
                const response = await this.axios.put(url, body, {headers:headers});
                console.log(response);

                alert('수정 되었습니다.');
            },
        }


          
    }
</script>

<style scoped>

</style>