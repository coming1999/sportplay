<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>运动模块</el-breadcrumb-item>
        <el-breadcrumb-item>商品模块</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 用户列表主体 -->
        <el-card>
            <!-- 搜索添加 -->
            <el-row :gutter="25">
                <el-col :span="10">
            <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @clear="getUserList()">
                <el-button slot="append" icon="el-icon-search" @click="getNewUserList()"></el-button>
            </el-input>
                </el-col>
            <!-- 搜索按钮 -->
              <el-col :span="4">
                <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
              </el-col>
            </el-row> 
            <!-- 用户列表 border边框 stripe隔行变色 -->
            <el-table :data="userList" border stripe>
                <!-- 索引页 -->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="角色" prop="role"></el-table-column>
                <el-table-column label="状态" prop="state">
                <!-- 作用域插槽 -->
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.state" @change="userStateChange(scope.row)"></el-switch>
                </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template>
                        <!-- 修改 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <!-- 删除 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" ></el-button>
                        <!-- 权限 -->
                        <el-tooltip effect="dark" content="分配权限" placement="top-start" :enterable="false"><!--文字提示 enterable隐藏 -->
                        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页组件 size-change每页最大变化 current-change当前最大变化 layout功能组件-->
            <div>
                <el-pagination
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.PageNum"
                    :page-sizes="[1, 2, 5, 100]"
                    :page-size="queryInfo.PageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    created(){
        this.getUserList();
    },
    data(){
        return{
            //查询信息实体
            queryInfo: {
                query:"", //查询信息
                pageNum: 1, //当前页
                pageSize: 5, //每页最大数
            },
            userList: [], //用户列表
            total: 0, //总记录数
        }
    },
    methods:{
        // 获取所有用户
        async getUserList(){
            const {data:res} = await this.$http.get("/alluser",{params:this.queryInfo});
            this.userList = res.data; //用户列表数据封装
            this.total = res.numbers; //总用户数封装
        },
        // 最大数
        handleSizeChange(newSize){
            this.queryInfo.pageSize = newSize;
            this.getUserList();
        },
        // pageNum的触发动作
        handleCurrentChange(newPage){
            this.queryInfo.pageNum= newPage;
            this.getUserList();
        },
        async userStateChange(userInfo){
            const {data:res} = await this.$http.post(`updateState?id=${userInfo.id}&state=${userInfo.state}`);
            if(res!="success"){
                return this.$message.error("操作失败");
            }
            this.$message.success("操作成功");
        },
        getNewUserList(){
            this.queryInfo.pageNum=1;
            this.getUserList();
        }
    }
   
}
</script>

<style language="less" scoped>
.el-breadcrumb{
    margin-bottom: 50px;
    font-size: 15px;
}
.el-table{
    margin-top: 15px;
    font-size: 12px;
    min-width: 350px;
}

</style>