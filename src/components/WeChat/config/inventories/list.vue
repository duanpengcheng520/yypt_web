
<template>
<div>
<!-- <div class="m-b-20 ovf-hd">
      <div class="fl" v-show="addShow">
        <router-link class="btn-link-large add-btn" to="add">
          <i class="el-icon-plus"></i>&nbsp;&nbsp;添加用户
        </router-link>
      </div>
      <div class="fl w-200 m-l-30">
        <el-input placeholder="请输入用户名" v-model="keywords">
          <el-button slot="append" icon="search" @click="search()"></el-button>
        </el-input>
      </div>
    </div> -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
 
  <el-form-item label="商品">
    <el-input v-model="formInline.goods_name" placeholder="商品"></el-input>
  </el-form-item>
  <el-form-item label="仓库">
    <el-input v-model="formInline.region_name" placeholder="仓库"></el-input>
  </el-form-item>
  <el-form-item label="商品状态">
    <el-select v-model="formInline.status" placeholder="请选择">
        <el-option
          v-for="item in formInline.options"
          :key="item.status"
          :label="item.label"
          :value="item.status">
        </el-option>
    </el-select>
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
			prop="goods_name"
			label="商品"
      width="190">
			</el-table-column>
      <el-table-column
      prop="sell"
      label="销售库存"
      width="100">
      </el-table-column>
      <el-table-column
      label="租赁库存"
      prop="rent"
      width="125">
      </el-table-column>
      <el-table-column
      label="原价"
      prop="original_price">
      </el-table-column>
      <el-table-column
      label="市场价"
      prop="current_price">
      </el-table-column>
      <el-table-column
      label="商品状态">
       <template scope="scope">
          <div>
            {{ scope.row.status | order_status }}
          </div>
        </template>
      </el-table-column>
			<el-table-column
      label="仓库"
      prop="region_name">
      </el-table-column>
      <el-table-column
      label="操作"
      width="160">
        <template scope="scope">
          <div>
            <span>
              <el-button  type="primary" size="mini" @click="openEdit(scope.row)">编辑</el-button>
            </span>
        
          </div>
        </template>
      </el-table-column>
		</el-table>
    <div class="pos-rel p-t-20">
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
  <editDialog ref="edit" ></editDialog>
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
import http from 'src/assets/js/http'
import editDialog from './edit'
 export default {
    data() {
      return {
       formInline: {      
          goods_name:'',
          region_name:'',
          rowData:[]

        },
        tableData: [],
        excelName:'租赁订单',
        dataCount: null,
        currentPage: null,
        limit: 15

      }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 0) {
          return 'success-row';
        } else if (rowIndex%3 === 0) {
          return 'warning-row';
        }
        return '';
      },
      openEdit(row){
        console.log(row)
        this.$refs.edit.goods_name=row.goods_name
        this.$refs.edit.form.id=row.id
        this.$refs.edit.form.sell=row.sell
        this.$refs.edit.form.rent=row.rent
        this.$refs.edit.open()
      },
      search() {
        let searchData={goods_name:this.formInline.goods_name,status:this.formInline.status,region_name:this.formInline.region_name}
        console.log(searchData)
        router.push({ path: this.$route.path, query: { keywords: searchData, page: 1 }}) 
      },
      
      handleCurrentChange(page) {
        let searchData={goods_name:this.formInline.goods_name,status:this.formInline.status,region_name:this.formInline.region_name}
        router.push({ path: this.$route.path, query: { keywords: searchData, page: page }})
      },
    
      getAllInventories() {
        this.loading = true
        const data = {
          params: {
            keywords: this.keywords,
            page: this.currentPage,
            limit: this.limit
          }
        }
        this.apiGet('weChat/inventories/', data).then((res) => {
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
        this.getAllInventories()
       
      }
    },
    created() {
      this.init()
    },
    computed: {
      
    },
    watch: {
      '$route' (to, from) {
        this.init()
      }
    },
    
    components: {
     editDialog
     // btnGroup
     
    },
    mixins: [http]
  }
</script>