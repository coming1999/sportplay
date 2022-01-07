<template>
    <div class="login_container">
        <!--登录块-->
        <div class="login_box">
            <!--头像-->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="图片"/>
            </div>
            <!--表单区域-->
            <!--:rules="loginRules" 绑定验证规则对象 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login_form" label-width="0">
                <!--用户名-->
                <el-form-item prop="username"><!--prop绑定loginRules里的username属性-->
                 <el-input v-model="loginForm.username" prefix-icon="iconfont icon-denglu"></el-input>
                </el-form-item>
                <!--密码-->
                <el-form-item prop="password">
                    <!--前缀图标prefix-icon="iconfont icon-mima" 密码隐藏type="password" -->
                 <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima" type="password"></el-input>
                </el-form-item>
                <!--按钮-->
                <el-form-item class="btns">
                 <el-button type="primary" @click="login()">提交</el-button>
                 <el-button type="info" @click="resetLoginForm()">重置</el-button>
                </el-form-item>
            </el-form>
            
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{
            //表单数据对象
            loginForm:{
                username:"admin",
                password:"123456"
            },
            //验证对象
            loginRules:{
                //校验用户名
                username:
                [
                    { required: true, message: '用户名为必填项', trigger: 'blur' },//必填项验证，失去焦点方法blur
                    { min: 5, max: 12, message: '长度在 5 ~ 12个字符', trigger: 'blur' }//长度验证
                ],
                //密码
                password:
                [
                    { required: true, message: '密码为必填项', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 ~ 10个字符', trigger: 'blur' }

                ],
            },
        };
    },
    methods: {
        //重置表单内容方法
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields();
        },
        //处理登录方法
        login(){
            //1.验证登录是否成功,valid是一个true和false
            this.$refs.loginFormRef.validate(async valid =>{//将访问的信息解析过来使用async
                if(!valid) return;//验证失败
                const {data:res} =await this.$http.post("login",this.loginForm);//访问后台得到信息，解析得到data数据，命名为res
                if(res.flag == "ok"){
                    window.sessionStorage.setItem("user",res.user);//存储user对象放入session中，以键值对的形式
                    this.$message.success("操作成功");//信息提示
                    this.$router.push({path:"/home"});//页面路由跳转
                }else{
                    this.$message.error("操作失败");
                }
            });
 
        },
    },
}
</script>
<style scoped>
/*
根节点样式
*/
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}

.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    /* 绝对定位 */
    position: absolute;
    left: 50%;
    top: 50%;
    /* 沿着设置的坐标的反方向 */
    transform: translate(-50%,-50%);
}
.avatar_box{
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 1px solid #eee;
    padding: 5px;
    box-shadow: 0 0 2px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #eee;
}
img{
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
}
.btns{
    /* 流式布局 */
    display: flex;
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}
</style>