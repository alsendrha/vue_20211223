<template>
    <div>
        <el-card shadow="always">
            <h3>물품일괄수정</h3>
            <hr />
            <el-button type="danger"  size="mini" style="margin-left:5px" @click="handleUpdate">일괄수정</el-button>
            <el-table :data="items" style="width: 100%" size="mini" >
                <el-table-column label="번호" width="80" >  
                    <template #default="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>       

                <el-table-column label="물품명" width="120">  
                        <template #default="scope">
                            {{scope.$index}}
                            <el-input size="mini" v-model="items[scope.$index].name"></el-input>
                        </template>
                </el-table-column>

                <el-table-column label="물품내용">  
                    <template #default="scope">
                        {{scope.$index}}
                        <el-input size="mini" v-model="items[scope.$index].content"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="가격" width="120">  
                    <template #default="scope">
                        {{scope.$index}}
                        <el-input size="mini" v-model="items[scope.$index].price"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="수량"  width="80">  
                    <template #default="scope">
                        {{scope.$index}}
                        <el-input size="mini" v-model="items[scope.$index].quantity"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="이미지"  width="340">  
                    <template #default="scope">
                        <img :src="items[scope.$index].image" style="width:50px " />
                        {{scope.$index}}
                        <input type="file" @change="handleImage($event, scope.$index)" />
                    </template>
                </el-table-column>

                
            </el-table>

        </el-card>
    </div>
</template>

<script>
    export default {
        mounted(){ //f5 새로고침 처리
            console.log(this.code);
            if(typeof this.code ==='undefined'){
                this.$router.back();
            }
            else{ // 최초1회만 수행
            this.handleData();
            }
        },

        data(){
            return{
                items : [],
                code : this.$route.params.code, //JSON.parse()
            }
        },

        methods:{
            async handleData(){
                console.log("ItemUpdateBatch =>handleData");

                this.code=JSON.parse(this.code);
                
                //[{code:1}, {code:2}, {code:3}] => [1,2,3]

                let arr = []; //[{code:1}, {code:2}, {code:3}] => [1,2,3]
                for(let tmp of this.code){
                    arr.push(tmp.code);
                }
                const url = `/item/selectcheck`;
                const headers = {"Content-Type":"application/json"};
                const body = {chks : arr};
                const response = await this.axios.post(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status===200){
                    this.items = response.data.result;
                }
          

                
            },
            async handleUpdate(){
                const url = `/item/updatebatch`;
                const headers = {"Content-Type":"mutipart/form-data"};
                const body =  {};
                const response = await this.axios.put(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status===200){
                    this.items = response.data.result;
                   this.handleData();
                }
            }
        }
        
    }
</script>

<style scoped>

</style>