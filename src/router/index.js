import Vue from 'vue'
import VueRouter from 'vue-router'
//引入login组件
import Login from '../components/Login.vue' 
//引入Home组件
import Home from '../components/Home.vue'



Vue.use(VueRouter)

const routes = [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/home",
      component: Home
    }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  // to 将要访问
  // from 从哪访问
  // next 接着干什么 next(url) 重定向到url上 
  //如果没有写的话，空的话，继续访问 to 的路径
  if(to.path == '/login') return next();
  // 如果不是访问首页，先获取user，从数据库中取出user，如果user存在就放入window下
  const userFlag = window.sessionStorage.getItem("user");// 取出当前的用户
  if(!userFlag) return next("/login") // 无值，返回登录页
  next();// 既有值，又不访问login 符合要求 放行
});

export default router
