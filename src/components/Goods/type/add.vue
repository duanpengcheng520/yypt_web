  <template>
    <div class="m-l-50 m-t-30 w-500">
		<el-form ref="form" :model="form" label-width="110px">
			<el-form-item label="品牌名称" prop="name">
				<el-input v-model.trim="form.name" class="h-40 w-200"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="save('form')">提交</el-button>
				<el-button @click="goback()">返回</el-button>
			</el-form-item>
		</el-form>
	</div>   
  </template>
  <script>
  import http from '../../../assets/js/http'
  import fomrMixin from '../../../assets/js/form_com'

  export default {
    data() {
        return {
            form:{
                id: '',
                name : '',
            }
        }
    },
    created() {
        _g.closeGlobalLoading();
    },
    methods:{
        save(){
            this.apiPost("admin/type", this.form).then((res)=>{
                this.handelResponse(res, (data) => {
                    _g.toastMsg('success', '修改成功');
                    setTimeout(this.goback(), 1500);
                })
            });
        }
    },
    mixins: [http, fomrMixin]
  }
  </script>
