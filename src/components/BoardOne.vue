<template>
    <div>
        <h3>BoardOne</h3>
        {{bno}}, {{no}}
        <el-row :gutter="20">
            <el-col :span="12">
                <img :src="item.img" style="width:500px;"/>
            </el-col>
            <el-col :span="12">
                <el-collapse>{{item.title}}</el-collapse> 
                <el-collapse>{{item.writer}}</el-collapse> 
                <el-collapse>{{item.hit}}</el-collapse> 
                <el-collapse>{{item.regdate}}</el-collapse> 
                <el-collapse>{{item.content}}</el-collapse> 
            </el-col>
        </el-row>
        
            
    </div>
</template>

<script>
    export default {
        created(){
            this.handleData();
        },

        data(){
            return{
                bno : Number(this.$route.query.bno),
                no : Number(this.$route.query.no),
                item : '', 
            }
        },
        methods:{
            async handleData(){
                const url = `http://ihongss.com/json/boardone.json?$bno=${this.bno}&no=${this.no}`;
                const headers = {"Content-Type":"application/json"};
                const response = await this.axios.get(url, {headers:headers});
                console.log(response);
                if(response.data.ret === 'y');
                this.item = response.data.data;
                

        }
        }
        
    }
</script>

<style scoped>

</style>