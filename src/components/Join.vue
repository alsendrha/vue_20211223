<template>
    <div>
        <h3>회원가입</h3>
        <hr />
        <el-card shadow="always">
            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="아이디" label-width="80px">
                    <el-input v-model="member.userid" size="mini" placeholder="아이디" />
                </el-form-item>
                <el-form-item>
                <el-button type="primary" size="mini">중복확인</el-button>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="암호" label-width="80px">
                    <el-input v-model="member.userpw" size="mini" type="password" placeholder="암호"></el-input>
                </el-form-item>
            </el-form>
            
            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="암호확인" label-width="80px">
                    <el-input v-model="member.userpw1" size="mini" type="password" placeholder="암호확인"></el-input>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="나이" label-width="80px">
                    <el-input v-model="member.userage" size="mini" placeholder="나이" />
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="생년월일" label-width="80px">
                    <div class="demo-date-picker">
                        <div class="block">
                            <el-date-picker v-model="member.userdate" size="mini" type="date" placeholder="생년월일">
                            </el-date-picker>
                        </div>
                    </div>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="이메일" label-width="80px">
                    <el-input v-model="member.email" size="mini" placeholder="이메일" />
                </el-form-item>
                <el-form-item>@</el-form-item>
                <el-form-item>
                        <el-select v-model="member.email1" size="mini" clearable placeholder="Select">
                            <el-option  v-for="tmp in emailoption" :key="tmp"
                                :label="tmp" :value="tmp">
                            </el-option>
                        </el-select>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="관심분야" label-width="80px">
                    <el-radio-group v-model="member.radio" >
                        <el-radio :label="1">관심분야1</el-radio>
                        <el-radio :label="2">관심분야2</el-radio>
                        <el-radio :label="3">관심분야3</el-radio>
                        <el-radio :label="4">관심분야4</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="성별" label-width="80px">
                    <el-radio-group v-model="member.radio1" >
                        <el-radio :label="1">남자</el-radio>
                        <el-radio :label="2">여자</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>  

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="약관내용" label-width="80px">
                    <el-input v-model="member.form" type="textarea"></el-input>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="약관동의" label-width="80px">
                    <div>
                    <el-checkbox v-model="member.chk" label=""></el-checkbox>
                    </div>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label=" " label-width="80px">
                    <el-button type="primary" @click="handleJoin">회원가입</el-button>
                    <el-button type="info">홈으로</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import { ref, } from 'vue'
    export default{
        data(){
            return{
                member: {
                    userid : '',
                    userpw : '',
                    userpw1 : '',
                    userage : '',
                    email : '',
                    email1 : '',
                    userdate : '',
                    form : '',
                    radio: ref(),
                    radio1: ref(),
                    chk : false,
                },
                emailoption : ['naver.com','gmail.com','daum.net'],
                type : [],
                value: ref(''),
            }
        },
        methods:{
            handleJoin(){
                const url = '/api/join';
                const headers = {"Content-type":"application/json"};
                const body ={
                    userid : this.userid,
                    userpw : this.userpw,
                    email : this.email + "@" + this.email,
                }
                const response = this.axios.post(url, body, {headers:headers});
                console.log(response);

                if(response.data.ret ==='y'){
                    alert('회원가입이 되었습니다');
                    this.$router.push({name:'Home'});
                }
            }

        }  
      
    };
    
</script>

<style scoped>

</style>