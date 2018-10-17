<template>
    <div class="user-box flr">
        <div class="login-box" v-if="!userInfo.username">
            <div class="input-wrap mb30">
                <input type="text" class="input" placeholder="邮箱" v-model="formData.email">
            </div>
            <div class="input-wrap mb30">
                <input type="password" class="input" placeholder="密码" v-model="formData.password" @keyup.enter="handleLogin">
            </div>
            <div class="btn-wrap mb30">
                <el-button type="primary" @click="handleLogin">
                    登录
                </el-button>
            </div>
            <div class="btn-wrap mb30">
                <el-button @click="$router.push('/register')">
                    注册
                </el-button>
            </div>
        </div>
        <div class="user-msg-box" v-else>
            <div class="img-wrap">
                <img :src="userInfo.avatar" alt="">
            </div>
            <div class="username">
                <span>{{userInfo.username}}</span>
            </div>
            <div class="logout-wrap">
                <el-button type="warning" @click="handleLogout">
                    退出登录
                </el-button>
            </div>
        
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data(){
    return{
        formData:{
            email:'',
            password:'',

        }
    }
},
    methods:{
        handleLogin(){
            console.log(this.$axios)
            this.$axios.post('/login',this.formData).then(res=>{
                console.log(res);
                       if(res.code == 200){
                    this.$message.success(res.msg)
                    setTimeout(()=>{
                         console.log(res.userData);
                        this.$store.commit('CHANGE_userInfo', res.userData)
                    },500)
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        handleLogout(){
            this.$axios.get('/logout').then(res=>{
                  let userInfo = {
                        avatar:'',
                        email:'',   
                        password:'',
                                }
                if(res.code == 200){
                    console.log(1);
                    
                    this.$message.success(res.msg)
                    this.$store.commit('CHANGE_userInfo',userInfo)//清空vuex当中保留的用户信息
                    this.$router.push('/index')
                }else{
                    this.$store.commit('CHANGE_userInfo',userInfo)//清空vuex当中保留的用户信息
                    this.$message.info('登录状态已过期，请重新登录')
                }
            })
        }
    },
    computed:{
        ...mapState(['userInfo'])
    }
}
</script>

<style scoped lang="scss">
    .user-box{
        width: 360px;
        height: 340px;
        background: #fff;
        border-radius: 6px;
        padding: 50px 35px 20px 35px;
        box-sizing: border-box;

        .input{
            padding: 13px 18px;
            color: #333;
            font-size: 14px;
            outline: none;
            border: 1px solid #f1f1f1;
            border-radius: 4px;
            width: 100%;
            box-sizing: border-box;
        }
        .btn-wrap{
            /deep/ .el-button{
                width: 100%;

            }
        }
        .user-msg-box{ //用户信息盒子
            .username{
                font-size: 20px;
                font-weight: 700;
                color: #444;
                text-align: center;
                padding: 15px 0;

            }
            .img-wrap{
                width: 150px;
                height: 150px;
                margin: 0 auto 10px;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .logout-wrap{
                /deep/ .el-button{
                    display: block;
                    width: 100%;

                }
        }
        }
        
    }
</style>
