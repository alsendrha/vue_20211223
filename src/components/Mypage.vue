<template>
    <div>
        <h3>마이페이지</h3>
        <hr />
        <el-card shadow="always">
            <el-tabs :tab-position="tabPosition" style="height: 250px">
                <el-tab-pane label="정보수정"><h4>정보수정</h4> 
                    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                        <el-form-item label="이름" label-width="80px">
                            <el-input v-model="member.username" ref="username" size="mini" placeholder="이름" />
                        </el-form-item>
                    </el-form>

                    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                        <el-form-item label="이메일" label-width="80px">
                            <el-input v-model="member.email" ref="email" size="mini" placeholder="이메일" />
                        </el-form-item>

                        <el-form-item>@</el-form-item>

                        <el-form-item>
                            <el-select size="mini" v-model="member.email1" clearable placeholder="Select">
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
                </el-tab-pane>

                <el-tab-pane label="비밀번호변경"><h4>비밀번호변경</h4>
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

                </el-tab-pane>
                <el-tab-pane label="회원탈퇴"><h4>회원탈퇴</h4>
                    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                        <el-form-item label="암호입력" label-width="80px">
                            <el-input v-model="member.usertpw" ref="usertpw" size="mini" 
                            type="password" placeholder="암호입력" />
                        </el-form-item>
                        <el-form-item label="" label-width="80px">
                            <el-button type="primary" size="mini" @click="handleBy">회원탈퇴</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
    export default {
       
        methods:{
            async handleInfo(){
                if(this.member.username === ""){
                    alert('아이디를 입력하세요.');
                    this.$refs.username.focus();
                    return false
                }
                if(this.member.email === ""){
                    alert('이메일을 입력하세요,');
                    this.$refs.email.focus();
                    return false
                }
                if(this.member.email1 === ""){
                    alert('이메일을 입력하세요,');
                    this.$refs.email.focus();
                    return false
                }
                //벡엔드

                //유효성검사

                //유효성검사가 완료 시점에
                //restful이해도가 높은
                const url = '주소';

                //벡엔드에서 token 검증
                const headers = {
                    "Content-Type":"application/json",
                    "TOKEN": this.token
                };
                const body = {
                    username : this.member.username,
                    email : this.member.email+"@"+this.member.email1,
                };
                //get(조회), post(추가), put(수정), delete(삭제)
                //조회 : await this.axios.get(url, {headers:headers});
                //추가 : await this.axios.post(url, body, {headers:headers});
                //수정 : await this.axios.put(url, body, {headers:headers});
                //삭제 : await this.axios.delete(url, {headers:{ }, data:{ }});

                const response = await this.axios.put(url, body, {headers:headers});
                console.log(response);
                
                alert('수정 되었습니다.');
            },

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
        },

        data() {
            return {
                token : sessionStorage.getItem("TOKEN", this.token),
                tabPosition: 'left',
                member:{
                    email :'',
                    email1 : '',
                    username : '',
                    userpw : '',
                    userpw1 : '',
                    usernpw : '',
                    usertpw : '',
            },
            emailoption : ['naver.com','gmail.com','daum.net'],
            } 
        }
    }
</script>

<style scoped>

</style>