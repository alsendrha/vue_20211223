<template>
    <div>
        <el-button type="primary" @click="handleWrite">글쓰기</el-button>
        <el-table :data="items" style="width: 100%; cursor:pointer;" @row-click="rowclick">
            <el-table-column prop="_id" label="글번호" width="120" />
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
    import {useStore} from 'vuex';
    export default {
        //state 변수(현재 컴포넌트에서 필요한 변수)
        data(){
            return{
                items : [],
                store : useStore(),
                page : 1,
                total : 0,
            }
        },
        created(){
            this.handleData();
        },

        mounted(){
            // 모든컴포넌트에서 값을 변경한 것을 통보 받기
            // this.store.subscribe((mutation, state) => {
            //     console.log(mutation, state);
            //     // items의 변수에 값을 넣어야 됨.
            //     if(mutation.type === 'setItems'){
            //         this.items = mutation.payload;
            //     }
            // });
        },
        methods:{
            handleWrite(){
                this.$router.push({ name : 'BoardWrite' })
            },
            //벡엔드에서 필요한 데이터를 받아서 items에 넣음
            async handleData(){
                const url ="/board/select"
                const header ={"Content-Type":"application/json"};

                const response = await this.axios.get(
                    url,
                    {params :{page:this.page}},
                    {header:header}
                );
                console.log(response.data);
                if(response.data.status===200);
                    this.items = response.data.result;
                    this.total = response.data.total;

            //     // action에 정의되어 있는 handleData호출
            //     await this.store.dispatch('handleData', {page:this.page});

                // store mutation 호출(공통의 값 변경하는 역할-동기방식)
                // this.store.commit('setCounter', 30);

                // store의 getters 호출
                // const count = this.store.getters.getCounter;
                // this.items = this.store.getters.getItems;

            },
            // 페이지네이션 컴포넌트에서 페이지를 클릭할떄마다
            currentchange(page){
                console.log('board => currentchange', page);
                this.page = page;
                this.handleData();
            },
            async rowclick(row){
                console.log('board => rowclick',row);
                //조회수를 1증가 시킴
                const url =`/board/updatehit?no=${row._id}`
                const header ={"Content-Type":"application/json"};
                const response = await this.axios.put(
                    url,
                    {},
                    {header:header}
                );

                console.log(response.data);
                if(response.data.status===200){
                    this.$router.push({
                        name : 'BoardOne',
                        query : {bno : 1, no : row._id}
                    })
                }
            }
        }
      
        
    }
</script>

<style scoped>

</style>