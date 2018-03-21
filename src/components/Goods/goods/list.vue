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
  		  <i class="el-icon-plus"></i>&nbsp;&nbsp;添加商品
  		</router-link>
		</div>
		<el-table :data="tableData" style="width: 100%" @selection-change="selectItem">
			<el-table-column type="selection" :context="_self" width="50" />
			<el-table-column prop="goods_name" label="商品名称" width="150" />
			<el-table-column prop="goods_code" label="商品货号" width="150" />
			<el-table-column prop="cname" label="分类" width="150" />
			<el-table-column prop="shop_price" label="价格" width="150" />
			<el-table-column label="推荐">
				<template slot-scope="prop">
                <el-switch v-model="prop.row.is_recommend" :active-value="1" :inactive-value="0" @change="changeField(prop.row, 'is_recommend')" /> 
                </template>
			</el-table-column>
			<el-table-column label="新品">
				<template slot-scope="prop">
                <el-switch v-model="prop.row.is_new" :active-value="1" :inactive-value="0" @change="changeField(prop.row, 'is_new')" /> 
                </template>
			</el-table-column>
            <el-table-column label="热卖">
				<template slot-scope="prop">
                <el-switch v-model="prop.row.is_hot" :active-value="1" :inactive-value="0" @change="changeField(prop.row, 'is_hot')" /> 
                </template>
			</el-table-column>
            <el-table-column label="上下架">
				<template slot-scope="prop">
                <el-switch v-model="prop.row.is_on_sale" :active-value="1" :inactive-value="0" @change="changeField(prop.row, 'is_on_sale')" /> 
                </template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="prop">
					<span>
						<router-link :to="{ name: 'goodsEdit', params: { id: prop.row.id }}" class="btn-link-middle edit-btn">
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
  data:function (){
		return {
				tableData : [],
				multipleSelection: [],
				dataCount : 0,
				limit : 15,
				currentPage : null,
				formInline : {
					name :'',
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

			this.apiGet("admin/goods", data).then((res)=>{
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
		selectItem(val) {
			this.multipleSelection = val;
		},
		changeField(row, field){
			let value ;
			for(var i in row){
					if(i == field) value = row[i];
			} 

			let getBaseData = {params:{"tb":"Goods", "idf":"id", 'idv':row.id, "fd":field, 'vl':value}};
			this.apiGet("admin/base/changeTableField", getBaseData).then((res)=>{});
		},
		confirmDelete(row){
			this.$confirm('确认删除该信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading();
          this.apiDelete('admin/goods/', row.id).then((res) => {
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
  components: {
      btnGroup
  },
  mixins: [http]
}
</script>
