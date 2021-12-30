<template>
    <div>
        <h3>물품등록</h3>
        <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
            <el-form-item label="물품명" label-width="80px">
                <el-input v-model="userid" ref="userid" size="mini" placeholder="물품명" />
            </el-form-item>
        </el-form>
        <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
            <el-form-item label="가격" label-width="80px">
                <el-input v-model="userid" ref="userid" size="mini" placeholder="가격" />
            </el-form-item>
        </el-form>
        <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
            <el-form-item label="재고수량" label-width="80px">
                <el-input v-model="userid" ref="userid" size="mini" placeholder="재고수량" />
            </el-form-item>
        </el-form>
        <el-upload action="#"
                    list-type="picture-card"
                    :on-preview="handlePreview" 
                    :on-remove="handleRemove"
                    :on-change="handleChange"
                    :auto-upload="false">
                <el-icon><plus /></el-icon>
        </el-upload>
                <el-dialog v-model="dialogVisible">
                <img style="width:100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
       
    </div>
</template>

<script>
    export default {
        data(){
            return{
                userid : '',
            }
        }
        
    }
</script>

<style scoped>

</style>