<template>
  <el-table :data="attrTable">
        <el-table-column label="商品属性" prop="show" width="120px" />
        <el-table-column>
            <div slot-scope="prop">
                <el-input v-if="prop.row.input == 2" type="textarea" v-model="prop.row.value" style="margin-top: 5px;">
                </el-input>
                <el-select v-else-if="prop.row.input == 1" v-model="prop.row.value">
                    <el-option 
                        v-for="(value, item) in prop.row.index_value"
                        :key="item"
                        :label="value"
                        :value="value"
                    />
                </el-select>
                <el-input v-else v-model.trim="prop.row.value" class="h-40 w-200"/>
            </div>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    data() {
        return {
            table : this.attrTable,
        }
    },
    props : ['attrTable'],
}
</script>

