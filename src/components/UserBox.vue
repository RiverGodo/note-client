<template>
    <div class="user-box flr">
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
</template>

<script>
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
                        this.$store.commit('CHANGE_userInfo', res.userDate)
                    },500)
                }else{
                    this.$message.error(res.msg)
                }
     
               
            })
        }
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
    }
</style>
