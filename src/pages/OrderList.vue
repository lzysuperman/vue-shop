<template>
  <div>
    <!-- 搜索栏 -->
    <Row type="flex" justify="end" class="seek">
      <i-Col span="4">
        <Select v-model="statusValue" class="aaaaa">
          <Option
            v-for="item in options"
            :key="item.index"
            :value="item.index"
            @click.native="handleStatus(statusValue)"
          >{{item.value}}</Option>
        </Select>
      </i-Col>
      <i-Col offset="1">
        <i-Input placeholder="会员名称" v-model="vipname_seek">
          <Button slot="append" icon="ios-search" @click.native="handleSeek"></Button>
        </i-Input>
      </i-Col>
    </Row>

    <Table border :columns="columns12" :data="data6">
      <template slot-scope="{ row }" slot="order_id">
        <strong>{{ row.id}}</strong>
      </template>
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.user_name}}</strong>
      </template>
      <template slot-scope="{ row }" slot="site">
        <strong>{{ row.area}}</strong>
      </template>
      <template slot-scope="{ row }" slot="expressage">
        <strong>{{ row.expressTitle}}</strong>
      </template>
      <template slot-scope="{ row }" slot="status">
        <strong>{{ row.statusName}}</strong>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <Button type="error" size="small" @click="handleEdit(row)">编辑</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index,row)">查看</Button>
      </template>
    </Table>
    <!-- 分页器 -->
    <div class="paging">
      <Page
        show-elevator
        show-sizer
        show-total
        :total="totalcount"
        :page-size="pageSize"
        :page-size-opts="[2,3,4,5,6]"
        @on-change="handleCurrent"
        :current="pageIndex"
        @on-page-size-change="handlePage"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns12: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "订单id",
          key: "order_id",
          slot: "order_id"
        },
        {
          title: "会员名称",
          key: "name",
          slot: "name"
        },
        {
          title: "地址",
          key: "site",
          slot: "site"
        },
        {
          title: "快递",
          key: "expressage",
          slot: "expressage"
        },
        {
          title: "状态",
          key: "status",
          slot: "status"
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      //表格数据
      data6: [],
      //当前第几页，默认是1
      pageIndex: 1,
      //每页显示的条数，默认是10
      pageSize: 3,
      //会员注册时的名称
      vipname: "",
      //订单状态
      orderstatus: 0,
      //总数
      totalcount: 0,

      //状态值
      options: [
        {
          index: 0,
          value: "全部"
        },
        {
          index: 1,
          value: "待付款"
        },
        {
          index: 2,
          value: "已付款待发货"
        },
        {
          index: 3,
          value: "已发货"
        },
        {
          index: 4,
          value: "已签收"
        },
        {
          index: 5,
          value: "已取消"
        }
      ],

      //选择的状态值
      statusValue: 0,
      //输入框搜索的值
      vipname_seek: "",
      //商品信息
      goodsData:""
    };
  },

  mounted() {
    //请求列表数据
    this.getList();
  },

  methods: {
    getList() {
      // 获取列表数据
      this.$axios({
        method: "GET",
        url: `/admin/order/getorderlist`,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          vipname: this.vipname,
          orderstatus: this.orderstatus
        }
      }).then(res => {
        // console.log(res.data);
        const { message, pageIndex, pageSize, totalcount } = res.data;
        this.data6 = message;
        this.totalcount = totalcount;
      });
    },

    //选择状态
    handleStatus(val) {
      // console.log(val)
      this.orderstatus = val;
      this.getList();
    },

    //查找
    handleSeek() {
      console.log("搜索触发");
      this.vipname = this.vipname_seek;
      //改为第一页
      this.pageIndex = 1;
      this.getList();
    },

    //修改页码触发
    handleCurrent(val) {
      this.pageIndex = val;
      this.getList();
    },

    //切换每页的条数触发
    handlePage(val) {
      this.pageSize = val;
      this.getList();
    },

    show(index,row) {
      // this.$Modal.info({
      //   title: "订单详情(づ￣3￣)づ╭❤～",
      //   content: `订单id：${this.data6[index].id}
      //   <br>会员名称：${this.data6[index].user_name}
      //   <br>地址：${this.data6[index].area}
      //   <br>快递：${this.data6[index].expressTitle}
      //   <br>订单状态：${this.data6[index].statusName}
      //   <br>购买时间：${this.data6[index].add_time}
      //   `,
      // });
      this.$router.push(`/admin/order-detail/${row.id}`)
      
    },

    handleEdit(row) {
      this.$router.push(`/admin/order-edit/${row.id}`)
    }
  }
};
</script>
<style>
.seek {
  margin-bottom: 15px;
}
.paging {
  margin-top: 15px;
}
</style>