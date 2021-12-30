<template>
    <div>
        <el-card shadow="always">
            <h4>판매자</h4>
            <hr />

            <p>물품목록</p>
            <el-button type="text" @click="dialog1 = true">
                <el-button type="primary"  size="mini" @click="insertaa">물품등록</el-button>
            </el-button>
             
            
            <el-dialog v-model="dialog1" title="Tips" width="30%" :before-close="hanldeClose">
                <span>목록작성</span>
                <el-input v-model="item.name" placeholder="물품명" />
                <el-input v-model="item.content" placeholder="내용" />
                <el-input v-model="item.price" placeholder="가격" />
                <el-input v-model="item.quantity" placeholder="재고수량" />
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
                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="handleInsertup">등록</el-button>
                        <el-button @click="dialog1 = false">취소</el-button>
                    </span>
                </template>
            </el-dialog>
            
            
            <el-table :data="items" style="width: 100%; cursor:pointer;" @row-click="rowclick" >
                <el-table-column prop="_id" label="코드" width="180" />
                <el-table-column prop="name" label="물품명" width="180" />
                <el-table-column prop="price" label="가격" />
                <el-table-column prop="quantity" label="재고수량" />
                <el-table-column prop="regdate" label="등록일" />
                <el-table-column fixed="right" label="Operations" width="120">
                    <template #default="scope">
                        <el-button type="danger" size="small" @click.prevent="deleteRow(scope.$index, scope.row)">
                            삭제
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="total" @current-change="currentchange">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import { Plus } from '@element-plus/icons-vue'
    export default {
        components: {
            Plus,
        },
        created() {
        this.handleData();

        },
        data() {
            return{
                page : 1,
                total : 0,
                dialog1 : false,
                fileList: [],
                dialogImageUrl: '',
                dialogVisible: false,

                item : {
                    image : null,
                    name : '',
                    content : '',
                    price : 0,
                    quantity : 1000,
                }


            }

        },
        methods : {
            async handleData(){
                const url = `/item/select?page=${this.page}`;
                const headers = {"Content-Type":"application/json"};

                const response = await this.axios.get(url, {headers:headers});
                if(response.data.status === 200) {
                    this.items = response.data.result;
                    this.total = response.data.total;
                }
            },

            currentchange(page){
                console.log('seller => currentchange', page);
                this.page = page;
                this.handleData();
            },

            async deleteRow(idx, row){
                if( confirm('삭제할까요?')){
                    console.log('seller.vue=> deleteRow');
                    console.log(idx, row);

                    const url = `/item/delete?code=${row._id}`;
                    const headers = {"Content-Type":"application/json"};
                    const response = await this.axios.delete(url, {headers:headers,data:{}})
                    console.log(response.data)
                    if(response.data.status === 200){
                        alert('삭제되었습니다');
                        this.page = 1;
                        this.handleData();
                    }
                }
            },

            insertaa(){
                this.dialog1 =true;
            },

            handleChange(file, fileList) {
                console.log('handleChange');
                //console.log(URL.createObjectURL(file.raw));
                console.log(file, fileList);
                this.item.image = file.raw;
            },

            handleRemove(file, fileList) {
                //삭제
                console.log(file, fileList);
                this.item.image = null;
            },

            handlePreview(file) {
                console.log('handlePreview');
                console.log(file);
                // console.log(URL.createObjectURL(file.raw))

                
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            async handleInsertup(){
                if(this.item.image === null){
                    alert('이미지를 첨부하세요');
                    return false;
                }

                const url = `/item/insert`;
                const headers = {"Content-Type":"miltipart/form-data"};
                let body = new FormData();
                body.append("file", this.item.image)
                body.append("name", this.item.name)
                body.append("content", this.item.content)
                body.append("price", this.item.price)
                body.append("quantity", this.item.quantity)

                const response = await this.axios.post(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status===200){
                    alert('등록되었습니다');
                    this.dialog1 = false;
                    this.handleData();
                }
            },
            rowclick(row){
                console.log(row);
                    this.$router.push({
                        name:'ItemContent',
                         query:{code:row._id}
                    });
                
            }
        }
            
    }
</script>

<style scoped>

</style>