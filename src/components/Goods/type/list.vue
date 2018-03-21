<template>
  <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="商品名称">
				<el-input v-model="formInline.name" placeholder="商品名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="search" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="m-b-20">
  		<router-link class="btn-link-large add-btn" to="add">
  		  <i class="el-icon-plus"></i>&nbsp;&nbsp;添加类型
  		</router-link>
		</div>
		<el-table :data="tableData" style="width: 100%" @selection-change="selectItem">
			<el-table-column type="selection" :context="_self" width="50" />
			<el-table-column prop="name" label="类型名称" width="250" />
			<el-table-column label="操作">
                <template slot-scope="prop">
					<span>
						<router-link :to="{ name: 'typeEdit', params: { id: prop.row.id }}" class="btn-link-middle edit-btn">
						    编辑
						</router-link>
					</span>
                    <span>
                        <router-link :to="{ name: 'attrList', params: { type: prop.row.id }}" class="btn-link-middle add-btn">
                            属性信息
						</router-link>
                    </span>
                    <span>
                        <router-link :to="{ name: 'specList', params: { type: prop.row.id }}" class="btn-link-middle warning-btn">
                            规格信息
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
			<el-pagination
				@current-change="handleCurrentChange"
				layout="prev, pager, next"
				:page-size="limit"
				:current-page="currentPage"
				:total="dataCount">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import http from 'src/assets/js/http'
import btnGroup from 'src/components/Common/btn-group.vue'

  export default {
    data: function(){
        return{
          tableData : [],
          multipleSelection: [],
          limit:15,
          currentPage: null,
          dataCount: null,
          formInline :{
              name : ""
          },
        }
    },
    created: function() {
        this.loadData();
    },
    methods:{
        loadData(){
            const data = {
                params : {
                    n: this.formInline.name,
                    p: this.currentPage,
                    limit: this.limit
                }
            }
            
            this.apiGet("admin/type", data).then((res) => {
                _g.closeGlobalLoading();
                this.tableData = res.data.info;
                this.dataCount = res.data.count;
            });
        },
        search(){
            this.loadData();
        },
        handleCurrentChange(page){
            this.currentPage = page;
            this.loadData();
        },
        selectItem(val){
            this.multipleSelection = val;
        },
        confirmDelete(row){
            this.$confirm('确认删除该信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _g.openGlobalLoading();
                this.apiDelete('admin/type/', row.id).then((res) => {
                    _g.closeGlobalLoading();
                    this.handelResponse(res, (data) => {
                        _g.toastMsg('success', data);
                        setTimeout(() => {_g.shallowRefresh(this.$route.name)}, 1500);
                    })
                })
            }).catch(() => {
            // catch error
            })
		}
    },
    mixins : [http]
  }
</script>
