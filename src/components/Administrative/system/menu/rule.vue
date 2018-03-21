<template>
	<el-dialog :visible.sync="dialogVisible" custom-class="w-900 h-480 ovf-auto" title="节点列表">
		<div class="pos-rel h-60">
			<el-input placeholder="请输入节点名称" v-model="keyword" class="search-btn w-300">
				<el-button slot="append" icon="el-icon-search"  @click="searchMsg()"></el-button>
			</el-input>
		</div>
		<div>
			<el-table
			:data="tableData"
			stripe
			style="width: 100%">
				<el-table-column
				prop="p_title"
				label="节点名称"
				width="150">
				</el-table-column>
				<el-table-column
				prop="title"
				label="规则名称">
				</el-table-column>
				<el-table-column
				prop="name"
				label="规则标识"
				width="180">
				</el-table-column>
				<el-table-column
				label="操作"
				width="100">
        <template scope="scope">
					<div>
						<el-button size="small" @click="selectRule(scope.row)">选择</el-button>
					</div>
        </template>
				</el-table-column>
			</el-table>
		</div>
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
  import http from '../../../../assets/js/http'

  export default {
    data() {
      return {
        dialogVisible:false,
        keyword: '',
        tableData: []
      }
    },
    methods: {
      open() {
        this.dialogVisible=true
      },
      closeDialog() {
        this.dialogVisible=false
      },
      searchMsg(){
        console.log(this.keyword)
        router.push({ path: this.$route.path, query: { type:'tree' }}) 
      },
      selectRule(item) {
        setTimeout(() => {
          this.$parent.form.rule_name = item.title
          this.$parent.form.rule_id = item.id
        }, 0)
        this.closeDialog()
      },
      getRules() {
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
      let data = store.state.rules
      if (data && data.length) {
        this.tableDataShow = _(data).forEach((res) => {
          res.showInput = false
        })
        this.tableData = this.tableDataShow
      } else {
        this.getRules()
      }
    },
    mixins: [http]
  }
</script>