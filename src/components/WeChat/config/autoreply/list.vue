<template>
  <div>       <div class="m-b-20 ovf-hd">

                <div class="fl" >
                  <router-link class="btn-link-large add-btn" to="add">
                    <i class="el-icon-plus"></i>&nbsp;&nbsp;添加关键词
                  </router-link>
                </div>
              </div>   
                <el-table
                :data="tableData"
                style="width: 100%"
                border
                :row-class-name="tableRowClassName">
                    <el-table-column label="序号" type="index" width="50">
                </el-table-column>
                        <el-table-column
                        prop="keys"
                        label="关键词"
                width="300">
                        </el-table-column>
                <el-table-column
                label="类型" width="100">
                  <template scope="scope">
                    <div>
                        {{ scope.row.type | keys_type }}
                    </div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="content"
                label="回复内容">
                </el-table-column>
                <el-table-column
                label="状态"
                width="100">
                    <template scope="scope">
                    <div>
                        {{ scope.row.status | status }}
                    </div>
                    </template>
                </el-table-column>     
                <el-table-column
                label="操作"
                width="230">
                    <template scope="scope">
                    <div>
                        <span>
                        <el-button  type="primary" size="mini" @click="openParticulars(scope.row)">编辑</el-button>
                        </span>
                        <span>
                        <el-button  type="primary" size="mini" @click="keysStatus(scope.row)">{{scope.row.status?'停用':'启用'}}</el-button>
                        </span>
                        <span v-if="scope.row.status==0">
                        <el-button  type="primary" size="mini" @click="del(scope.row)">删除</el-button>
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
        limit: 15

      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab.name);
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
      keysStatus(row){
        
        let status=1
        if(row.status){
          status=0
        }
        this.$confirm('确认改变关键字状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading()
          this.apiGet('weChat/keysStatus', {params:{id:row.id,status:status}}).then((res) => {
            _g.closeGlobalLoading()
            this.handelResponse(res, (data) => {
              _g.toastMsg('success', data)
              setTimeout(() => {
                _g.shallowRefresh(this.$route.name)
              }, 1500)
            })
          })
        }).catch(() => {
          // catch error
        })


      },
      del(row){
        this.$confirm('确认删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading()
          this.apiGet('keys/del/', {params:{id:row.id}}).then((res) => {
            _g.closeGlobalLoading()
            this.handelResponse(res, (data) => {
              _g.toastMsg('success', '删除成功')
              setTimeout(() => {
                _g.shallowRefresh(this.$route.name)
              }, 1500)
            })
          })
        }).catch(() => {
          // catch error
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
        this.apiGet('weChat/Keys/', data).then((res) => {
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