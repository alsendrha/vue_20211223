<template>
    <div>
        <h3>마이페이지</h3>
        <hr />
        <el-card shadow="always">
            <el-tabs :tab-position="tabPosition" style="height: 250px">
                <el-tab-pane label="정보수정"><h4>정보수정</h4> 
                    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                        <el-form-item label="이름" label-width="80px">
                            <el-input v-model="member.username" size="mini" placeholder="이름" />
                        </el-form-item>
                    </el-form>

                    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                        <el-form-item label="이메일" label-width="80px">
                            <el-input v-model="member.email" size="mini" placeholder="이메일" />
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
                            <el-input v-model="member.userpw" size="mini" 
                            type="password" placeholder="기존암호" />
                        </el-form-item>
                    </el-form>

                    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                        <el-form-item label="새암호" label-width="80px">
                            <el-input v-model="member.usernpw" size="mini" 
                            type="password" placeholder="새암호" />
                        </el-form-item>
                    </el-form>
                
                    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                        <el-form-item label="암호확인" label-width="80px">
                            <el-input v-model="member.userpw1" size="mini" 
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
                            <el-input v-model="member.usertpw" size="mini" 
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
            handleInfo(){
                alert('수정 되었습니다.');
            },

            handlePass(){
                alert('수정 되었습니다.');
            },

            handleBy(){
                alert('탈퇴완료.');  
                sessionStorage.removeItem("TOKEN");
                this.$emit('changeLogged');
                this.$router.push({name:"Home"});
            }
        },

        data() {
            return {
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