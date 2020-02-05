<template>
<div>
    <div class="con">
        
        <div class="left-nav">
            <div class="fun-title">
                <span>标签分类</span>
                <i class="el-icon-edit-outline" @click='editLabel'></i>
            </div>
            <el-tree
            node-key="id"
                :default-expanded-keys="[label.selectLeftTreeId]"
                :props="props1"
                :data="data1"
                highlight-current
                
                @node-click="handleNodeClick"
                @node-contextmenu = 'rightShow'
                
                
            >
            </el-tree>
        </div>
        
    </div>
    <ul id="right-menu">  
        <li v-for='item in rightMenuList' 
        :key = 'item.id'
        @click="doSomes(item)"
        >{{item.do}}</li>  
        
    </ul>

    <!-- 关联弹框 -->

    <el-dialog :title= 'clickInfo.tagCategoryName+"及子项关联事件"' :visible.sync="dialogFormVisible"center>
      <el-form :model="form">
        <el-form-item label-width="235px">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.eventName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSelectEvent">确 定</el-button>
      </div>
    </el-dialog>



</div>
</template>
<style lang="scss" scoped>
#right-menu {
  width: 54px;
  background: white;
  text-align: center;
  border: 1px solid #ccc;
  padding: 0;
  font-size: 14px;
  position: absolute;
  display: none;
  li {
    list-style-type: none;
    cursor: pointer;
    &:hover {
      background: #e6a23c;
      color: white;
    }
  }
}
.con {
  display: flex;
  .left-nav {
    flex: 1;
    // height: 100%;
    .fun-title {
      position: relative;
      background: #d7d7d7;
      height: 40px;
      line-height: 40px;
      > span {
        font-weight: 500;
        margin-left: 10px;
      }
      > i {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
</style>
<script>
import { addEvent } from "@/server/api";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      rightMenuList: [
        // {
        //   id: "1",
        //   do: "添加"
        // },
        // {
        //   id: "2",
        //   do: "编辑"
        // },
        // {
        //   id: "3",
        //   do: "删除"
        // },
        {
          id: "4",
          do: "关联"
        }
      ],
      props1: {
        label: "tagCategoryName",
        children: "childTagConfigModels",
        id: "id"
      },
      clickInfo: {}, //记录选中id
      dialogFormVisible: false,
      form: {
        region: ""
      }
    };
  },

  computed: {
    ...mapState(["label","events"]),
    ...mapGetters(["label","events"]),
    data1() {
      return this.label.treeInfo;
    },
    options() {
      return this.events.selectList.data;
    }
  },

  mounted() {
    // if(this.label.selectLeftTreeId){
    this.init(true);
    // }else{

    //   eBus.register('saveId', function(data) {
    // 		debugger
    //   })
    // }
  },
  methods: {
    ...mapActions(["getTreeInfo", "clickTreeNode", "getLabelInfo"]),

    /*****
     *  初始化参数通用方法
     * ****/
    init(bol) {
      this.getTreeInfo(bol);
    },

    handleNodeClick(data) {
      let ul = document.getElementById("right-menu");
      ul.style.display = "none";
      console.log(data);
      this.clickTreeNode(data.id);
      let dataInfo = {
        tagName: this.label.labelSearchName || "",
        startTime: this.label.searchTime[0] || "",
        endTime: this.label.searchTime[1] || "",
        eventId: this.label.selectEvent || "",
        tagCategoryId: data.id
      };
      this.getLabelInfo(dataInfo);
      this.clickInfo = data;
    },
    rightShow(data) {
      //   let isFirstClick = false; //点击右键是否第一次走这个方法
      //   if (isFirstClick) {
      //     return isFirstClick = true;
      //   }
      console.log(data);
      let ul = document.getElementById("right-menu");
      if (this.clickInfo.id) {
        document.querySelector(".left-nav").oncontextmenu = function(ev) {
          var ev = ev || window.event;
          var l = ev.clientX;
          var t = ev.clientY;
          ul.style.display = "block";
          ul.style.left = l + 15 + "px";
          ul.style.top = t - 16 + "px";
          return false;
        };
        this.removeMouseRight(ul);
      } else {
        this.$message({
          message: "请先左键点击某一节点，再右键操作！",
          type: "warning"
        });
      }
    },

    /******
     *    屏蔽浏览器右键默认事件
     * ******/
    removeMouseRight(ul) {
      document.onclick = function() {
        ul.style.display = "none";
      };
    },

    /******
     *  右键菜单栏方法
     * *********/
    doSomes({ id } = item) {
      switch (Number(id)) {
        case 1:
          console.log("添加");
          break;
        case 2:
          console.log("编辑");
          break;
        case 3:
          console.log("删除");
          this.deleteInfo();
          break;
        case 4:
          console.log("关联");
          this.dialogFormVisible = true
          break;
        default:
          break;
      }
    },

    /*****
     *  关联事件保存方法
     * *******/
    saveSelectEvent(){
      if(!this.form.region){
        return this.$message({
          message: "请先选择所需关联事件",
          type: "warning"
        });
      }
      let data = {
        categoryId:this.clickInfo.id,
        eventId:this.form.region
      };
      addEvent(data)
        .then(res => {
          if (res.success) {
            console.log(res);
            this.dialogFormVisible = false;
            let dataInfo = {
              tagName: this.label.labelSearchName || "",
              startTime: this.label.searchTime[0] || "",
              endTime: this.label.searchTime[1] || "",
              eventId: this.label.selectEvent || "",
              tagCategoryId: data.categoryId
            };
            this.getLabelInfo(dataInfo);

          } else {
            this.$message.error(res.errorMsg);
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
      
    },

    /****
     *  删除方法
     * *****/
    deleteInfo() {
      this.$confirm("此操作将永久删除该条及子项记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    /*******
     *  顶部修改方法
     * *******/
    editLabel() {
      console.log(1111111);
      this.$emit("show-left-add");
    }
  }
};
</script>