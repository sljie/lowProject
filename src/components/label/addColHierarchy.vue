<template>
<div class="name">
  <!-- 外层dialog -->
  <el-dialog title='标签分类' :visible.sync="outerVisible" >
    <div >
        <el-tree
            :props="props1"
            :data="data1"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                <el-button
                    v-if='node.level===5?false:true'
                    type="text"
                    size="mini"
                    @click="() => append(data)">
                    新增分类
                </el-button>
                <el-button
                    type="text"
                    size="mini"
                    @click="() => eidtName(node, data)">
                    编辑
                </el-button>
                <el-button
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)">
                    删除
                </el-button>
                </span>
            </span>
        </el-tree>
        <el-button
            type="primary"
            size="mini"
            @click="() => append({},true)">
            新增顶层分类
        </el-button>
    </div>
    
    <!-- 内层dialog -->
    <el-dialog
      width="30%"
      :title="innerTitle"
      :visible.sync="innerVisible"
      append-to-body>
      <span>类别名称：</span>
      <el-input v-model="classifyName" placeholder="请输入类别名称"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerAddLabel">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="30%"
      title="温馨提示"
      :visible.sync="warmShow"
      center
      append-to-body>
      <span>将删除当前项及子项！</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="warmShow = false">取 消</el-button>
        <el-button type="primary" @click="deleteFun">删除</el-button>
      </div>
    </el-dialog>


  </el-dialog>


 


  

</div>
</template>
<style lang="scss" scoped>
.innerCol {
  width: 18%;
  border: 1px solid #ccc;
  text-align: center;
  //   padding: 10px 0;
  .level {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  .labelName {
    margin-top: 10px;
  }
  .add-second-class {
    margin-top: 10px;
    color: #008fff;
    cursor: pointer;
  }
}
.add-next-class {
  color: #008fff;
  cursor: pointer;
  height: 22px;
}
.pointer {
  cursor: pointer;
}
.bg-color {
  background: #ccc;
}
</style>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { addChild, editDom, deleteDom } from "@/server/api";
import constants from "@/js/constants";
import * as types from "@/store/mutation-types";
let id = 1000;
export default {
  props: {
    showLeft: Boolean
  },
  watch: {
    showLeft(curVal, oldVal) {
      this.outerVisible = curVal;
      console.log(this.outerVisible);
    },
    outerVisible() {
      if (!this.outerVisible) {
        this.closeDiaLeft();
        
      }
    }
  },
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      innerTitle: "新增",
      classifyName: "",
      addData: {},
      editArr: [], //记录修改数组
      editIndex: "", //记录修改数组的索引
      editId: null, //记录修改数组的id
      isAddOut: false, //是否新增顶层，默认false
      props1: {
        label: "tagCategoryName",
        children: "childTagConfigModels",
        id: "id",
        level:'level'
      },
      warmShow:false,  //确认删除框字段
      deleteId:null,     //记录删除Id
      isClicking:false
    };
  },

  computed: {
    ...mapState(["label"]),
    ...mapGetters(['label']),
    data1() {
      return this.label.treeInfo;
    }
  },
  mounted() {},
  methods: {
    //isOut 判断是否增加顶层
    append(data, isOut) {
      this.innerTitle = "新增";
      this.innerVisible = true;
      if(data){
        this.addData = data;
      }
      this.classifyName = "";
      this.isAddOut = isOut;
    },

    remove(node, data) {
      console.log(data.id);
      this.deleteId = data.id;
      this.warmShow = true;
    },

    eidtName(node, data) {
      this.innerTitle = "修改";
      this.classifyName = data.tagCategoryName;
      this.innerVisible = true;
      this.editId = data.id;
    },

    closeDiaLeft() {
      this.$emit("close-left");
    },
   

    /*****
     *  内层增加标签保存方法
     * ******/
    innerAddLabel() {
      let data = this.addData;
      if (!this.classifyName) {
        return this.$message.error("请输入类别名称");
      }
      let data1 = {
        parentCategoryId: this.isAddOut ? 0 : data.id,
        tagCategoryName: this.classifyName,
        level:this.isAddOut ? 1:data.level
      };

      if (this.innerTitle === "新增") {
        this.addFun(data1);
      } else {
        this.editFun({
          id: this.editId,
          tagCategoryName: this.classifyName,
          level:data.level
        });
      }
      
    },

    /*******
     *  调用新增接口方法
     * ******/
    addFun(data1) {
      if(!this.isClikcing){
        this.isClikcing = true;
        addChild(data1)
        .then(res => {
          this.isClikcing = false;
          if (res.success) {
            console.log(res);
            this.innerVisible = false;
            this.classifyName = "";
            this.$store.dispatch("getTreeInfo");
            this.$message.success("操作成功");
          } else {
            this.$message.error(res.errorMsg);
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
      
    },

    /*****
     *  调用编辑接口方法
     * *******/
    editFun(data) {
      if(!this.isClicking){
        this.isClicking = true;
        editDom(data)
        .then(res => {
          this.isClick = false;
          if (res.success) {
            console.log(res);
            this.innerVisible = false;
            this.classifyName = "";
            this.$store.dispatch("getTreeInfo");
            this.$message.success("修改成功");
          } else {
            this.$message.error(res.errorMsg);
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
      
    },

    /******
     *  调用删除方法
     * ******/
    deleteFun() {
      deleteDom(this.deleteId)
        .then(res => {
          if (res.success) {
            console.log(res);
            this.$store.dispatch("getTreeInfo");
            this.$message.success("删除成功");
            this.warmShow = false;
          } else {
            this.$message.error(res.errorMsg);
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    
  }
};
</script>