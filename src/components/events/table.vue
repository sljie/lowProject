<template>
<div class="name">
    <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="事件id"
      width="200">
    </el-table-column>
    <el-table-column
      prop="eventName"
      label="事件名称"
      width="230">
    </el-table-column>
    <el-table-column
      prop="gmtModified"
      label="更新时间"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="300">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click = 'editOneInfo(scope)'>编辑</el-button>
        <el-button type="warning" size="mini" @click = 'stopUseEvent(scope)' v-if='scope.row.isDisabled'>停用</el-button>
        <el-button type="warning" size="mini" @click = 'stopUseEvent(scope)' v-else>开启</el-button>
        <el-button type="danger" size="mini" @click = 'deleteOneInfo(scope)'>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top:50px"></div>
  <el-pagination
    background
    layout="total, prev, pager, next"
    :total="allPage"
:current-page.sync="clickIndex"
    @current-change = 'changeNowPage'
    :page-size = 10
  >
  </el-pagination>
</div>
</template>
<style lang="scss" scoped>
.el-pagination {
  text-align: right !important;
}
</style>
<script>
import { deleteEvent, changeStatus} from "@/server/api";
import { mapActions, mapState,mapGetters } from "vuex";
export default {
  data() {
    return {
      clickIndex: 1 //当前页码数，默认1
    };
  },
  computed: {
    //映射vuex中的公共数据到当前组建，每当数据发生改变，
    //映射数据相应改变,当前页面数据更新
    ...mapState(["events"]),
    ...mapGetters(['events']),
    
    tableData() {
      return this.events.tableList.data;
    },
    allPage() {
      return this.events.tableList.total || 0;
    },
    loading() {
      return this.events.loading;
    }
  },
  mounted() {
    this.init({ page: this.clickIndex });
  },
  methods: {
    //映射vuex 中的action
    ...mapActions(["initList","editInfoFun"]),

    /****
     *  初始化获得数据
     * *****/
    init(data = {}) {
      //方式一： 调用映射函数,但是必须在 methods 方法中将vuex的方法映射到当前组建中
      this.initList(data);
      //方式二： 直接通过store调用vuex 中公共方法
      // this.$store.dispatch("initList",data);
    },

    /****
     *  分页逻辑方法
     * ****/
    changeNowPage(pageIndex) {
      this.init({ page: pageIndex });
    },

    /***
     *  删除弹框
     * ****/
    deleteOneInfo({ row } = item) {
      let { id } = row;
      this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteEvent(id)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.init();
                this.clickIndex = 1;
              } else {
                return this.$message.error(res.errorMsg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    /****
     *  停用方法
     * ******/

    stopUseEvent({ row } = item) {
      let { isDisabled, id } = row;
      let disabled = isDisabled ? 0 : 1;
      let data = {
        id: id,
        isDisabled: disabled
      };
      changeStatus(data)
        .then(res => {
          if (res.success) {
            console.log(res);
            this.init();
            this.clickIndex = 1;
            this.$message.success("操作成功");
          } else {
            this.$message.error(res.errorMsg);
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    /******
     *  编辑方法
     * ******/
    editOneInfo({ row } = item) {
      console.log(row)
      let obj = {
        id:row.id,
        cb:this.showLog
      }
      this.editInfoFun(obj)
      // this.$emit("show-editLog", "编辑事件");
      
    },

    showLog(){
      this.$emit("show-editLog", "编辑事件");
    }
  }
};
</script>