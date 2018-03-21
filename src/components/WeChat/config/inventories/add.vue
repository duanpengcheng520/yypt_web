<template>
  <el-form ref="form" :model="form" label-width="100px">

				<el-form-item  label="所在地区：">
					<el-cascader ref="cascader"
						:options="regionsData"
						v-model="form.selectedOptions"
						:change-on-select="true"
						:clearable="true"
						:filterable="true"
						@active-item-change="handleChange">
					</el-cascader>
				
				</el-form-item>
			</el-form>
</template>

<script>
import http from 'src/assets/js/http'

 export default {
    data() {
      return {
         /*数据源*/
		 regionsData:[],//地区数据
     cityData:[],
     countyData:[],
     cid:0,
		 form: {
	      city : '',
				erae : '',
				minerae : '',
				selectedOptions: [],//地区筛选数组
        },
      }
    },
    methods: {
        getChildrenData(value) {
          console.log(value)
          value=value[0]
         // console.log(value)

          // this.apiGet('admin/weChat/regions',{params: {pid:value}}).then((res) => {
          //           this.handelResponse(res, (data) => {
          //               console.log( data.regions)
          //               data=data.regions
          //               let cindex=0
          //               if(data[0]['type']=='City'){
          //                 console.log(data)
          //                 cindex=this.searchIndex(this.regionsData,value)
          //                 this.regionsData[cindex]['children']=data
          //                 this.cityData=data
          //               }else if(data[0]['type']=='County'){
          //                 this.cityData[this.searchIndex(this.cityData,value)]['children']=data
          //                 this.regionsData[cindex]['children']=this.cityData
          //               }else{
                            
          //               }

          //               //console.log(cindex)
                        
          //             //this.setCityData()
          //           //this.CityData =  data.province
                    
          //           })
          //       })
                
        },
      getCityData(pid){
        
        this.apiGet('admin/weChat/regions',{params: {pid:pid}}).then((res) => {
                    this.handelResponse(res, (data) => {
                        console.log( data.regions)
                        data=data.regions
                        let cindex=0
                        if(data[0]['type']=='City'){
                          console.log(data)
                          cindex=this.searchIndex(this.regionsData,value)
                          this.regionsData[cindex]['children']=data
                          this.cityData=data
                        }else if(data[0]['type']=='County'){
                          this.cityData[this.searchIndex(this.cityData,value)]['children']=data
                          this.regionsData[cindex]['children']=this.cityData
                        }else{
                            
                        }

                        //console.log(cindex)
                        
                      //this.setCityData()
                    //this.CityData =  data.province
                    
                    })
                })
                

      },
      searchIndex(data,value){
         for (let i = 0; i < data.length; i++) {
                            if(value==data[i]['value']){
                              
                              return i
                            }
                        }
      },
      handleChange(value) {
        this.getChildrenData(value)
        console.log(value);
        this.form.city = this.form.selectedOptions[0]
        this.form.erae = this.form.selectedOptions[1]
        this.form.minerae = this.form.selectedOptions[2]
        //this.getSlectData()
        },
	},
	
	created() {
      
                this.apiGet('admin/weChat/regions').then((res) => {
                    this.handelResponse(res, (data) => {
                        console.log( data.regions)
                    this.regionsData =  data.regions
                    
                    })
                })
	},
	
	
		props:["cty"],
		mixins: [http]
    
  }
</script>