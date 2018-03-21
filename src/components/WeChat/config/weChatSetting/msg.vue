<template>
<div>
<el-dialog :visible.sync="dialogVisible" custom-class="w-650 h-310 ovf-auto"  center>
  <el-form class="demo-table-expand">
          <el-form-item label="URL(服务器地址):">
            <span>{{rowData.url}}</span>
          </el-form-item>
          <el-form-item label="Token(令牌):">
            <span>{{rowData.token}}</span>
          </el-form-item>
          <el-form-item label="EncodingAESKey(消息加解密密钥):">
            <span>{{rowData.encodingaeskey}}</span>
          </el-form-item>
    </el-form>
</el-dialog>
</div>
</template>
<script>
export default {
  data(){
      return {
            dialogVisible:false,
      }
  },
  methods: {
      open() {
        this.dialogVisible=true
      },
      closeDialog() {
        this.dialogVisible=false
      },    
  },
  props:["rowData"],

}
</script>

