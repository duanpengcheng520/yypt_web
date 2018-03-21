<template>
  <el-form ref="form" :model="form" label-width="100px">
				<el-form-item  label="">
					一.此地区插件基于element-ui编写
				</el-form-item>
				<el-form-item  label="">
					二.此地区插件功能如下：1.可以查询搜索  2.可以清楚输入框内的记录
				</el-form-item>
				<el-form-item  label="所在地区：">
					<el-cascader
						:options="CityInfo"
						v-model="form.selectedOptions"
						:change-on-select="true"
						:clearable="true"
						:filterable="true"
						@change="handleChange">
					</el-cascader>
					<span>所选地区：{{form.city | myAddressCity}}{{form.erae | myAddressErae}}{{form.minerae | myAddressMinerae}}</span>
				</el-form-item>
			</el-form>
</template>

<script>
  export default {
    data() {
      return {
         /*数据源*/
		 CityInfo:'',//地区数据
		 form: {
	         	city : '',
				erae : '',
				minerae : '',
				selectedOptions: [],//地区筛选数组
        },
      }
    },
    methods: {
        getSlectData() {
            this.apiGet('admin/weChat/getRegionsJson', data).then((res) => {
            console.log('res = ', _g.j2s(res))
            this.handelResponse(res, (data) => {
                this.CityInfo = data.regions
            })
            })
        },
		handleChange(value) {
			this.form.city = this.form.selectedOptions[0];
			this.form.erae = this.form.selectedOptions[1]
			this.form.minerae = this.form.selectedOptions[2]
     	},
	},
	/*地区数据过滤器*/
	filters:{
		myAddressCity:function(value){
			for(y in this.CityInfo){
				if(this.CityInfo[y].value == value){
					return value = this.CityInfo[y].label
				}
			}
		},
		myAddressErae:function(value){
			for(y in this.CityInfo){
				for(z in this.CityInfo[y].children){
					if(this.CityInfo[y].children[z].value == value && value!=undefined){
						return value = this.CityInfo[y].children[z].label;
					}
				}
			}
		},
		myAddressMinerae:function(value){
			for(y in this.CityInfo){
				for(z in this.CityInfo[y].children){
					for(i in this.CityInfo[y].children[z].children){
						if(this.CityInfo[y].children[z].children[i].value == value && value!=undefined){
							return value = this.CityInfo[y].children[z].children[i].label
						}
					}
				}
			}
		},
    },
    
  }
</script>