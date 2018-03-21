<template>
  <div>
      <div class="m-b-20 ovf-hd">

			<div class="fl">
				<el-button  type="primary" size="mini" @click="addback()">移入黑名单</el-button>
                <el-button  type="primary" size="mini" @click="syncFans()">同步粉丝</el-button>
			</div>
		</div>     
        <el-table
            :data="tableData"
            style="width: 100%"
            border
            @selection-change="selectItem"
            :row-class-name="tableRowClassName">
            <el-table-column
			type="selection"
			width="50">
			</el-table-column>
            <el-table-column label="序号" type="index" width="50">
            </el-table-column>
                    <el-table-column
                    prop="nickname"
                    label="用户昵称"
            width="300">
                    </el-table-column>
            <el-table-column
            label="性别" width="100">
                <template scope="scope">
                <div>
                    {{ scope.row.sex | sex }}
                </div>
                </template>
            </el-table-column>
            <el-table-column
            prop="content"
            label="标签">
            </el-table-column>
            <el-table-column
            label="区域">
                <template scope="scope">
                <div>
                    {{ scope.row.country+scope.row.province+scope.row.city }}
                </div>
                </template>
            </el-table-column>
            <el-table-column
            prop="subscribe_at"
            label="关注时间"
            width="200">
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
  </div>
</template>
<script>
import http from 'src/assets/js/http'
  export default {
    data() {
      return {
        activeName: 'text',
        tableData:[],
        dataCount: null,
        currentPage: null,
        limit: 15,
        multipleSelection: [],

      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab.name);
      },
      selectItem(val) {
        this.multipleSelection = val
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
      syncFans(){
          this.apiGet('weChat/sync/').then((res) => {
          console.log('res = ', _g.j2s(res))
          this.handelResponse(res, (data) => {
              _g.toastMsg('success',data)
              this.init()
          })
        })
      },
      addback() {
        if (!this.selectedData.length) {
          _g.toastMsg('warning', '请勾选数据')
          return
        }
       
        let url = 'weChat/backAdd'
        let data = {
          ids: this.getSelectedIds()
        }
        this.apiPost(url, data).then((res) => {
          this.handelResponse(res, (data) => {
            _g.toastMsg('success', res.data)
            setTimeout(() => {
              _g.shallowRefresh(this.$route.name)
            }, 1500)
          }, () => {
            
          })
        })
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
        this.apiGet('weChat/Fans/', data).then((res) => {
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
    watch: {
      '$route' (to, from) {
        this.init()
      }
    },
    
    components: {
     // btnGroup
     
    },
    mixins: [http]
  };
</script>