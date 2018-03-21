<template>
 <el-dialog :visible.sync="dialogVisible" custom-class="w-900 h-380 ovf-auto" title="订单详细信息" center>
		<el-tabs type="border-card" style="height: 300px;">
        <el-tab-pane label="订单详情">
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">订单号：{{rowData.oid}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">用户名称:{{rowData.nickname}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">订单金额:{{rowData.receivable}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">订单类型:{{rowData.order_type}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">联系电话:{{rowData.phone}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">推荐人:{{rowData.referrer_name}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">下单时间:{{rowData.created_at | formatTime}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">订单状态:{{rowData.status | order_status}}</div></el-col>
                <el-col :span="8" v-if="rowData.status=='paid'"><div class="grid-content bg-purple">付款时间:{{rowData.pay_at | formatTime}}</div></el-col>
                <el-col :span="8" v-if="rowData.status=='shippend'"><div class="grid-content bg-purple">预计收货时间:{{rowData.start_at | formatTime}}</div></el-col>
                <el-col :span="8" v-if="rowData.status=='delivered'"><div class="grid-content bg-purple">确认收货时间:{{rowData.started_at | formatTime}}</div></el-col>
                
            </el-row>
            <el-row>
                <el-col><div class="grid-content bg-purple">备注:{{rowData.note}}</div></el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="收货地址">
            <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">收货人姓名：{{rowData.nickname}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">地址:{{rowData.address}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">货运方式:</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">联系电话:{{rowData.phone}}</div></el-col>
                
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="商品清单">商品清单</el-tab-pane>
        </el-tabs>
	</el-dialog>
</template>
<style>
.search-btn {
	position: absolute;
	top: 0px;
	right: 0px;
}
</style>
<script>
  import http from '../../../assets/js/http'

  export default {
    data() {
      return {
        dialogVisible:false,
        particularsData: []
      }
    },
    methods: {
      open() {
        this.dialogVisible=true
      },
      closeDialog() {
        this.dialogVisible=false
      },
      getParticulars() {
        this.apiGet('admin/rules').then((res) => {
          this.handelResponse(res, (data) => {
            this.tableDataShow = _(data).forEach((ret) => {
              ret.showInput = false
            })
            this.tableData = this.tableDataShow
          })
        })
      }
    },
    created() {
      
        this.getParticulars()
      
    },
    props:["rowData"],
    mixins: [http]
  }
</script>
