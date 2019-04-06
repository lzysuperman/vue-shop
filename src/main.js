import Vue from 'vue'
import App from './App.vue'
//引入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
//引入axios
import axios from 'axios';
//引入路由模块
import VueRouter from 'vue-router';

//引入组件
import Admin from './pages/Admin.vue';
import OrderList from './pages/OrderList.vue';
import Login from './pages/Login.vue';
import OrderDetail from './pages/OrderDetail.vue';
import OrderEdit from './pages/OrderEdit.vue';

Vue.config.productionTip = false

//注册
Vue.use(iView);
Vue.use(VueRouter);

//路由配置
const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, meta: '登录' },
    {
        path: '/admin',
        component: Admin,
        redirect: '/admin/order-list',
        meta: '管理后台',
        children: [
            { path: 'order-list', component: OrderList, meta: '订单管理' },
            { path: 'order-detail/:orderid', component: OrderDetail, meta: '订单详情' },
            { path: 'order-edit/:orderid', component: OrderEdit, meta: '订单编辑' }
        ]
    }
]

//路由对象
const router = new VueRouter({
    routes
})

//挂载到原型
Vue.prototype.$axios = axios;

//设置axios的基础url
axios.defaults.baseURL = "http://localhost:8899"

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')