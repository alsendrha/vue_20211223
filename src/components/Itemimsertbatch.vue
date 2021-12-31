<template>
    <div>
        <el-card shadow="always">
        <h4>물품일괄등록</h4>
        <hr />

        <el-button size="small" type="info" @click="handlePlus">항목추가</el-button>
        <el-button size="small" type="info" @click="handleMinus">항목삭제</el-button>
        <el-button size="small" type="primary" @click="handleInsertbatch">일괄추가</el-button>
        <el-button size="small" type="primary" @click="hanldeSeller">목록으로</el-button>

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
                    <img :src="items[scope.$index].imageurl" style="width:50px " />
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
        data(){
            return{
                items : [
                    {
                        name : 'a',
                        content : '1',
                        price : 100,
                        quantity : 111,
                        image : '',
                        imageurl : require('../assets/img/default.jpg')
                    },
                    {name : 'a', content : '1', price : 1, quantity : 1, image:'', imageurl : require('../assets/img/default.jpg')},
                    {name : 'b', content : '1', price : 1, quantity : 1, image:'', imageurl : require('../assets/img/default.jpg')},
                    {name : 'c', content : '1', price : 1, quantity : 1, image:'', imageurl : require('../assets/img/default.jpg')}
                    
                    ]
            }
        },

        methods:{
            handlePlus(){
                this.items.push( {name : 'd', content : '1', price : 1, quantity :  1});
            },
            handleMinus(){
                this.items.pop();
            },
            handleImage(e, idx){
                console.log("Itemimsertbatch.vue =>handleImage");
                console.log(e, idx);
                if(e.target.files.length>0){
                    this.items[idx].image = e.target.files[0];
                    this.items[idx].imageurl = URL.createObjectURL(e.target.files[0]);
                }
            },
            async handleInsertbatch(){
                console.log("Itemimsertbatch.vue =>handleInsertbatch");
                const url = `/item/insertbatch`;
                const headers = {"Content-Type":"multipart/form-data"};
                const body =new FormData();
                for(let i=0;i<this.items.length;i++){
                    body.append("name", this.items[i].name);
                    body.append("content", this.items[i].content);
                    body.append("price", this.items[i].price);
                    body.append("quantity", this.items[i].quantity);
                    body.append("file", this.items[i].image);
                }
                const response = await this.axios.post(url, body, {headers:headers});
                    if(response.data.status===200){
                    
                    alert('일괄추가 되었습니다');
                    this.$router.push({name:'Seller'});
                }
            },
            hanldeSeller(){
                this.$router.push({name:'Seller'});
            }
        }
        
    }
</script>

<style scoped>

</style>