<template>
    <div>
        <h3>회원가입</h3>
        <hr />
        <el-card shadow="always">
            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="아이디" label-width="80px">
                    <el-input v-model="member.uid" ref="uid" size="mini" placeholder="아이디" />
                </el-form-item>
                <el-form-item>
                <el-button type="primary" size="mini" @click="handleIdcheck">중복확인</el-button>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="암호" label-width="80px">
                    <el-input v-model="member.upw" ref="upw" size="mini" type="password" placeholder="암호"></el-input>
                </el-form-item>
            </el-form>
            
            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="암호확인" label-width="80px">
                    <el-input v-model="member.userpw1" ref="userpw1" size="mini" type="password" placeholder="암호확인"></el-input>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="나이" label-width="80px">
                    <el-input v-model="member.uage" ref="uage" size="mini" placeholder="나이" />
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="생년월일" label-width="80px">
                    <div class="demo-date-picker">
                        <div class="block">
                            <el-date-picker v-model="member.ubirth" ref="ubirth" size="mini" type="date" placeholder="생년월일">
                            </el-date-picker>
                        </div>
                    </div>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="이메일" label-width="80px">
                    <el-input v-model="member.email" size="mini" ref="email" placeholder="이메일" />
                </el-form-item>
                <el-form-item>@</el-form-item>
                <el-form-item>
                        <el-select v-model="member.email1" ref="email1" size="mini" clearable placeholder="Select">
                            <el-option  v-for="tmp in emailoption" :key="tmp" :label="tmp" :value="tmp">
                            </el-option>
                        </el-select>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="관심분야" label-width="80px">
                    <el-radio-group v-model="member.ucheck" >
                        <el-radio v-for="tmp in radiooption" :key="tmp" :label="tmp"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="성별" label-width="80px">
                    <el-radio-group v-model="member.ugender">
                        <el-radio label="1">남자</el-radio>
                        <el-radio label="2">여자</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>  

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="약관내용"   label-width="80px">
                    <el-input type="textarea" v-model="member.text"></el-input>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="약관동의"  label-width="80px">
                    <div>
                    <el-checkbox v-model="member.chk" label=""></el-checkbox>
                    </div>
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label=" " label-width="80px">
                    <el-button type="primary" @click="handleJoin">회원가입</el-button>
                    <el-button type="info" @click="handleHome">홈으로</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                member: {
                    uid : '',  //전송
                    upw : '',  //전송
                    userpw1 : '',  //임시용
                    uage : 1,    //전송
                    email : '',   //임시용
                    email1 : '',    //임시용
                    uemail : '',    //전송
                    ubirth : '',    //전송
                    ugender : '',
                    text : "약관동의",    
                    ucheck : '',     //전송
                   chk : false,
                   idcheck : false,
                },
                emailoption : ['naver.com','gmail.com','daum.net'],
                radiooption : ['관심분야1', '관심분야2','관심분야3','관심분야4',]
            }
        },
        methods:{
            async handleJoin(){
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
                if(this.member.userpw1 === ""){
                    alert('암호를 입력하세요.');
                    this.$refs.userpw1.focus();
                    return false
                }
                if(this.member.userpw1 !== this.member.upw){
                    alert('암호가 일치하지 않습니다.');
                    this.$refs.userpw1.focus();
                    return false
                }
                if(this.member.uage === ""){
                    alert('나이를 입력하세요.');
                    this.$refs.uage.focus();
                    return false
                }
                if(this.member.ubirth === ""){
                    alert('생년월일을 입력하세요.');
                    this.$refs.ubirth.focus();
                    return false
                }
                if(this.member.email === ""){
                    alert('이메일을 입력하세요.');
                    this.$refs.email.focus();
                    return false
                }
                if(this.member.email1 === ""){
                    alert('이메일을 입력하세요.');
                    this.$refs.email1.focus();
                    return false
                }
                if(this.member.ucheck === ""){
                    alert('관심분야를 선택하세요.');
                    return false
                }
                if(this.member.ugender === ""){
                    alert('성별을 선택하세요.');
                    return false
                }
                if(this.member.chk === false){
                    alert('약관동의를 눌러주세요.');
                    return false
                }

                if(this.member.idcheck === false){
                    alert('아이디 중복확인을 해주세요.');
                    return false
                }

                this.member.uemail = this.member.email + "@" + this.member.email1;

                //유효성 통과 후
                const url = '/member/insert';
                const headers = {"Content-type":"application/json"};
                const body = this.member;
                const response = await this.axios.post(url, body, {headers:headers});
                console.log(response.data);

                if(response.data.status ===200){
                    alert('회원가입이 되었습니다');
                    this.$router.push({name:'Home'});
                }

            },
            handleHome(){
                this.$router.push({name:'Home'});
                this.$emit('changeLogged', 'home');
            },

            async handleIdcheck(){
                //유효성검사
                // if(this.member.uid === '' ){
                    
                // }

                if(this.member.uid.length <= 0){
                    alert('아이디를 입력하세요.');
                    return false;
                }

                const url = `/member/idcheck?uid=${this.member.uid}`;
                const headers = {"Content-Type":"application/json"};
                const response = await this.axios.get(url, {headers:headers});
                console.log(response.data);
                if(response.data.result===1){
                    this.member.idcheck=false;
                    alert('사용할 수 없는 아이디 입니다.');

                }
                else if(response.data.result===0){
                    this.member.idcheck=true;
                    alert('사용할 수 있는 아이디 입니다.');
                }
            }

        }  
      
    };
    
</script>

<style scoped>

</style>