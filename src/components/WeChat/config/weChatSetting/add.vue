<template>
	<div class="m-l-50 m-t-30 w-800">
		<el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-form-item label="公众号名称：" prop="name">
				<el-input v-model.trim="form.name" class="h-40 w-200"></el-input>
			</el-form-item>
      <el-form-item label="类型：" prop="type">
				<el-radio-group v-model="form.type">
          <el-radio :label="1">普通订阅号</el-radio>
          <el-radio :label="2">认证订阅号</el-radio>
          <el-radio :label="3">普通服务号</el-radio>
          <el-radio :label="4">认证服务号</el-radio>
        </el-radio-group>
			</el-form-item>
			<el-form-item label="公众号AppId："  prop="appid">
				<el-input v-model.trim="form.appid" class="h-40 w-200"></el-input>
			</el-form-item>
      <el-form-item label="公众号AppSecret：" label-width="160px" prop="appsecret">
				<el-input v-model.trim="form.appsecret" class="h-40 w-200"></el-input>
			</el-form-item>
      <el-form-item label="原始ID："  prop="origin_id">
				<el-input v-model.trim="form.origin_id" class="h-40 w-200"></el-input>
			</el-form-item>
      <el-form-item label="微信号：" label-width="160px" prop="wechat_number">
				<el-input v-model.trim="form.wechat_number" class="h-40 w-200"></el-input>
			</el-form-item>
			<el-form-item label="LOGO:">
        <el-upload
          class="upload-demo"
          :limit="1"
          :action="uploadUrl"
          :on-success="uploadLogoSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
			</el-form-item>
      <el-form-item label="二维码:">
        <el-upload
          class="upload-demo"
          :limit="1"
          :action="uploadUrl"
          :on-success="uploadQrCodeSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
			</el-form-item>
      <el-form-item label="状态：">
				<el-radio-group v-model="form.status">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="2">关闭</el-radio>
        </el-radio-group>
			</el-form-item>
      <el-form-item label="关闭回复：">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
			<el-form-item>
				<el-button type="primary" @click="add()" :loading="isLoading">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
  import http from 'src/assets/js/http'
  import fomrMixin from 'src/assets/js/form_com'

  export default {
    data() {
      return {
        isLoading: false,
        fileList:[],
        uploadUrl:'',
        form: {
          appid: '',
          appsecret: '',
          name:'',
          type:1,
          origin_id:'',
          wechat_number:'',
          logo:'',
          qrcode:'',
          status:1,
          desc:''
        },
        rules: {
          appid: [
            { required: true, message: '请输入公众号AppId' }
          ],
          appsecret: [
            { required: true, message: '请输入公众号AppSecret' }
          ],
          name: [
            { required: true, message: '请输入公众号名称' }
          ],
          origin_id:[{required: true, message: '请输入原始ID'}],
          wechat_number:[{required: true, message: '请输入微信号'}],
        }
      }
    },
    methods: {
      add() {
        this.$refs.form.validate((pass) => {
          if (pass) {
            this.isLoading = !this.isLoading
            this.apiPost('weChatSetting/saveWeChat', this.form).then((res) => {
              this.handelResponse(res, (data) => {
                _g.toastMsg('success', '设置成功')
                _g.clearVuex('setSaveWeChat')
                setTimeout(() => {
                  this.goback()
                }, 1500)
              }, () => {
                this.isLoading = !this.isLoading
              })
            })
          }
        })
      },
      uploadQrCodeSuccess(res, file, fileList) {
        console.log(res.data)
        this.form.qrcode = res.data
        
      },
      uploadLogoSuccess(res, file, fileList) {
        console.log(res.data)
        this.form.logo = res.data
        
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
      
     
    },
    created() {
      this.uploadUrl = window.HOST + 'admin/upload'
      _g.closeGlobalLoading()
      // this.apiPost('admin/base/getConfigs').then((res) => {
      //   this.handelResponse(res, (data) => {
      //     this.form.SYSTEM_NAME = data.SYSTEM_NAME
      //     this.form.IDENTIFYING_CODE = data.IDENTIFYING_CODE
      //     this.form.LOGIN_SESSION_VALID = data.LOGIN_SESSION_VALID
      //     this.form.LOGO_TYPE = data.LOGO_TYPE
      //     if (data.SYSTEM_LOGO) {
      //       let img = window.HOST + data.SYSTEM_LOGO
      //       this.fileList.push({ name: '图片', url: img })
      //       this.form.SYSTEM_LOGO = data.SYSTEM_LOGO
      //     }
      //   })
      // })
     
    },
    components: {
      
    },
    mixins: [http,fomrMixin]
  }
</script>