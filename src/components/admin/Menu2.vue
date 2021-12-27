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
    import {useStore} from 'vuex';
    export default {
        data(){
            return{
                items : [],
                store : useStore(),
            }
        },
        created(){
            this.handleData();
        },

        mounted(){
            this.store.subscribe((mutation, state) => {
                console.log(mutation, state);
                if(mutation.type === 'setItems'){
                    this.items = mutation.payload;
                }
            });
        },
        methods:{
            async handleData(){
                await this.store.dispatch('handleData', {page:1});

                this.items = this.store.getters.getItems;

            }
        }
       
        
    }
</script>

<style scoped>

</style>