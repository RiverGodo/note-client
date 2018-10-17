<template>
    <div class="index">
        <div class="banner-wrap w1170 clearfix">
            <Banner></Banner>
            <UserBox></UserBox>
        </div>
      

        <div class="w1170">
            <div class="article-wrap ">
            <router-link  class="article-item" :to="{name:'article',params:{id:item._id}}" v-for="(item, index) in content" :key="index">
                <div class="article-msg clearfix" >
                    <div class="row1">
                        <div class="avatar fll " >
                            <img :src="item.author.avatar">
                        </div>
                        <div class="author-msg">
                            <span class="author-name" v-text="item.author.username"> 
                                东野圭吾
                            </span>
                            <span class="divide">
                                |
                            </span>
                            <span class="article-title" v-text="item.title">
                                嫌疑人X的献身
                            </span>
                        </div>
                    </div>
                    <div class="row2">
                        <span class="strong" >
                            浏览：<span v-text="item.readnumber">998</span> 
                        </span>
                        <span class="strong">
                            回复： <span v-text="item.commonnum">2</span>
                        </span>
                        <span class="strong" >
                            分类： <span v-text="item.category.name">悬疑小说</span>
                        </span>
                    </div>
                </div>
                <div class="article-content" v-text="item.contentText">
                    销量第一的悬疑小说，被翻拍成多部电影。
                </div>
            </router-link>
        </div>
        </div>
    </div>
</template>

<script>
import Banner from '@/components/Banner'
import UserBox from '@/components/UserBox'
export default {
    data(){
        return{
            content:[]
        }
    },
    components:{
        Banner,
        UserBox
    },
    methods:{
        getData(){
            this.$axios.get('/article').then(res=>{
                this.content = res.data
            })
        }
    },
    created(){
        this.getData()
    }
}
</script>

<style scoped lang="scss">
    .index{
        margin-top: 50px;

    }
    .article-wrap{
        margin-top: 30px;
        width: 750px;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;
    }

    .article-wrap .article-item{
        display: block;
        text-decoration: none;
        color: #333;
        padding: 24px;
        background: #fff;

        .avatar{
            width: 70px;
            height: 70px;
            img{
                display: block;
                width: 100%;
                height: 100%;

            }
        }
        .author-msg{
            margin-left: 15px;  
        }
        .row1{
            line-height: 24px;
        }
        .row2{
            width: 605px;
            background: #bbb;
            color: #555;
            border-radius: 4px;
            padding: 6px;
            margin-left: 70px;
            margin-top: 5px;
        }
        .author-name{
            font-size: 18px;
            font-weight: 700;
            color: #409eff;

        }
    }
</style>
