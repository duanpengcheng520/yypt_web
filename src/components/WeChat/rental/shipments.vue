<template>
	<div class="m-l-50 m-t-30 w-500">
		<el-form ref="form" :model="form" label-width="130px">
			

  <el-form-item label="仓库">
    <el-select v-model="form.region_id" placeholder="请选择发货仓库">
      <el-option
      v-for="item in region"
      :key="item.region_id"
      :label="item.region_name"
      :value="item.region_id">
    </el-option>
      
    </el-select>
  </el-form-item>
  <el-form-item label="主板编号">
    <el-input v-model="form.uuid"></el-input>
  </el-form-item>
  
  <el-form-item label="发货方式">
    <el-radio-group v-model="form.resource" @change="readio">
      <el-radio label="0">自行发货</el-radio>
      <el-radio label="1">物流发货</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="物流公司"  v-show='showFlag'>
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="物流单号" v-show="showFlag" >
    <el-input v-model="form.number"></el-input>
  </el-form-item>
  <el-form-item label="备注">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
		
			<el-form-item>
				<el-button type="primary" @click="add()" :loading="isLoading">提交</el-button>
				<el-button @click="goback()">返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<style>

</style>
<script>
  import http from 'src/assets/js/http'
  import fomrMixin from 'src/assets/js/form_com'

  export default {
    data() {
      return {
        isLoading: false,
        showFlag:false,
        snapshoot: null,
        type:'rent',
        region:[],
        form: {
          uuid: '',
          region_id:'',
          sku_id:'',
          order_id:'',
          order_type:'RentalOrder',
          number:'',
          name:'',
          remark: '',
          radio: '0'
        },
      
      }
    },
    methods: {
      
      readio(value){
        if(value==1){
          this.showFlag=true          
        }else{
          this.showFlag=false
        }
        console.log(value)
      },
      add() {
        // _(this.groupOptions).forEach((res) => {
        //   console.log(this.selectedGroups.toString().indexOf(res.else))
        //   if (this.selectedGroups.toString().indexOf(res.else) > -1) {
        //     this.selectedIds.push(res.id)
        //   }
        // })
        // console.log('groupOptions = ', _g.j2s(this.groupOptions))
        // console.log('selectedGroups = ', _g.j2s(this.selectedGroups))
        // console.log('selectedIds = ', _g.j2s(this.selectedIds))
          if(!this.form.uuid){
            _g.toastMsg('warning', '请输入主板编号')
           return
          }
    console.log(this.opvue)
            this.isLoading = !this.isLoading
            if (this.password) {
              this.form.password = this.password
            }
            this.apiPost('weChat/inventories/shipments',this.form).then((res) => {
              this.handelResponse(res, (data) => {
                _g.toastMsg('success', data)
                setTimeout(() => {
                  this.goback()
                }, 1500)
              }, () => {
                this.isLoading = !this.isLoading
              })
            })
         
      },
      getAllGroups() {
        return new Promise((resolve, reject) => {
          let data = store.state.userGroups
          if (data && data.length) {
            resolve(data)
          } else {
            this.apiGet('admin/groups').then((res) => {
              console.log('groups = ', _g.j2s(res))
              this.handelResponse(res, (data) => {
                resolve(data)
              })
            })
          }
        })
      },
      getAllOrgs() {
        this.apiGet('admin/structures').then((res) => {
          this.handelResponse(res, (data) => {
            this.orgsOptions = data
          })
        })
      },
      async getRegionsData() {
       const data = {
          params: {
            type: this.type,
            sku_id: this.snapshoot.sku_id
          }
        }
        this.apiGet('weChat/inventories/regions',data).then((res) => {
          console.log('res = ', _g.j2s(res))
          this.handelResponse(res, (data) => {
            this.region = data.region

          })
        })
      }
    },
    created() {
      let param=this.$route.params.param
      this.form.order_id = param.orderid
      this.snapshoot=_g.s2j(param.st)
      this.form.sku_id=this.snapshoot.sku_id
      console.log(this.form.order_id)
      this.getRegionsData()
    },
    mixins: [http, fomrMixin]
  }
</script>