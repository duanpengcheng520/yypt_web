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
                <el-select v-model="pid_1" placeholder="上级分类" :change="changeParent()">
                    <el-option 
                        v-for="value in parent"
                        :key="value.id"
                        :label="value.name"
                        :value="value.id"
                    >
                    </el-option>
                </el-select>
                <el-select v-model="pid_2" placeholder="选择商品分类" >
                    <el-option 
                        v-for="value in cate"
                        :key="value.id"
                        :label="value.name"
                        :value="value.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="品牌Logo">
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
        lv:[],
        cate : [],
        pid_1 : '',
        pid_2 : '',
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
      
      this.apiGet("admin/category/"+ this.$route.params.id).then((res)=>{
          _g.closeGlobalLoading();
        this.form = res.data.info;
        this.parent = res.data.parent;
        this.lv = res.data.lv;
        this.cate = res.data.cate;

        if(this.form.image != '' && this.form.image != null){
            this.imageUrl = window.HOST + this.form.image;
            this.fileList.push({name:'image', url:this.imageUrl});
        } 
        
        // 判定pid1是否有值
        for (let i = 0; i < this.parent.length; i++) {
            const element = this.parent[i];
            if(this.lv && typeof(this.lv[2]) != "undefined" && this.lv[1] == element.id){
                this.pid_1 = element.id;
                this.temp = element.id;
            }
        }

        // 判定pid2是否有值
        for (let i = 0; i < this.cate.length; i++) {
            const element = this.cate[i];
            if(this.lv && typeof(this.lv[3]) != "undefined" && this.lv[2] == element.id ){
                this.pid_2 = element.id;
            }
        }

      });
    },
    changeParent(){
        let pms = {params : {"id":this.pid_1}};
        if(this.temp != this.pid_1){
            this.apiGet("admin/category/parent", pms).then((res)=>{
                this.pid_2 = '';
                this.cate = res.data;
                this.temp = this.pid_1;
            });
        }
    },
    removeImage(file){
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
        this.form.pid_1 = this.pid_1;
        this.form.pid_2 = this.pid_2;
        this.apiPost('admin/category', this.form).then((res) => {
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
