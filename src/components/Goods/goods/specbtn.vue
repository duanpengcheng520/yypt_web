<template>
    <el-table :data="specTable">
        <el-table-column label="商品规格" prop="name" width="120px" >
        </el-table-column>
        <el-table-column>
            <div slot-scope="prop">
                <div style="float:left; margin-right:20px;" v-for="(item, index) in prop.row.child" :key="item.id">
                    <el-button :type="item.isClick" ref="btn" @click="createTable(item, index)" round>{{item.item}}</el-button>
                </div>
            </div>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
  data(){
      return {
          spec : this.specTable,
          column : {},
      }
  },
  props : ['specTable'],
  methods : {
      createTable(item, index){
          let px = item.pindex;
          if(this.specTable[px].child[index].isClick == "default"){
              this.specTable[px].child[index].isClick = "success";
          }else{
              this.specTable[px].child[index].isClick = "default";
          }

          this.getSpecInfoSuccess();
      },
      getSpecInfoSuccess(){
          var columns = [];
          var column_name = [];
          var retrunData = {};
          for (let i = 0; i < this.specTable.length; i++) {
              const el = this.specTable[i];
              
              for (let j = 0; j < el.child.length; j++) {
                  var info = {};
                  const element = el.child[j];
                  if(element.isClick == "success"){
                    info.id = element.id;
                    info.pid = el.id;
                    info.column = el.name;
                    info.name = element.item;

                    var found = false;
			
                    for(var k = 0; k < columns.length; k++){
                        var col = columns[k];
                        if(col.pid == info.pid){
                            found = true;
                            col.count++;
                            col.infos.push(info);
                        }
                    }
                    
                    if(!found){
                        var col_info = {};
                        col_info.pid = info.pid;
                        col_info.count = 1;
                        col_info.column = info.column;
                        col_info.infos = [info];
                        columns.push(col_info);
                    }
                  } 
              }
          }
          
          if(columns.length > 0){
              columns.sort(this.compare('count'));
              var column_name = this.getColumnName(columns);   // 按照顺序得到列名
              columns = this.setColumn(columns);

              retrunData = {infos : columns, names : column_name};
          }else{
              retrunData = {infos : columns, names : column_name};
          }

          this.$emit("on-change", retrunData);
      },
      getColumnName(columns){
          var names = [];
          for (let i = 0; i < columns.length; i++) {
              const info = columns[i];
              names.push(info.column);
          }
          return names;
      },
      compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
      },
      contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
      },
      setColumn(columns){
          var column = [];

          for (let i = 0; i < columns.length; i++) {
              column = this.addColumns(column,  columns[i]);
          }

        return column;  
      },
      addColumns(parent, child){
        var columns = [];

        if(parent.length > 0){
            for (var j = 0; j < parent.length; j++) {
                var pel = parent[j];

                for (var i = 0; i < child.infos.length; i++) {
                    var cel = child.infos[i];
                    var ids = (typeof(pel.key) != "undefied")?pel.key.split("_"):[];
                    var col_name = cel.column + ":" + cel.name;
                    var names = [];

                    names = names.concat(pel.names);

                    ids.push(cel.id);
                    ids.sort(function(a,b){return a-b});    // 排序id
                    names.push(cel.name);

                    var obj = {key:ids.join("_"), key_name: pel.col_name + " " + col_name, names : names};

                    columns.push(obj);
                }
            }
        }else{
            for (let i = 0; i < child.infos.length; i++) {
                var cel = child.infos[i];
                var id = cel.id;
                var col_name = cel.column + ":" + cel.name;
                
                var obj = {key:[id].join("_"), col_name : col_name, names: [cel.name]};
                columns.push(obj);
            }
        }

        return columns;
      }

  },
}
</script>

