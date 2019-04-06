<template>
  <div class="detail">
    <Icon type="ios-arrow-back" size="20" class="back"/>
    <h4>订单详情</h4>
    <p>
      <span>订单id:</span>
      {{data.orderinfo.id}}
    </p>
    <p>
      <span>会员名称:</span>
      {{data.orderinfo.user_name}}
    </p>
    <p>
      <span>地址:</span>
      {{data.orderinfo.area}}
    </p>
    <p>
      <span>快递:</span>
      {{data.orderinfo.expressTitle}}
    </p>
    <p>
      <span>状态:</span>
      {{data.orderinfo.statusName}}
    </p>
    <p>
      <span>购买时间:</span>
      {{data.orderinfo.add_time}}
    </p>
    
    <h4>订单商品列表</h4>
    <Table border :columns="columns12" :data="data.goodslist">
      <template slot-scope="{ row }" slot="commodity">
        <div class="goods-info">
           <div class="goods-img">
               <img :src="row.imgurl" alt="">
           </div>
           <p>{{row.goods_title}}</p>
        </div>
      </template>
      <template slot-scope="{ row }" slot="genre">
        <strong>{{ row.goods_no}}</strong>
      </template>
      <template slot-scope="{ row }" slot="price">
        <strong>{{ row.goods_price}}</strong>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns12: [
        {
          title: "商品",
          slot: "commodity"
        },
        {
          title: "类型",
          slot: "genre"
        },
        {
          title: "价格",
          slot: "price"
        },
       
      ],

      id: 0,
      data: {
        orderinfo: {}
      }
    };
  },
  mounted() {
    const id = this.$route.params.orderid;
    this.id = id;
    console.log(id);
    this.$axios({
      url: `/admin/order/getorderdetial/${id}`
    }).then(res => {
      console.log(res.data);
      const { message } = res.data;
      this.data = message;
    });
  }
};
</script>

<style lang="scss">
.goods-info{
		display: flex;
		align-items: center;

		.goods-img{
			width:64px;
			height:64px;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			flex-shrink: 0;
			margin-right:10px;
			img{
				display: block;
				height:64px;
                
			}
		}
	}
    .back{
        margin-bottom: 20px;
        cursor: pointer;
        &:hover{
            color:#2d8cf0;
        }
    }
</style>
