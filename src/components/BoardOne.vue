<template>
    <div>
        <h3>BoardOne</h3>
        <el-card shadow="always">
            <el-descriptions direction="vertical" :column="4" border>
            <el-descriptions-item label="글번호" :span="2" >{{item._id}}</el-descriptions-item>
            <el-descriptions-item label="제목" :span="8">{{item.title}}</el-descriptions-item>
            <el-descriptions-item label="작성자" :span="2" >{{item.writer}}</el-descriptions-item>
            <el-descriptions-item label="내용" :span="2" >{{item.content}}</el-descriptions-item>
        </el-descriptions>
                      
            <router-link to="/board">
                <el-button type="success" size="mini" plain>글목록으로 이동</el-button>
            </router-link>

            <el-button type="text" @click="dialog1 = true">
                <el-button type="primary"  size="mini" plain @click="hanldeDlete">글삭제</el-button>
            </el-button>

            <el-dialog v-model="dialog1" title="Tips" width="30%" :before-close="hanldeClose">
                <span>삭제하시겠습니까?</span>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="hendelDel(no)">글삭제</el-button>
                        <el-button @click="dialog1 = false">취소</el-button>
                    </span>
                </template>
            </el-dialog>
            
            <el-button type="text" @click="dialog2 = true">
                <el-button type="primary" size="mini" plain @click="handleUp">글수정</el-button>
            </el-button>

            <el-dialog v-model="dialog2" title="Tips" width="40%" :before-close="hanldeClose">
                <span>수정내용입력</span>
                <hr />
                번호
                <p>{{item1._id}}</p>
                <el-input v-model="item1.title" placeholder="제목" />
                <el-input v-model="item1.content" :rows="10" type="textarea" placeholder="내용" />
                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="hendeUpdate">수정</el-button>
                        <el-button @click="dialog2 = false">취소</el-button>
                    </span>
                </template>
            </el-dialog>
            <el-button type="primary" size="mini" plain @click="handlePrev">이전글</el-button>
            <el-button type="primary" size="mini" plain @click="handleNext">다음글</el-button>
        </el-card>
    </div>
</template>

<script>
    export default {
        created(){
            this.handleData();
           
            
   
        },

        data(){
            return{
                no : Number(this.$route.query.no),
                item : '',
                item1 : '',     
                dialog2 : false,
                dialog1 : false,
                hanldeClose : '',
      
            }
        },
        methods:{
            handleUp(){
                this.dialog2=true;
            },
            hanldeDlete(){
                this.dialog1=true;
                
            },
            async hendelDel(no){
                const url = `/board/delete?&no=${no}`;
                const headers = {"Content-Type":"application/json"};
                const body = {};
                const response = await this.axios.delete(url, {headers:headers,data:body});
                console.log(response.data);
                if(response.data.status===200){
                alert('삭제되었습니다');
                this.$router.push({path:'/board'});
                }
            },

            async hendeUpdate(){
                const url = `/board/update`;
                const headers = {"Content-Type":"application/json"};
                const body = {
                    no      : this.item1._id,
                    title   : this.item1.title,
                    content : this.item1.content,
                 }
                const response = await this.axios.put(url, body, {headers:headers});
                if(response.data.status===200){
                    this.dialog2=false;
                    alert('수정되었습니다');
                    this.handleData();
                }
            },

            async handleData(){
                const url = `/board/selectone?&no=${this.no}`;
                const headers = {"Content-Type":"application/json"};
                const response = await this.axios.get(url, {headers:headers});
                console.log(response.data);
                if(response.data.status===200){
                    //출력 용도
                    this.item = response.data.result;
                    //수정시 사용할 용도
                    this.item1 = Object.create(this.item)
                }
            },

            async handlePrev(){
                const url = `/board/prevno?cno=${this.no}`;
                const headers = {"Content-Type":"application/json"};
                
                const response = await this.axios.get(url, {headers:headers});
                console.log('handlePrev');
                console.log(response.data);
                if(response.data.status===200){
                   if(response.data.no <= 0){
                       alert('이전글이 없습니다');
                   }
                   else{
                       this.no = response.data.no;

                       //현재페이지 -> 같은페이지로 push는 데이터
                       // 생명주기 created, mounted가 호출되지않는다.
                       //replace는 기록을 안남김
                       this.$router.push({
                           name : 'BoardOne',
                           query : {bno : 1, no : this.no}
                       });
                       
                       this.handleData();
                       this.handleHit();
                   }
                }
            },

            async handleNext(){
                const url = `/board/nextvno?cno=${this.no}`;
                const headers = {"Content-Type":"application/json"};
                const response = await this.axios.get(url, {headers:headers});
                if(response.data.status===200){
                   if(response.data.no <= 0){
                       alert('다음글이 없습니다');
                   }
                   else{
                       this.no=response.data.no;
                       this.handleData();
                       this.handleHit();
                   }
                }
            },

            async handleHit(){
                const url = `/board/updatehit?no=${this.no}`;
                const headers = {"Content-Type":"application/json"};
                const response = await this.axios.put(url,{}, {headers:headers});
                if(response.data.status===200){
                    console.log('조회수증가 성공');
                }
            }
        }
        
    }
</script>

<style scoped>
* {
    box-sizing: border-box; /* 기본값은 content-box */
}

.container1 { 
    width:80%;
}

header { /* <header> */
    background-color: #b8f2fc;
    color:#ffffff;
    padding: 20px;
    text-align: center;
}

nav{
    float: left;
    background-color: #cccccc;
    width: 20%;
    height: 500px;
    padding: 10px;
}

article{
    float: left;
    background-color: #95f09c;
    padding: 10px;
}

aside{
    float: left;
    background-color: #95b5f0;
    width: 10%;
    height: 500px;
    padding: 10px;
}

footer {
    background-color: #e96565;
    text-align: center;
    padding: 20px;
}

section::after{
    content: "";
    clear: both;
    display: block;
}

ul {
    list-style-type: none;
}

a{
    text-decoration: none;
}

table{
    width: 100%;
    border-collapse: collapse;
}

tbody{
    text-align: center;
}



 .mydiv {
    border:10px solid #ee4a4a; /* 테두리 */
    margin-bottom: 20px;        /* 아래쪽 여백 */
    padding : 10px;             /* 안쪽(4방향) 여백 */
}

.container{
    width: 800px;
    padding: 30px;
    border: 2px solid #796767;
}

.lbl1{
    width: 70px;
    display: inline-block;
}

.mydiv1{
    margin-bottom: 5px;
}

.mydiv2 {
    width: 500px;
    margin-bottom: 5px;
    border: 1px solid #cccccc;
}

.container2{
    width: 800px;
    border: 3px;
  }
.background{
    
    height: 680px;
    width: 1627px;

}
.htext{
    text-align: center;
}
</style>