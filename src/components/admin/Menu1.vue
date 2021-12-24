<template>
    <div>
        <el-table :data="items" style="width: 100%; cursor:pointer;">
            <el-table-column prop="no" label="글번호" width="120" />
            <el-table-column prop="title" label="제목" width="300" />
            <el-table-column prop="writer" label="작성자" width="250" />
            <el-table-column prop="hit" label="조회수" width="200" />
            <el-table-column prop="regdate" label="날짜" width="250" />
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        created(){
            this.handleData();
        },
        data(){
            return{
                items : [],
                page : 1,
            }
        },
        methods: {
            async handleData(){
                const url = `http://ihongss.com/json/board.json?page=${this.page}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers:headers});
                console.log(response);
                if(response.data.ret === 'y'){
                    this.items = response.data.data;
                }
                console.log(url);
            }
            
        }
        
    }
</script>

<style scoped>

</style>