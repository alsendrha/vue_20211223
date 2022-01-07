<template>
    <div>
        <input type="text" v-model="text" placeholder="검색어 입력" @keyup.enter="handleData" />
        <el-button type="primary" size="mini" style="margin-left:5px" @click="handleData" >검색</el-button>
        <el-table :data="items" style="width: 100%; cursor:pointer;" size="mini">
            <el-table-column v-model="member._id" label="아이디" width="300" />
            <el-table-column v-model="member.age" label="나이" width="250" />
            <el-table-column v-model="member.useremail" label="이메일" width="200" />
            <el-table-column v-model="member.userbirth" label="생일" width="250" />
        </el-table>

        <el-pagination layout="prev, pager, next" :total="total" @current-change="currentchange">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                member : {
                    _id : '',
                    age : '',
                    useremail : '',
                    userbirth : '',
                }

            }
        },
        methods:{
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