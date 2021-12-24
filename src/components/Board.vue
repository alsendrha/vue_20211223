<template>
    <div>
        <h3>게시판</h3>
         <hr />
        <el-card shadow="always">
            <el-tabs :tab-position="tabPosition" style="height: 630px">
                <el-tab-pane label="자유게시판">
                    <el-table :data="items" style="width: 100%; cursor:pointer;">
                        <el-table-column prop="no" label="글번호" width="120" />
                        <el-table-column prop="title" label="제목" width="350" />
                        <el-table-column prop="writer" label="작성자" width="200" />
                        <el-table-column prop="hit" label="조회수" width="200" />
                        <el-table-column prop="regdate" label="날짜" width="200" />
                    </el-table>
                    <el-pagination layout="prev, pager, next" :total="1000" @current-change="currentchange">
                    </el-pagination>
                </el-tab-pane>

                <el-tab-pane label="질문및답변">
                    
                </el-tab-pane>
            </el-tabs>
        </el-card>

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
            currentchange(page){
                console.log('board => currentchange', page);
                this.page = page;
                this.handleData();
            },

            async handleData(){
                const url = `http://ihongss.com/json/board.json?page=${this.page}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers:headers});
                console.log(response);
                if(response.data.ret === 'y');
                this.items = response.data.data;
                console.log(url);
            }
            
        }
    }
</script>

<style scoped>

</style>