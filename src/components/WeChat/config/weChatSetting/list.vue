<template>
<div>
    <div class="m-b-20 ovf-hd">

			<div class="fl" v-show="addShow">
				<router-link class="btn-link-large add-btn" to="add">
					<i class="el-icon-plus"></i>&nbsp;&nbsp;添加公众号
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
        label="公众号信息">
            <template slot-scope="scope">
                
                <div class="logo-left">
                    <img v-bind:src="url + scope.row.logo">
                </div>
                
                <div class="logo-right">
                        <p class="p1">{{ scope.row.name }}</p>
                        <p class="p2">类型：{{ scope.row.type | weChat_type }}</p>
                </div>
                
            </template>
        </el-table-column>          
        <el-table-column
        label="状态"
        width="150">
            <template slot-scope="scope">
            <div>
                {{ scope.row.status | wc_status }}
            </div>
            </template>
        </el-table-column>     
        <el-table-column
        label="操作"
        width="360">
            <template slot-scope="scope">
            <div>
                <span>
                <el-button  type="primary" size="mini" @click="openEdit(scope.row)">编辑</el-button>
                </span>
                <span>
                <el-button  type="primary" size="mini" @click="showMsg(scope.row)">接入信息</el-button>
                </span>
                <span v-if="scope.row.status==1">
                <el-button  type="primary" size="mini" @click="confirmDelete(scope.row)">删除</el-button>
                </span>
            </div>
            </template>
        </el-table-column>
    </el-table>
    <editDialog ref="edit"></editDialog>
    <msgDialog ref="msg" :row-data="rowData"></msgDialog>
</div>    
</template>
<style>
.logo-left {
    float: left;
    display: block;
}
.logo-left img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
}
.logo-right {
    float: left;
    display: block;
    margin-left: 8px;
    height: 60px;
    line-height: 10px;
}
.logo-right p {
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}
img {
    border: none;
}
</style>

<script>
import editDialog from './edit.vue'
import msgDialog from './msg.vue'
import http from 'src/assets/js/http'
 export default {
    data() {
      return {
        keywords:'',
        tableData: [],
        dataCount: null,
        currentPage: null,
        limit: 15,
        url : window.HOST,
        rowData:[]

      }
    },
    methods: {
      dateFormat:function(row,column) {  
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
      search() {
      let searchData={nickname:this.formInline.nickname,status:this.formInline.status,oid:this.formInline.oid,pay_at:this.formInline.pay_at,created_at:this.formInline.created_at}
      console.log(searchData)
         router.push({ path: this.$route.path, query: { keywords: searchData, page: 1 }}) 
      },
      handleCurrentChange(page) {
        let searchData={nickname:this.formInline.nickname,status:this.formInline.status,oid:this.formInline.oid,pay_at:this.formInline.pay_at,created_at:this.formInline.created_at}
        router.push({ path: this.$route.path, query: { keywords: searchData, page: page }})
      },
      openEdit(row){
        console.log(row.logo)
        this.$refs.edit.form.id=row.id
        this.$refs.edit.form.name=row.name
        this.$refs.edit.form.type=row.type
        this.$refs.edit.form.appid=row.appid
        this.$refs.edit.form.appsecret=row.appsecret
        this.$refs.edit.form.origin_id=row.origin_id
        this.$refs.edit.form.wechat_number=row.wechat_number
        if (row.logo) {
            let img = window.HOST + row.logo
            this.$refs.edit.logoFileList=[{ name: '图片', url: img }]
            this.$refs.edit.form.logo=row.logo
          }
        if (row.qrcode) {
          let img = window.HOST + row.qrcode
          this.$refs.edit.codeFileList=[{ name: '图片', url: img }]
          this.$refs.edit.form.qrcode=row.qrcode
        }
        this.$refs.edit.form.status=row.status
        this.$refs.edit.form.desc=row.desc
        this.$refs.edit.open()
      },
      showMsg(row){
        console.log(row)
        this.rowData=row;
        this.$refs.msg.open()
      },
      confirmDelete(row) {
        this.$confirm('确认删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading()
          this.apiGet('weChatSetting/del/', {params:{id:row.id}}).then((res) => {
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
      getAllOder() {
        this.loading = true
        const data = {
          params: {
            keywords: this.keywords,
            page: this.currentPage,
            limit: this.limit
          }
        }
        this.apiGet('weChatSetting/list/', data).then((res) => {
         // console.log('res = ', _g.j2s(res))
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
        this.getAllOder()
      }
    },
    created() {
      this.init()
    },
    computed: {
      addShow() {
        return _g.getHasRule('wechat-save')
      },
      editShow() {
        return _g.getHasRule('wechat-update')
      },
      deleteShow() {
        return _g.getHasRule('wechat-delete')
      }
    },
    watch: {
      '$route' (to, from) {
        this.init()
      }
    },
    components: {
    editDialog,msgDialog
     
    },
    mixins: [http]
  }
</script>