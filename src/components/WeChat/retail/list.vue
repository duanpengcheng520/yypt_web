
<template>
<div>
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
 
  <el-form-item label="用户">
    <el-input v-model="formInline.nickname" placeholder="用户"></el-input>
  </el-form-item>
  <el-form-item label="订单号">
    <el-input v-model="formInline.oid" placeholder="订单号"></el-input>
  </el-form-item>
  <el-form-item label="订单状态">
    <el-select v-model="formInline.status" placeholder="请选择">
        <el-option
          v-for="item in formInline.options"
          :key="item.status"
          :label="item.label"
          :value="item.status">
        </el-option>
    </el-select>
    <!-- <el-select v-model="formInline.region" placeholder="订单状态">
      <el-option label="已提交待支付" value="submitted"></el-option>
      <el-option label="已支付" value="paid"></el-option>
      <el-option label="退款中" value="refunding"></el-option>
      <el-option label="已发货待签收" value="shippend"></el-option>
      <el-option label="已签收" value="delivered"></el-option>
      <el-option label="已取消" value="canceled"></el-option>
    </el-select> -->
  </el-form-item>
  <el-form-item label="付款时间">
    <el-date-picker
      v-model="formInline.pay_at"
      type="date"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="下单时间">
    <el-date-picker
      v-model="formInline.created_at"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" icon="search" @click="search">查询</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="success" @click="outExcel">导出</el-button>
  </el-form-item>
</el-form>
<el-table
    :data="tableData"
    style="width: 100%"
    border
    :row-class-name="tableRowClassName">
      <el-table-column
      label="序号"
      type="index"
      width="50">
      </el-table-column>
      <el-table-column
      prop="oid"
      label="订单号"
      width="190">
      </el-table-column>
      <el-table-column
      prop="receivable"
      label="订单金额"
      width="100">
      </el-table-column>
      <el-table-column
      label="用户名称"
      prop="nickname">
      </el-table-column>
      <el-table-column
      label="联系电话"
      prop="phone"
      width="125">
      </el-table-column>
      <el-table-column
      label="订单类型"
      prop="order_type">
      </el-table-column>
      <el-table-column
      label="订单状态">
       <template scope="scope">
          <div>
            {{ scope.row.status | order_status }}
          </div>
        </template>
      </el-table-column>
      
      <el-table-column
      label="付款时间"
      format="yyyy-MM-dd"
      prop="pay_at"
      :formatter="dateFormat">
      </el-table-column>
      <el-table-column
      label="下单时间"
      prop="created_at"
      :formatter="dateFormat">
      </el-table-column>
      <el-table-column
      label="推荐人"
      prop="referrer_name"
      >
      </el-table-column>
      <el-table-column
      label="操作"
      width="160">
        <template scope="scope">
          <div>
            <span>
              <el-button  type="primary" size="mini" @click="openParticulars(scope.row)">详情</el-button>
            </span>
            <span v-if="scope.row.status=='paid'">
              <router-link :to="{ name: 'usersEdit', params: { id: scope.row.id }}" class="btn-link edit-btn">
                待发货
              </router-link>
            </span>
            <!-- <span>
              <el-button size="small" type="danger" @click="confirmDelete(scope.row)">删除</el-button>
            </span> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
     <div class="pos-rel p-t-20">
      <btnGroup :selectedData="multipleSelection" :type="'users'"></btnGroup>
      <div class="block pages">
        <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size="limit"
        :current-page="currentPage"
        :total="dataCount">
        </el-pagination>
      </div>
    </div>
  <particulars ref="particulars"  :row-data="formInline.rowData" ></particulars>
</div>
</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<script>  
import particulars from './particulars.vue'
import http from '../../../assets/js/http'
 export default {
    data() {
      return {
       formInline: {
          oid:'',
          pay_at:'',
          created_at:'',
          nickname:'',
          options: [{
                      status: 'submitted',
                      label: '已提交待支付'
                    }, {
                      status: 'paid',
                      label: '已支付'
                    }, {
                      status: 'refunding',
                      label: '退款中'
                    }, {
                      status: 'shippend',
                      label: '已发货待签收'
                    }, {
                      status: 'delivered',
                      label: '已签收'
                    }, {
                      status: 'canceled',
                      label: '已取消'
                  }],
          status:'',
          rowData:[],

        },
        tableData: [],
        excelName:'销售订单',
        dataCount: null,
        currentPage: null,
        keywords: '',
        limit: 15

      }
    },
    methods: {
        dateFormat(row,column) {  
                var dateStr = row[column.property]; 
            if (dateStr == undefined) {  
              return "";  
            }  
          return dateStr.slice(0,dateStr.indexOf("."));

        }, 
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
        openParticulars(row){
          this.formInline.rowData=row;
          console.log(this.formInline.rowData);
          this.$refs.particulars.open()
        },
        outExcel() {
        require.ensure([], () => {
    　　　　　　const { export_json_to_excel } = require('src/vendor/Export2Excel');
    　　　　　　const tHeader = ['订单号','订单金额','用户名称','联系电话','订单类型','订单状态','付款时间','下单时间','推荐人'];
    　　　　　　const filterVal = ['oid', 'receivable', 'nickname', 'phone', 'order_type', 'status','pay_at','created_at','referrer_name' ];
    　　　　　　const data = _g.formatJson(filterVal, this.tableData);
    　　　　　　export_json_to_excel(tHeader, data, this.excelName);
    　　　　})


      },
      
      search() {
        let searchData={nickname:this.formInline.nickname,status:this.formInline.status,oid:this.formInline.oid,pay_at:this.formInline.pay_at,created_at:this.formInline.created_at}
        console.log(searchData)
        router.push({ path: this.$route.path, query: { keywords: searchData, page: 1 }}) 
      },
      handleCurrentChange(page) {
        let searchData={nickname:this.formInline.nickname,status:this.formInline.status,oid:this.formInline.oid,pay_at:this.formInline.pay_at,created_at:this.formInline.created_at}
        router.push({ path: this.$route.path, query: { keywords: searchData, page: page }})
      },
      getAllOrder() {
        this.loading = true
        const data = {
          params: {
            keywords: this.keywords,
            page: this.currentPage,
            limit: this.limit
          }
        }
        this.apiGet('weChat/retailOder/', data).then((res) => {
          console.log('res = ', _g.j2s(res))
          this.handelResponse(res, (data) => {
            this.tableData = data.list
            this.dataCount = data.dataCount
          })
        })
      },
      getCurrentPage() {
        let data = this.$route.query
        if (data) {
          if (data.page) {
            this.currentPage = parseInt(data.page)
          } else {
            this.currentPage = 1
          }
        }
      },
      getKeywords() {
        let data = this.$route.query
        if (data) {
          if (data.keywords) {
            this.keywords = data.keywords
          } else {
            this.keywords = ''
          }
        }
      },
      init() {
        this.getKeywords()
        this.getCurrentPage()
        this.getAllOrder()
      }
    },
    created() {
      this.init()
    },
    watch: {
      '$route' (to, from) {
        this.init()
      }
    },
    components: {
      particulars
     
    },
    mixins: [http]
  }
</script>