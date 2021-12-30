<template>
    <div>
        <h3>물품상세정보</h3>
        <el-descriptions direction="vertical" :column="4" border>
            <el-descriptions-item label="코드" :span="2">{{item._id}}</el-descriptions-item>
            <el-descriptions-item label="물품명" :span="2">{{item.name}}</el-descriptions-item>
            <el-descriptions-item label="가격" :span="2">{{item.price}}</el-descriptions-item>
            <el-descriptions-item label="수량" :span="2" >{{item.quantity}}</el-descriptions-item>
            <el-descriptions-item label="사진" :span="2"><el-image :src="item.image" style="width:50%"/>
            </el-descriptions-item>
        </el-descriptions>
        <el-button type="primary" @click="handleBoard1">수정</el-button>
        <el-button type="primary" @click="handleBoard2">돌아가기</el-button>
        

        
    </div>
</template>

<script>
    export default {
        created(){
            this.handleData();
   
        },

        data(){
            return{
                item : '',
                code : this.$route.query.code, //목록에서 전달되는 코드
                
            }
        },
        methods:{
            async handleData(){
                const url = `/item/selectone?code=${this.code}`;
                const headers = {"Content-Type":"application/json"};

                const response = await this.axios.get(url, {headers:headers});
                if(response.data.status===200){
                    this.item = response.data.result;
                    console.log(this.item);
                }
            }
        },
       
        
        handleBoard2(){
            this.$router.push({name:"Seller"});
        }
        
        
    }
</script>

<style scoped>

</style>