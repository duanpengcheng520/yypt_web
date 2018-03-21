<template>
	<div class="m-l-50 m-t-30 w-500">
		<el-form ref="form" :model="form" label-width="130px">
			
    <el-form-item label="关键字">
        <el-input v-model="form.keys"></el-input>
    </el-form-item>
    <el-form-item label="图文标题" v-show='showTitle'>
        <el-input v-model="form.title"></el-input>
    </el-form-item>
  <el-form-item label="消息类型">
    <el-select v-model="form.type" placeholder="请选择消息类型" @change="selectkeystype">
      <el-option
      v-for="item in keys_type"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="" v-show='showImg'>
        <el-upload
          class="upload-demo"
          :limit="1"
          :action="uploadUrl"
          :on-success="uploadImgSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
			</el-form-item>
  <el-form-item label="链接地址"  v-show='showUrl'>
    <el-input v-model="form.url"></el-input>
  </el-form-item>
  <el-form-item label="内容" v-show="showContent">
    <el-input type="textarea" v-model="form.content" ></el-input>
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
        uploadUrl:'',
        isLoading: false,
        showImg:false,
        showTitle:false,
        showUrl:false,
        showContent:false,
        snapshoot: null,
        keys_type:[{
          value: 'text',
          label: '文本'
        }, {
          value: 'news',
          label: '图文'
        }, {
          value: 'image',
          label: '图片'
        }, {
          value: 'music',
          label: '音乐'
        }, {
          value: 'video',
          label: '视频'
        }],
        form: {
            keys:'',
            type:'',
            title:'',
            content: '',
            url:'',
            path_url:'',
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
      selectkeystype(value){
        console.log('ddss')
        switch (value) {
          case 'text':
            this.showImg=false
            this.showTitle=false
            this.showUrl=false
            this.showContent=true
            break
          case 'news':
            this.showImg=true
            this.showTitle=true
            this.showUrl=true
            break
          case 'image':
            this.showImg=true
            this.showTitle=false
            this.showUrl=false
            this.showContent=false
            break
          case 'music':
            this.showImg=true
            this.showTitle=false
            this.showUrl=false
            break
          case 'video':
            this.showImg=true
            this.showTitle=false
            this.showUrl=false
            break
        
          default:
            break
        }
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
          if(!this.form.keys){
            _g.toastMsg('warning', '请输入关键字')
           return
          }
 
            this.isLoading = !this.isLoading
            if (this.password) {
              this.form.password = this.password
            }
            this.apiPost('wechat/Keys',this.form).then((res) => {
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
      
      uploadImgSuccess(res, file, fileList) {
        console.log(res.data)
        this.form.path_url = res.data
        
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
      //this.getRegionsData()
    },
    mixins: [http, fomrMixin]
  }
</script>