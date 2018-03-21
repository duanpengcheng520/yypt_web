<template>
  <div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="分类名称">
				<el-input v-model="formInline.name" placeholder="分类名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="search" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="m-b-20">
  		<router-link class="btn-link-large add-btn" to="add">
  		  <i class="el-icon-plus"></i>&nbsp;&nbsp;添加分类
  		</router-link>
		</div>
		<el-table :data="tableData" style="width: 100%" @selection-change="selectItem">
			<el-table-column type="selection" :context="_self" width="50" />
			<el-table-column prop="name" label="分类名称" width="150" />
			<el-table-column prop="keyword" label="关键字" />
			<el-table-column label="推荐" ref="cls">
				<template slot-scope="prop">
        	<el-switch v-model="prop.row.is_hot" :active-value="1" :inactive-value="0" @change="changeHot(prop.row)" /> 
        </template>
			</el-table-column>
			<el-table-column label="显示">
				<template slot-scope="prop">
        	<el-switch v-model="prop.row.is_show" :active-value="1" :inactive-value="0" @change="changeShow(prop.row)" /> 
        </template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="prop">
					<span>
						<router-link :to="{ name: 'cateEdit', params: { id: prop.row.id }}" class="btn-link-middle edit-btn">
						编辑
						</router-link>
					</span>
					<span>
						<el-button size="small" type="danger" @click="confirmDelete(prop.row)">
						删除
						</el-button>
					</span>
				</template>
			</el-table-column>
		</el-table>
		<div class="pos-rel p-t-20">
			<btnGroup :selectedData="multipleSelection" :type="'category'"></btnGroup>
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
import btnGroup from 'src/components/Common/btn-group.vue'

export default {
  data:function (){
		return {
				tableData : [],
				multipleSelection: [],
				dataCount: null,
				currentPage: null,
				limit: 15,
				formInline : {
					name : '',
				},
		}
  },
  created:function (){
		this.loadData();
	},
  methods:{
		loadData(){
			const data = {
          params: {
            n: this.formInline.name,
            p: this.currentPage,
            limit: this.limit
          }
			}

			this.apiGet("admin/category", data).then((res)=>{
					_g.closeGlobalLoading();
					
					this.tableData = res.data.info;
					this.dataCount = res.data.count;
			});
		},
		search(){
			this.loadData();
		},
		handleCurrentChange(page) {
			this.currentPage = page;
			this.loadData();
    },
		selectItem(val) {
			this.multipleSelection = val;
		},
		changeHot(row){
			let getBaseData = {params:{"tb":"GoodsCategory", "idf":"id", 'idv':row.id, "fd":"is_hot", 'vl':row.is_hot}};
			this.apiGet("admin/base/changeTableField", getBaseData).then((res)=>{});
		},
		changeShow(row){
			let getBaseData = {params:{"tb":"GoodsCategory", "idf":"id", 'idv':row.id, "fd":"is_show", 'vl':row.is_show}};
			this.apiGet("admin/base/changeTableField", getBaseData).then((res)=>{});
		},
		confirmDelete(row){
			this.$confirm('确认删除该信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading();
          this.apiDelete('admin/category/', row.id).then((res) => {
            _g.closeGlobalLoading();
            this.handelResponse(res, (data) => {
              _g.toastMsg('success', '删除成功');
              setTimeout(() => {_g.shallowRefresh(this.$route.name)}, 1500);
            })
          })
        }).catch(() => {
          // catch error
        })
		}
  },
	mixins: [http],
	components: {
		btnGroup
	}
}
</script>
