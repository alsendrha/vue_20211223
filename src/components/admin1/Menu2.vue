<template>
    <div>
        <input type="text" v-model="text" placeholder="검색어 입력" @keyup.enter="handleData" />
        <el-button type="primary" size="mini" style="margin-left:5px" @click="handleData" >검색</el-button>
        <el-table :data="items" style="width: 100%; cursor:pointer;" size="mini">
            <el-table-column prop="_id" label="번호" width="120" />
            <el-table-column prop="title" label="제목" width="300" />
            <el-table-column prop="writer" label="작성자" width="250" />
            <el-table-column prop="hit" label="조회수" width="200" />
            <el-table-column prop="regdata" label="날짜" width="250" />
        </el-table>

        <el-pagination layout="prev, pager, next" :total="total" @current-change="currentchange">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        created(){
            this.handleData();
        },

        data(){
            return{
                items : [], //게시물 내용
                page : 1, // 현재페이지번호
                total : 0, // 페이지네이션에서 전체 게시물수
                text : '', // 입력한 검색어
            }
        },

        methods:{
            async handleData(){
            const url ="/board/select"
                const header ={"Content-Type":"application/json"};

                //board/select?page=1&text=aaa
                const response = await this.axios.get(
                    url,
                    {params :{page:this.page, text : this.text}},
                    {header:header}
                );
                console.log(response.data);
                if(response.data.status===200);
                    this.items = response.data.result;
                    this.total = response.data.total;
            },
            currentchange(page){
                console.log('board => currentchange', page);
                this.page = page;
                this.handleData();
            },
        },

        
    }
</script>

<style scoped>

</style>