<template>
	<div class="m-l-50 m-t-30 w-500">
		<el-form ref="form" :model="form" label-width="110px">
			<el-form-item label="品牌名称" prop="name">
				<el-input v-model.trim="form.name" class="h-40 w-200"></el-input>
			</el-form-item>
			<el-form-item label="品牌网址">
				<el-input v-model.trim="form.url" class="h-40 w-200"></el-input>
			</el-form-item>
            <el-form-item label="上级分类" ref="cls" style="width:600px;">
              <template v-if="parent">
                <el-select v-model="form.parent_cat_id" placeholder="顶级分类" :change="changeParent()">
                    <el-option 
                        v-for="value in parent"
                        :key="value.id"
                        :label="value.name"
                        :value="value.id"
                    >
                    </el-option>
                </el-select>
              </template>
              <template v-if="cate">
                <el-select v-model="form.cat_id" placeholder="选择商品分类" >
                    <el-option 
                        v-for="value in cate"
                        :key="value.id"
                        :label="value.name"
                        :value="value.id"
                    >
                    </el-option>
                </el-select>
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
            <el-form-item label="描述">
              <el-input type="textarea" v-model="form.desc"></el-input>
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
            url:'',
            desc:'',
            sort:50,
            logo:'',
            parent_cat_id:'',
            cat_id:'',
        },
        parent : [],
        cate : [],
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
      
      this.apiGet("admin/brand/"+ this.$route.params.id).then((res)=>{
        _g.closeGlobalLoading();
        this.form = res.data.info;
        this.parent = res.data.parent;
        this.cate = res.data.cate;

        if(this.form.logo != '' && this.form.logo != null){
            this.imageUrl = window.HOST + this.form.logo;
            this.fileList.push({name:'logo', url:this.imageUrl});
        } 
        
        // 判定pid1是否有值
        for (let i = 0; i < this.parent.length; i++) {
            const element = this.parent[i];
            if(this.lv && typeof(this.lv[2]) != "undefined" && this.lv[1] == element.id){
                this.form.parent_cat_id = element.id;
                this.temp = element.id;
            }
        }

        // 判定pid2是否有值
        for (let i = 0; i < this.cate.length; i++) {
            const element = this.cate[i];
            if(this.lv && typeof(this.lv[3]) != "undefined" && this.lv[2] == element.id ){
                this.form.cat_id = element.id;
            }
        }

      });
    },
    changeParent(){
        let pms = {params : {"id":this.form.parent_cat_id}};
        if(this.temp != this.form.parent_cat_id){
            this.apiGet("admin/category/parent", pms).then((res)=>{
                this.form.cat_id = '';
                this.cate = res.data;
                this.temp = this.form.parent_cat_id;
            });
        }
    },
    removeImage(file){
        let pms = {params : {"path":this.form.logo}};
        this.apiGet("admin/upload/remove", pms).then((res)=>{
            this.imageUrl = '';
            this.form.logo = '';
        });
    },
    uploadImage(res){
        if(res.data){
            this.form.logo = res.data;
            this.imageUrl = window.HOST + res.data;
        }
    },
    save(){
        console.info(this.form);
        this.apiPost('admin/brand', this.form).then((res) => {
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
