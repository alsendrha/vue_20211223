<template>
    <div>
        <el-card shadow="always">
            <h2>게시판 글쓰기</h2>
            <el-tabs>
            <el-input v-model="board.title" placeholder="제목" />
            </el-tabs>
            <el-tabs>
            <el-input v-model="board.writer" placeholder="작성자" />
            </el-tabs>
            <el-tabs>
            <el-input v-model="board.content" :rows="15" type="textarea" />
            </el-tabs>
            <el-button type="success" @click="handleBoard1">등록</el-button>
            <el-button type="success" @click="handleBoard2">취소</el-button>
        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                board : {
                    title   : '',
                    writer   : '',
                    content : '',
                }
            }
        },
        methods:{
            async handleBoard1(){
                //유효성검사(해야됨) 통과
                const url = "/board/insert";
                const headers = {"Content-Type":"application/json"};
                const body = this.board;
                // const body = { 
                //     title :this.board.title,
                //     writer : this.board.writer,
                //     content : this.board.content
                // }
                const response = await this.axios.post(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('글쓰기 성공');
                    this.$router.push({name:"Board"});
                }
                 
            },
            handleBoard2(){
                this.$router.push({name:"Board"});
            }
        }
        
        
    }
</script>

<style scoped>

</style>