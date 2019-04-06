<template>
  <Row type="flex" justify="center" align="middle" class="login">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="form">
      <FormItem prop="uname">
        <i-Input type="text" v-model="formInline.uname" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </i-Input>
      </FormItem>
      <FormItem prop="upwd">
        <i-Input type="password" v-model="formInline.upwd" placeholder="密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </i-Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
      </FormItem>
    </Form>
  </Row>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        uname: "admin",
        upwd: "123456"
      },
      ruleInline: {
        uname: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        upwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "至少6位数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$axios({
        url: "/admin/account/login",
        data: this.formInline,
        method: "post",
        //由于在8080端口下请求8899端口，涉及到跨域
        withCredentials: true
      }).then(res => {
        // es6解构
        const { status, message } = res.data;
        //失败
        if (status == 1) {
          //element ui 的错误框
          this.$Message.error(message);
        } else {
          //成功
          this.$Message.success(message);
          this.$router.push("/admin");
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background: #ddd;
}
.form {
  width: 260px;
}
.form >>> .ivu-input {
  height: 45px;
  font-size: 16px;
}
.form >>> .ivu-input-group {
  font-size: 26px;
}
</style>
