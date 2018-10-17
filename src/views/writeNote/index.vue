<template>
    <div class="write-note">
        <div class="mian-content w1170 ">
            <div class="title">
                标题
            </div>
            <div class="input-wrap">
                <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
            </div>
            <div class="title">
                内容
            </div>
            <quill-editor
            v-model="formData.content"
            ref="myQuillEditor"
            :options="editorOption"
            @change="handleChange"
            >
            </quill-editor>
            <div class="strong clearfix">
                 <span class="fll">分类:</span>
                <div class="fll" style="margin-left:20px">
                    <dyRadios :options='categories' v-model="formData.category"></dyRadios>
                </div>
            </div>
            <el-button type="primary" @click="handleSubmit">
                发布笔记
            </el-button>
        </div>
    </div>
</template>

<script>
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  import dyRadios from '@/components/Radios'

  Quill.register('modules/ImageExtend', ImageExtend)
export default {
    components: {quillEditor,dyRadios},
   data() {
      return {
          formData:{
            content: '',
            title:'',
            contentText:'',
            category:''

          },
          categories:[],
        // 富文本框参数设置
        editorOption: {  
          modules: {
            ImageExtend: {
              loading: true,
              name: 'img',
              action: 'http://qiniu.com',
              response: (res) => {
                return res.info
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        },
        
      }
    },
    methods:{
        handleChange({ quill, html, text }){
            console.log(text);
            this.formData.contentText = text
            this.formData.contentText = this.formData.contentText.substring(0,200) + '...'
        },
        getCategory(){
            this.$axios.get('/category').then(res=>{
                this.categories = res.data
            })
        },
        handleSubmit(){
            this.$axios.post('/article',this.formData).then(res=>{
                if(res.code == 200){
                    this.$message.success(res.msg)
                    this.$router.push('/index')
                }else if(res.code == 403){
                        this.$router.push('/index')
                         this.$message.error(res.msg)
                }
            })
        }
    
    },
        created() {
            this.getCategory()
        }
}
</script>

<style scoped lang='scss'>
    .mian-content{
        margin-top: 30px;
        background: #fff;
        border-radius: 6px;
        padding: 30px;
        box-sizing: border-box;

        .title{
            line-height: 2;
            font-size: 20px;
            font-weight: 600;
            color: #444;
         
        }
        .strong{
            color: #409eff;
            font-weight: 700;
            font-size: 14px;
            margin: 20px 0 ;
        }
      
    }
</style>

<style>
.ql-container{
    min-height: 300px;
}
</style>

