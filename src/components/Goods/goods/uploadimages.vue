<template>
    <div>
        <el-upload
            type="drag"
            list-type="picture-card"
            :action="imageUpload"
            :on-preview="handlePictureCardPreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :file-list="imageList"
            >
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
    </div>
</template>

<script>
  import http from 'src/assets/js/http'

  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        imageUpload: '',
      };
    },
    created(){
        this.imageUpload = window.HOST + 'admin/upload/index';
    },
    methods: {
      handleRemove(file, fileList) {
        let pms = {params : {"path":file.path}};
        this.apiGet("admin/upload/remove", pms).then((res)=>{
            var arr = this.handleFileList(fileList);
            this.$emit('on-change-image', arr);
        });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(res, file, fileList){
        var arr = this.handleFileList(fileList);
        this.$emit('on-change-image', arr);
      },
      handleFileList(fileList){
        var arr = [];

        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i];

          var path = '';
          if(typeof file.response != "undefined"){
            path = file.response.data;
          }else{
            path = file.path;
          }

          var obj = {name : file.name, url : window.HOST + path, path : path};
          arr.push(obj);
        }

        return arr;
      },
    },
    props: ["imageList"],
    mixins : [http] 
  }
</script>