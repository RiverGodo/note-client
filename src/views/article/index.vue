<template>
    <div class=" w1170 article">
        <div class="author-msg clearfix" v-if="content.author">
            <div class="img-wrap fll">
               <img :src="content.author.avatar" class="img">
            </div>
            <div class="author-details fll">
                <div class="author-name">
                    {{content.author.username}}
                </div>
                <div class="date">
                    <span class="format-date">
                        {{content.updateTime}}
                    </span>
                    <span>
                        阅读 {{content.readnumber}}
                    </span>
                </div>
            </div>
        </div>
        <h1 class="title">
            {{content.title}}
        </h1>
        <div class="content-html" v-html="content.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            content:{}
        }
    },
    methods:{
        getData() {
            this.$axios.get(`/article/${this.$route.params.id}`).then(res =>{
                this.content = res.data
            })
        }
    },
    created(){
        this.getData()
    }
}
</script>

<style scoped lang='scss'>
    .article{
        box-sizing: border-box;
        margin-top: 50px;
        background: #fff;
        border-radius: 6px;
        padding: 60px 40px;
    }
    .img-wrap{
        width: 50px;
        height: 50px;
    }
    .author-name{
        font-size: 14px;
        font-weight: 700;
        color: #333;
    }
    .date{
        color: #555;
        font-size: 12px;
        .format-date{
            margin-right: 6px;
        }
    }
</style>
