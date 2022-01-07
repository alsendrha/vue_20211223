<template>
    <div>
        <el-card shadow="always">
            <h3>관리자3</h3>
            <el-tabs tab-position="left">
                <el-tab-pane label="회원관리">
                    <menu-1></menu-1>
                </el-tab-pane>
                <el-tab-pane label="게시물관리">
                    <menu-2></menu-2>
                </el-tab-pane>
            </el-tabs>
        </el-card>

    </div>
</template>

<script>
import Menu1 from './admin1/Menu1.vue'
import Menu2 from './admin1/Menu2.vue'
    export default {
        components:{
        Menu1, Menu2
        }
    }

</script>

<style scoped>

</style>