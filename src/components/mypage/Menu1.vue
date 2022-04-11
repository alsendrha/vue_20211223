<template>
    <div>
        
            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="나이" label-width="80px">
                    <el-input v-model="member.userage" size="mini" placeholder="나이" />
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="이메일" label-width="80px">
                    <el-input v-model="member.useremail1" size="mini" placeholder="이메일" @keyup.enter="handleInfo" />
                </el-form-item>

                <el-form-item>@</el-form-item>

                <el-form-item>
                    <el-select size="mini" v-model="member.useremail2" clearable placeholder="Select">
                        <el-option  v-for="tmp in emailoption" :key="tmp"
                            :label="tmp" :value="tmp">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                    <el-form-item label=" " label-width="80px">
                        <el-button type="primary" size="mini" @click="handleInfo">수정</el-button>
                    </el-form-item>
            </el-form>
    </div>
</template>

<script>
    export default {
        created(){
            this.handleData();
        },

        data(){
            return{
                //로그인시에 저장했던 TOKEN정보를 읽음
                token : sessionStorage.getItem("TOKEN"),
               emailoption : ['naver.com', 'gmail.com', 'daum.net'],
               member : '',
               
            }
            
        },

        methods:{
            async handleInfo(){
                const url = `/member/mypage?menu=1`
                const headers = {"Content-Type":"application/json", "token": this.token};
                const body = {
                    userage : this.member.userage,
                    useremail : this.member.useremail1 + "@" + this.member.useremail2
                };
                const response = await this.axios.put(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status===200){
                    alert('변경되었습니다.');
                    this.handleData();
                }

            },

            async handleData(){
                const url = `/member/selectone`;
                const headers = {
                    "Content-Type":"application/json",
                    "token": this.token
                };
                const response = await this.axios.get(url, {headers:headers});
                console.log(response.data);
                if(response.data.status===200){
                    this.member = response.data.result;
                    const tmp = this.member.useremail.split("@");
                    console.log(tmp);
                    this.member['useremail1'] = tmp[0],
                    this.member['useremail2'] = tmp[1]
                }   
            }


        
        }

        
        
    }
</script>

<style scoped>

</style>