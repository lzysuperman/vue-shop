<template>
  <Form :model="form" label-position="left" :label-width="100">
    <FormItem label="订单id">
      <span>{{form.id}}</span>
    </FormItem>
    <FormItem label="快递单号">
      <i-Input v-model="form.express_no"></i-Input>
    </FormItem>
    <FormItem label="快递费用">
      <i-Input v-model="form.express_fee"></i-Input>
    </FormItem>
    <FormItem label="收件人">
      <i-Input v-model="form.accept_name"></i-Input>
    </FormItem>
    <FormItem label="收货电话">
      <i-Input v-model="form.telphone"></i-Input>
    </FormItem>
    <FormItem label="收货手机">
      <i-Input v-model="form.mobile"></i-Input>
    </FormItem>
    <FormItem label="收货邮箱">
      <i-Input v-model="form.email"></i-Input>
    </FormItem>
    <FormItem label="收货地区">
      <i-Input v-model="form.area"></i-Input>
    </FormItem>
    <FormItem label="收货地址">
      <i-Input v-model="form.address"></i-Input>
    </FormItem>
    <FormItem label="收货备注">
      <i-Input v-model="form.message"></i-Input>
    </FormItem>
    <FormItem label="总金额">
      <i-Input v-model="form.order_amount"></i-Input>
    </FormItem>
    <FormItem label="订单状态">
      <i-Input v-model="form.orderstatus"></i-Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit">确认</Button>
      <Button style="margin-left: 8px" @click="handleCancel">取消</Button>
    </FormItem>
  </Form>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            id:0,
            form:{
               id:0,
               express_no:"",
               express_fee:0,
               accept_name:"",
               telphone:"",
               mobile:"",
               email:"",
               area:"",
               address:"",
               message:"",
               order_amount:0,
               orderstatus:0
            }
        }
    },

    mounted() {
    const id = this.$route.params.orderid;
    this.id = id;
    console.log(id);
    this.$axios({
      url: `/admin/order/getorderdetial/${id}`
    }).then(res => {
      console.log(res.data);
      const { orderinfo } = res.data.message;
      this.form = orderinfo;
    });
  },

  //确认修改
  methods:{
    handleSubmit(){
        this.$axios({
            url:"/admin/order/updateorder",
            method:"post",
            data:{
                orderinfo:this.form
            }
        }).then(res => {
            // console.log(res)
            const {message} = res.data;
            this.$Message.success('修改成功');
            setTimeout(() => {
                this.$router.back()
            },1000)
        });

    },
    handleCancel(){
        this.$router.back()
    }

  }
};
</script>

<style>
</style>
