<template>
    <div class="header">
        <div class="header-content w1170 clearfix">
            <div class="header-title fll">
                <router-link to="/">
                    云笔记
                </router-link>
            </div>
            <div class="btn-wrap flr">
                <el-button>
                    写笔记
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
    .header{
        background: #409eff;
        height: 50px;
        .header-title a {
            font-size: 30px;
            color: #fff;
            font-weight: 400;
            line-height: 1.5;
            text-decoration: none;
        }
        .btn-wrap{
            margin-top: 5px;
        }
    }
</style>
