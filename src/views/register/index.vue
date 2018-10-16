<template>
    <div class="register">
        <div class="register-title">
            新用户注册
        </div>
        <div class="input-wrap username-wrap">
            <el-input v-model="formData.username" placeholder="用户名"></el-input>
        </div>
        <div class="input-wrap">
            <el-input v-model="formData.email" placeholder="邮箱"></el-input>
        </div>
        <div class="input-wrap">
            <el-input v-model="formData.password" type="password" placeholder="密码" @keyup.enter.native="handleRegister"></el-input>
        </div>
        <div class="btn-wrap">
            <el-button type="primary" @click="handleRegister">
                注册
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                username:'',
                email:'',
                password:''
            }
        }
    },
    methods:{
        handleRegister() {
            this.$axios.post('/user',this.formData).then(res=>{
                if(res.code == 200){
                    this.$message.success(res.msg)
                    setTimeout(()=>{
                        this.$router.push('/index')
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
.register{
   
    width: 750px;
    margin: 90px auto 0;
    padding: 40px;
    background: #fff;
    border-radius: 6px;

    .register-title{
        text-align: center;
        color: #333;
        font-size: 24px;
        font-weight: 500;
    }
    
 

    .input-wrap{
        width: 390px;
        margin: 0 auto 30px;
    }

    .username-wrap{
        margin-top: 30px;
    }

    .btn-wrap{
        width: 390px;
        margin: 0 auto 30px;
        /deep/ .el-button {
            width: 100%;

        }
    }
}

</style>
