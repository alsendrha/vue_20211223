<template>
    <div>
        <el-card shadow="always">
            <h4>판매자</h4>
            <hr />
          
            <p>물품목록</p>
            <el-button type="text" @click="dialog1 = true">
                <el-button type="primary"  size="mini" @click="insertaa">물품등록</el-button>
            </el-button>
            <router-link to="Itemimsertbatch" style="margin-left:5px">
             <el-button type="primary"  size="mini" @click="insertaa">일괄등록</el-button>
            </router-link>
            <el-button type="danger"  size="mini" style="margin-left:5px" @click="handleDlete">일괄삭제</el-button>

            <el-button type="danger"  size="mini" style="margin-left:5px" @click="handleUpdateBatch">일괄수정</el-button>
            
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
            
            
            <el-table :data="items" style="width: 100%;" >
                <el-table-column fixed="left" label="체크" width="50">
                    <template #default="scope">
                        <input type="checkbox" v-model="items[scope.$index].chk1" size="large">
                    </template>
                </el-table-column>

                <el-table-column label="코드" width="100" > 
                <template #default="scope">
                    <div @click="handlePage(scope.row._id)" style="cursor:pointer;">
                    {{scope.row._id}}
                    </div>
                </template>
                
                </el-table-column>
                
                <el-table-column prop="name" label="물품명" width="240" />
                <el-table-column prop="price" label="가격" width="180" />
                <el-table-column prop="quantity" label="재고수량" width="180"  />
                <el-table-column prop="regdate" label="등록일" />
                <el-table-column fixed="right" label="Operations" width="220">
                    <template #default="scope">
                        <el-button type="danger" size="small" @click.prevent="deleteRow(scope.$index, scope.row)">
                            삭제
                        </el-button>
                        <el-button type="primary" size="small"  @click.prevent="updateRow(scope.$index, scope.row)">
                            수정
                        </el-button>       
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="total" @current-change="currentchange">
            </el-pagination>
        </el-card>


        <el-dialog v-model="dialog3" title="Tips" width="30%">
            <span>
                <img :src="item1.image" style="width:100px" />
                <input type="file" @change="handleImage" />
            </span>

            <p><input type="text" v-model="item1.name" /></p>
            <p><textarea v-model="item1.content"></textarea></p>
            <p><input type="text" v-model="item1.price" /></p>
            <p><input type="text" v-model="item1.quantity" /></p>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="handleUpdateAction">수정</el-button>
                    <el-button @click="dialog3 = false">닫기</el-button>
                </span>
            </template>
        </el-dialog>


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
                dialog3 : false,
                fileList: [],
                dialogImageUrl: '',
                dialogVisible: false,
                item1 : '',
               
                item : {
                    image : null,
                    name : '',
                    content : '',
                    price : 0,
                    quantity : 1000,
                },
                items : [],
            }
        },
        methods : {

            async handleUpdateBatch(){
                let arr = [];
                    //items에  있는 chk1의 값이 true인것 중에서 코드값
                    for(let tmp of this.items){
                        //console.log(tmp);
                        if(tmp.chk1===true){
                            arr.push({code:tmp._id});
                        }
                    }
                    console.log(arr);
                    //주의) arr변수는 object를 string 변환해서 전송
                this.$router.push({name:'ItemUpdateBatch', 
                        params:{code:JSON.stringify(arr)}});
            },

            async handleDlete(){
                const ret = confirm('삭제할까요??');
                if(ret===true){
                    let arr = [];
                    //items에  있는 chk1의 값이 true인것 중에서 코드값
                    for(let tmp of this.items){
                        //console.log(tmp);
                        if(tmp.chk1===true){
                            arr.push({code:tmp._id});
                        }
                    }
                    console.log(arr);

                    const url =`/item/deletebatch`;
                    const headers = {"Content-Type":"application/json"};
                    const body = arr;
                    const response = await this.axios.delete(url, {headers:headers, data:body} );
                    console.log(response.data);

                    if(response.data.status===200){
                        alert('일괄 삭제 되었습니다');
                        this.handleData();
                    }
                }
            },

            handleImage(e){
                console.log("Seller.vue => handleImage");
                console.log(e);
                //벡엔드로 변경할 이미지 실제정보
                this.item1['image1'] = e.target.files[0];

                //프론트에서 미리보기용 임시 URL
                this.item1['image1URL'] = URL.createObjectURL(e.target.files[0]);

                // dialog img src를 변경하기
                //this.item1['image'] = URL.createObjectURL(e.target.files[0]);
            },

            async handleUpdateAction(){
          
                const url = `/item/update?code=${this.item1._id}`;
                const headers = {"Content-Type":"mutipart/form-data"};
                const body = new FormData();
                body.append("name", this.item1.name);
                body.append("content", this.item1.content);
                body.append("price", this.item1.price);
                body.append("quantity", this.item1.quantity);
                body.append("file", this.item1.image1);
                const response = await this.axios.put(url, body, {headers:headers});

                if(response.data.status===200){
                    alert('수정되었습니다.');
                    this.dialog3= false
                    this.handleData();
                }
            },

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
            async updateRow(idx, row){
                console.log(idx, row);

                const url = `/item/selectone?code=${row._id}`;
                const headers = {"Content-Type":"application/json"};
                 
                const response = await this.axios.get(url, {headers:headers});
                console.log(response.data)
                if(response.data.status===200){
                    this.item1 = response.data.result;
                    this.dialog3= true
                }

                //코드를 이용해서 백엔드에서 1개의 정보를 받음
                //모달창에 v-model연결
                //모달창 띄우기
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
            handlePage(code){
                    this.$router.push({
                        name:'ItemContent',
                         query:{code:code}
                    });
                
            }
        }
            
    }
</script>

<style scoped>

</style>