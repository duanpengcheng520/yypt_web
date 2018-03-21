<template>
	<div class="m-l-50 m-t-30 w-500">
		<el-form ref="form" :model="form" label-width="110px">
			<el-form-item label="分类名称" prop="name">
				<el-input v-model.trim="form.name" class="h-40 w-200"></el-input>
			</el-form-item>
			<el-form-item label="关键字">
				<el-input v-model.trim="form.keyword" class="h-40 w-200"></el-input>
			</el-form-item>
            <el-form-item label="上级分类" ref="cls" style="width:600px;">
              <template v-if="parent">
                <el-select v-model="form.pid_1" placeholder="顶级分类" :change="changeParent()">
                    <el-option 
                        v-for="value in parent"
                        :key="value.id"
                        :label="value.name"
                        :value="value.id"
                    >
                    </el-option>
                </el-select>
              </template>
              <template v-else>  
                  <el-select v-model="form.pid_1" placeholder="顶级分类" @change="changeParent()" />
              </template>
              <template v-if="cate">
                <el-select v-model="form.pid_2" placeholder="选择商品分类" >
                    <el-option 
                        v-for="value in cate"
                        :key="value.id"
                        :label="value.name"
                        :value="value.id"
                    >
                    </el-option>
                </el-select>
              </template>
              <template v-else>
                  <el-select v-model="form.pid_2" placeholder="选择商品分类" />
              </template> 
            </el-form-item>
            <el-form-item label="分类图片">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :on-success="uploadImage"
                    :on-remove="removeImage"
                    :file-list="fileList"
                >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
			</el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="排序">
				<el-input v-model.trim="form.sort" class="h-40 w-200"></el-input>
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
        form : {
            id: '',
            name:'',
            keyword:'',
            description:'',
            sort:50,
            image:'',
            pid_1:'',
            pid_2:'',
        },
        parent : [],
        lv : [],
        temp : 0,
        uploadUrl: '',
        imageUrl: '',
        fileList:[],
    }
  },
  created(){
    this.initGategory();
  },
  methods:{
    initGategory(){
      this.uploadUrl = window.HOST + 'admin/upload/index';
      this.apiGet("admin/category/0").then((res)=>{
        _g.closeGlobalLoading();
        this.parent = res.data.parent;
      });
    },
    changeParent(){
        let pms = {params : {"id":this.form.pid_1}};
        if(this.temp != this.form.pid_1){
            this.apiGet("admin/category/parent", pms).then((res)=>{
                this.form.pid_2 = '';
                this.cate = res.data;
                this.temp = this.form.pid_1;
            });
        }
    },
    removeImage(){
        let pms = {params : {"path":this.form.image}};
        this.apiGet("admin/upload/remove", pms).then((res)=>{
            this.imageUrl = '';
            this.form.image = '';
        });
    },
    uploadImage(res){
        if(res.data){
            this.form.image = res.data;
            this.imageUrl = window.HOST + res.data;
        }
    },
    save(){
        this.apiPost('admin/category', this.form).then((res) => {
            this.handelResponse(res, (data) => {
                _g.toastMsg('success', '添加成功');
                setTimeout(this.goback(), 1500);
            })
        });
    }
  },
  mixins: [http, fomrMixin]
}
</script>
