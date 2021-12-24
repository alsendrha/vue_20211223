<template>
    <div>
        <h3>게시판</h3>
         <hr />
        <el-card shadow="always">
            <el-tabs :tab-position="tabPosition" style="height: 650px">
                <el-tab-pane label="자유게시판">
                    <menu-1></menu-1>
                </el-tab-pane>
                <el-tab-pane label="질문및답변">
                   <menu-2></menu-2>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
    import Menu1 from './admin/Menu1.vue';
    import Menu2 from './admin/Menu2.vue';
    export default {
        components: { 
            Menu1,
            Menu2, 
        },
                
    }
</script>

<style scoped>

</style>