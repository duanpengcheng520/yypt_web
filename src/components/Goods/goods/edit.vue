<template>
    <el-form ref="form" :model="form">
        <el-tabs type="border-card">
        <el-tab-pane label="通用信息">
            <el-form-item label="商品名称" label-width="110px">
                <el-input v-model.trim="form.goods_name" class="h-40 w-400"/>
            </el-form-item>
            <el-form-item label="商品关键词" label-width="110px">
                <el-input v-model="form.keywords" class="h-40 w-300"/>
            </el-form-item>
            <el-form-item label="商品简介" label-width="110px">
                <el-input type="textarea" v-model.trim="form.goods_remark" class="h-80 w-700"/>
            </el-form-item>
            <el-form-item label="商品货号" label-width="110px">
                <el-input v-model.trim="form.goods_code" class="h-40 w-200"/>
            </el-form-item>
            <el-form-item label="商品分类" label-width="110px">
                <el-select v-model="pid_1" placeholder="上级分类" :visible-change="changeParent()">
                    <el-option 
                        v-for="item in parent"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
                <el-select v-model="pid_2" placeholder="选择商品分类" :visible-change="changeOption()">
                    <el-option 
                        v-for="item in cate1"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
                <el-select v-model="pid_3" placeholder="选择商品分类" >
                    <el-option 
                        v-for="item in cate2"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="商品品牌" label-width="110px">
                <el-select v-model="form.brand_id" placeholder="请选择品牌">
                    <el-option 
                        v-for="value in brands"
                        :key="value.id"
                        :label="value.name"
                        :value="value.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="本店售价" label-width="110px">
                <el-input v-model.trim="form.shop_price" class="h-40 w-200"/>
            </el-form-item>
            <el-form-item label="市场售价" label-width="110px">
                <el-input v-model.trim="form.market_price" class="h-40 w-200"/>
            </el-form-item>
            <el-form-item label="成本价" label-width="110px">
                <el-input v-model.trim="form.cost_price" class="h-40 w-200"/>
            </el-form-item>
            <el-form-item label="佣金" label-width="110px">
                <el-input v-model.trim="form.commission" class="h-40 w-200"/>
            </el-form-item>
            <el-form-item label="图片" label-width="110px">
                <el-input v-model.trim="form.image" class="h-40 w-200"/>
            </el-form-item>
            <el-form-item label="商品重量" label-width="110px">
                <el-input v-model.trim="form.weight" class="h-40 w-200"/>
            </el-form-item>
            <el-form-item label="是否包邮" label-width="110px">
                <el-input v-model.trim="form.is_free_shipping" class="h-40 w-200"/>
            </el-form-item>
            <el-form-item label="库存" label-width="110px">
                <el-input v-model.trim="form.store_count" class="h-40 w-200"/>
            </el-form-item>
            <el-form-item label="赠送积分" label-width="110px">
                <el-input v-model.trim="form.give_integral" class="h-40 w-200"/>
            </el-form-item>
            <el-form-item label="兑换积分" label-width="110px">
                <el-input v-model.trim="form.exchange_integral" class="h-40 w-200"/>
            </el-form-item>
            <el-form-item label="商品详细描述" label-width="110px">
                <tinymce :height=400 ref="editor" v-model="form.goods_content"></tinymce>
            </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品相册">
            <upload :image-list="imageList" @on-change-image="onChangeImage"></upload>
        </el-tab-pane>
        <el-tab-pane label="商品模型" label-width="110px">
            <el-form-item label="商品模型">
                <el-select v-model="form.goods_type" placeholder="请选择模型" @change="changeType()">
                    <el-option key="0" label="无模型" value="0">无模型</el-option>
                    <el-option 
                        v-for="value in types"
                        :key="value.id"
                        :label="value.name"
                        :value="value.id"
                    />
                </el-select>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="16">  
                    <specbtn :spec-table="specTable" @on-change="onChange"></specbtn>
                </el-col>
                <el-col :span="8">
                    <attrbtn :attr-table="attrTable"></attrbtn>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="16" style="margin-top:10px;">
                    <el-table :data="column.infos" border>
                        <el-table-column v-for="(item, index) in column.names" :key="index" :label="item">
                            <template slot-scope="prop">
                                {{prop.row.names[index]}}
                            </template>
                        </el-table-column>
                        <el-table-column label="价格">
                            <template slot-scope="prop">
                                <el-input v-model="prop.row.price" placeholder="请输入价格" />
                            </template>
                        </el-table-column>
                        <el-table-column label="SKU">
                            <template slot-scope="prop">
                                <el-input v-model="prop.row.sku" placeholder="请输入SKU" />
                            </template>
                        </el-table-column>
                        <el-table-column label="库存">
                            <template slot-scope="prop">
                                <el-input v-model="prop.row.store_count" placeholder="请输入库存" />
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>

        <el-form-item style="margin-top: 20px;">
            <el-button type="primary" @click="save('form')">提交</el-button>
            <el-button @click="goback()">返回</el-button>
        </el-form-item>
    </el-form>    
</template>

<script>
import http from 'src/assets/js/http'
import fomrMixin from 'src/assets/js/form_com'
import specbtn from './specbtn.vue'
import attrbtn from './attrbtn.vue'
import upload from './uploadimages.vue'
import tinymce from 'src/components/Common/Tinymce'

export default {
    data(){
        return {
            form :{
                id : '',
                goods_name : '',
                keywords : '',
                goods_code : '',
                goods_remark : '',
                pid_1 : '',
                pid_2 : '',
                pid_3 : '',
                brand_id : '',
                shop_price : '',
                market_price : '',
                cost_price : '',
                commission : '',
                original_img : '',
                weight : '',
                is_free_shipping : '',
                store_count : '',
                give_integral : '',
                exchange_integral : '',
                goods_content : '',
                goods_type : '',
                spec : [],
                attr : [],
                imgs : [],
            },
            pid_1 : '',
            pid_2 : '',
            pid_3 : '',
            parent : [],
            cate1 : [],
            cate2 : [],
            brands : [],
            types : [],
            lv : [],
            temp : {
                pid_1 : '',
                pid_2 : '',
                type : '',
            },
            specTable : [],
            attrTable : [],
            column : {},
            imageList : [],
        }
    },
    created(){
        this.initGoods();
    },
    components : {
        "specbtn" : specbtn,
        "attrbtn" : attrbtn,
        "upload"  : upload,
        "tinymce" : tinymce,
    },
    mounted(){
        
    },
    methods : {
        initGoods(){
            this.apiGet("/admin/goods/" + this.$route.params.id).then((res) => {
                _g.closeGlobalLoading();
                this.form = res.data.info;
                this.parent = res.data.parent;
                this.cate1 = res.data.cate1;
                this.cate2 = res.data.cate2;
                this.lv = res.data.lv;
                this.brands = res.data.brands;
                this.types = res.data.types;
                this.attrTable = res.data.attr;
                this.temp.type = this.form.goods_type;
                this.imageList = res.data.imgs;

                // 判定pid1是否有值
                for (let i = 0; i < this.parent.length; i++) {
                    const element = this.parent[i];
                    if(this.lv && typeof(this.lv[1]) != "undefined" && this.lv[1] == element.id){
                        this.pid_1 = element.id;
                        this.temp.pid_1 = element.id;
                    }
                }

                // 判定pid2是否有值
                for (let i = 0; i < this.cate1.length; i++) {
                    const element = this.cate1[i];
                    if(this.lv && typeof(this.lv[2]) != "undefined" && this.lv[2] == element.id ){
                        this.pid_2 = element.id;
                        this.temp.pid_2 = element.id;
                    }
                }

                // 判定pid3是否有值
                for (let i = 0; i < this.cate2.length; i++) {
                    const element = this.cate2[i];
                    if(this.lv && typeof(this.lv[3]) != "undefined" && this.lv[3] == element.id ){
                        this.pid_3 = element.id;
                    }
                }

                // 整合规格数据
                for (let i = 0; i < res.data.spec.length; i++) {
                    const element = res.data.spec[i];
                    for (let j = 0; j < element.child.length; j++) {
                        const child = element.child[j];
                        child.pindex = i;
                        child.isClick = (typeof(child.isClick) != "undefined")? child.isClick:"default";
                    }
                }

                this.specTable = res.data.spec;
                this.column.infos = res.data.colinfo;
                this.column.names = res.data.column;
            });
        },
        changeParent(){
            let pms = {params : {"id":this.pid_1}};
            if(this.temp.pid_1 != this.pid_1){
                this.apiGet("admin/category/parent", pms).then((res)=>{
                    this.pid_2 = '';
                    this.pid_3 = '';
                    this.cate1 = res.data;
                    this.temp.pid_1 = this.pid_1;
                });
            }
        },
        changeOption(){
            let pms = {params : {"id":this.pid_2}};
            if(this.temp.pid_2 != this.pid_2){
                this.apiGet("admin/category/parent", pms).then((res)=>{
                    this.pid_3 = '';
                    this.cate2 = res.data;
                    this.temp.pid_2 = this.pid_2;
                });
            }
        },
        changeType(){
            let pms = {params : {"id":this.form.goods_type}};
            if(this.form.goods_type != this.temp.type){
                this.apiGet("admin/type/type", pms).then((res) => {
                    this.temp.type = this.form.goods_type;
                    if(this.form.goods_type == 0) this.column = {}; // 子主件清空信息

                    for (let i = 0; i < res.data.spec.length; i++) {
                        const element = res.data.spec[i];
                        for (let j = 0; j < element.child.length; j++) {
                            const child = element.child[j];
                            child.isClick = "default";
                            child.pindex = i;
                        }
                    }

                    this.attrTable = res.data.attr;
                    this.specTable = res.data.spec;
                });
            }
        },
        onChangeImage(imageList){
            this.imageList = imageList;
        },
        onChange(column){
            this.column = column;
        },
        save(){
            this.form.attr = this.attrTable;
            this.form.spec = this.column.infos;
            this.form.imgs = this.imageList;
            this.form.pid_1 = this.pid_1;
            this.form.pid_2 = this.pid_2;
            this.form.pid_3 = this.pid_3;
            this.apiPost('admin/goods', this.form).then((res) => {
                this.handelResponse(res, (data) => {
                    _g.toastMsg('success', '保存成功');
                    setTimeout(this.goback(), 1500);
                })
            });
        }
    },
    mixins : [http, fomrMixin]
}
</script>
