<template>
  <div class="layout">
    <!-- 左侧菜单 -->
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>商城订单
          </template>
          <MenuItem name="1-1">订单管理</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <!-- 头部 -->
      <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}" class="tou">
        <Row type="flex" justify="space-between" align="middle" class="code-row-bg">
          <i-Col>
            <Icon type="ios-arrow-dropleft-circle" size="20" style=""/>
          </i-Col>
          <i-Col>
            <span>管理员</span>
            <span class="out" @click="handleOut">退出</span>
          </i-Col>
        </Row>
      </Header>
      <!-- 面包屑和内容 -->
      <Content :style="{padding: '0 16px 16px'}">
        <Breadcrumb :style="{padding:'16px 0 16px 0'}">
          <BreadcrumbItem :to="{path:item.path}" v-for="(item,index) in BreadcrumbInfo" :key="index">
             {{item.name}}
          </BreadcrumbItem>
        </Breadcrumb>

        <Card>
          <div style="height: 700px">
            <!-- 内容 -->
            <router-view></router-view>
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  methods: {
    //登录退出
    handleOut() {
      this.$axios({
        url: "/admin/account/logout"
      }).then(res => {
        const { message, status } = res.data;
        if (status == 0) {
          this.$Message.success(message);
          this.$router.push("/login");
        } else {
          this.$Message.error(message);
        }
      });
    }
  },

  //监听面包屑
  computed:{
    BreadcrumbInfo(){
      const arr = this.$route.matched.map(v => {
        return {
          name:v.meta,
          path:v.path
        };
      })
      return arr
    }
  }
};
</script>

<style scoped lang="scss">
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.out {
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    color: #2d8cf0;
  }
}

</style>
