<template>
  <div>
		<div class="m-b-20">
  		<router-link class="btn-link-large add-btn" to="../infoAttr">
  		  <i class="el-icon-plus"></i>&nbsp;&nbsp;添加属性
  		</router-link>
        <el-button @click="goback()">返回</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%" @selection-change="selectItem">
			<el-table-column type="selection" :context="_self" width="50" />
			<el-table-column prop="name" label="属性名称" width="250" />
			<el-table-column prop="tname" label="模型名称" width="250" />
            <el-table-column label="属性值（单/多）">
                <template slot-scope="prop">
                    <span class="font-success" v-if="prop.row.attr_type == 0">
                        <b>唯一属性</b>
                    </span> 
                    <span class="font-warning" v-else-if="prop.row.attr_type == 1">    
                        <b>单一属性</b>
                    </span>
                    <span class="font-warning" v-else>    
                        <b>多选属性</b>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="属性值的输入方式">
                <template slot-scope="prop">
                    <span class="font-success" v-if="prop.row.input_type == 0">
                        <b>手工录入</b>
                    </span>
                    <span class="font-primary" v-else-if="prop.row.input_type == 1">
                        <b>从列表中选择</b>
                    </span>
                    <span class="font-danger" v-else>
                        <b>多行文本框</b>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="values" label="可选值" />
            <el-table-column label="是否检索">
                <template slot-scope="prop">
                    <el-switch v-model="prop.row.attr_index" :active-value="1" :inactive-value="0" @change="changeIndex(prop.row)" /> 
                </template>
            </el-table-column>
			<el-table-column label="操作">
				<template slot-scope="prop">
					<span>
						<router-link :to="{ name: 'attrEdit', params: { id: prop.row.id }}" class="btn-link-middle edit-btn">
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
        this.apiGet("admin/type/attribute?type="+this.$route.params.type).then((res) => {
            _g.closeGlobalLoading();
            this.tableData = res.data;
        });
    },
    methods:{
        selectItem(val){
            this.multipleSelection = val;
        },
        changeIndex(row){
            let getBaseData = {params:{"tb":"GoodsAttribute", "idf":"id", 'idv':row.id, "fd":"attr_index", 'vl':row.attr_index}};
			this.apiGet("admin/base/changeTableField", getBaseData).then((res)=>{});
        },
        confirmDelete(row){
            console.info(row)
            this.$confirm('确认删除该信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _g.openGlobalLoading();
                this.apiGet('admin/type/deleteAttr?id='+row.id).then((res) => {
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
