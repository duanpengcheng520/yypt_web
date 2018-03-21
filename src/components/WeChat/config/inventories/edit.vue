<template>
   <el-dialog :visible.sync="dialogVisible" custom-class="w-900 h-380 ovf-auto" title="编辑库存" >
		<el-form ref="form" :model="form">
            <el-row>{{goods_name}}</el-row>
    <el-form-item label="销售库存" :label-width="formLabelWidth">
      <el-input v-model="form.sell" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="租赁库存" :label-width="formLabelWidth">
      <el-input v-model="form.rent" auto-complete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="save" :loading="isLoading" >保存</el-button>
  </div>
            
	</el-dialog>
</template>
<script>
import http from 'src/assets/js/http'
import fomrMixin from '../../../../assets/js/form_com'
export default {
  data(){
      return{
          loading: false,
          goods_name:'',
          form:{
              sell:'',
              rent:'',
              id:null
          },
          dialogVisible:false,
          formLabelWidth: '80px',
          content:'2332'
      }
  },
  methods:{
      open() {
        this.dialogVisible=true
      },
      closeDialog() {
        this.dialogVisible=false
      },
      save(){
        if (!this.form.sell) {
          _g.toastMsg('warning', '请输入销售库存')
          return
        }
        if (!this.form.rent) {
          _g.toastMsg('warning', '请输入租赁库存')
          return
        }   
        console.log('res = ', _g.j2s(this.form))
       
          
            this.isLoading = !this.isLoading
            this.apiPut('weChat/inventories/',this.form.id,this.form).then((res) => {
              this.handelResponse(res, (data) => {
                _g.toastMsg('success', '添加成功')
                this.closeDialog()
                _g.shallowRefresh(this.$route.name)
                
              }, () => {
                this.isLoading = !this.isLoading
              })
            })
          
       
      }
  },
  created() {
    //   this.form.sell=this.rowData.sell
    //   this.form.rent=this.rowData.rent
    //   this.form.id=this.rowData.id
      //this.init()
    },
    // watch: {
    //   '$route' (to, from) {
    //     this.init()
    //   }
    // },
  components: {  },
 
  mixins:[http,fomrMixin]
}
</script>
