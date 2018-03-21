<template>
  <div>
		<div class="m-b-20">
  		<router-link class="btn-link-large add-btn" to="../infoSpec">
  		  <i class="el-icon-plus"></i>&nbsp;&nbsp;添加规格
  		</router-link>
        <el-button @click="goback()">返回</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%" @selection-change="selectItem">
			<el-table-column type="selection" :context="_self" width="50" />
			<el-table-column prop="name" label="规格名称" width="250" />
			<el-table-column prop="tname" label="模型名称" width="250" />
            <el-table-column prop="spec_values" label="规格项" />
            <el-table-column label="是否检索">
                <template slot-scope="prop">
                    <el-switch v-model="prop.row.spec_index" :active-value="1" :inactive-value="0" @change="changeIndex(prop.row)" /> 
                </template>
            </el-table-column>
			<el-table-column label="操作">
				<template slot-scope="prop">
					<span>
						<router-link :to="{ name: 'specEdit', params: { id: prop.row.id }}" class="btn-link-middle edit-btn">
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
			
		</div>
	</div>
</template>
<script>
  import http from '../../../assets/js/http'
  import fomrMixin from '../../../assets/js/form_com'

  export default {
    data: function(){
        return{
          tableData : [],
          multipleSelection: [],
        }
    },
    created: function() {
        this.apiGet("admin/type/spec?type="+this.$route.params.type).then((res) => {
            _g.closeGlobalLoading();
            this.tableData = res.data;
        });
    },
    methods:{
        selectItem(val){
            this.multipleSelection = val;
        },
        changeIndex(row){
            let getBaseData = {params:{"tb":"Spec", "idf":"id", 'idv':row.id, "fd":"spec_index", 'vl':row.spec_index}};
			this.apiGet("admin/base/changeTableField", getBaseData).then((res)=>{});
        },
        confirmDelete(row){
            this.$confirm('确认删除该信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _g.openGlobalLoading();
                this.apiGet('admin/type/deleteSpec?id='+row.id).then((res) => {
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
    mixins : [http, fomrMixin]
  }
</script>
