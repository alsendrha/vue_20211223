<template>
    <div>
        <h3>마이페이지</h3>
        <hr />
        <el-card shadow="always">
            <el-tabs :tab-position="tabPosition" style="height: 350px">
                <el-tab-pane label="정보수정"><h4>정보수정</h4> 
                    <menu-1></menu-1>
                </el-tab-pane>

                <el-tab-pane label="비밀번호변경"><h4>비밀번호변경</h4>
                    <menu-2></menu-2>
                </el-tab-pane>
         
                <el-tab-pane label="회원탈퇴"><h4>회원탈퇴</h4>
                   <menu-3></menu-3>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
import Menu1 from './mypage/Menu1.vue';
import Menu2 from './mypage/Menu2.vue';
import Menu3 from './mypage/Menu3.vue';
    export default {
  components: { Menu1, Menu2, Menu3
  
    },
       
       
    }
</script>

<style scoped>

</style>