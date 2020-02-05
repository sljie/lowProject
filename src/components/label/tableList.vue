<template>
<div class="name">
    <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      fixed
      prop="tagName"
      label="标签"
      width="200">
    </el-table-column>
    
    <el-table-column
      prop="eventName"
      label="行为"
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
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top:50px"></div>
  <el-pagination
    background
    layout="total, prev, pager, next"
    :total='getAllPage'
    
    @current-change = 'changeNowPage'
    :page-size = 10
    :current-page.sync="clickIndex"
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
import { deleteEvent, labelChangeStatus } from "@/server/api";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      clickIndex: 1
    };
  },
  computed: {
    ...mapState(["label"]),
    ...mapGetters(["label"]),
    tableData() {
      return this.label.labelList.data;
    },
    getAllPage() {
      return this.label.labelList.total || 0;
    },
    loading() {
      return this.label.loading;
    }
  },
  mounted() {
    // this.init();
  },
  methods: {
    ...mapActions(["getLabelInfo", "saveOldEditInfo"]),
    /*****
     *  页面初始化方法
     * ******/
    init(data = {}) {
      this.getLabelInfo(data);
    },

    /****
     *  分页逻辑方法
     * ****/
    changeNowPage(pageIndex) {
      let data = {
        tagName: this.label.labelSearchName || "",
        startTime: this.label.searchTime[0] || "",
        endTime: this.label.searchTime[1] || "",
        eventId: this.label.selectEvent || "",
        page: pageIndex,
        tagCategoryId: this.label.selectLeftTreeId
      };
      this.clickIndex = pageIndex;
      this.getLabelInfo(data);
      console.log(pageIndex);
    },

    /****
     *  停用方法
     * ******/

    stopUseEvent({ row } = item) {
      console.log(row);
      let { isDisabled, id } = row;
      let disabled = isDisabled ? 0 : 1;
      let data = {
        id: id,
        isDisabled: disabled
      };
      labelChangeStatus(data)
        .then(res => {
          if (res.success) {
            let data1 = {
              tagName: this.label.labelSearchName || "",
              startTime: this.label.searchTime[0] || "",
              endTime: this.label.searchTime[1] || "",
              eventId: this.label.selectEvent || "",
              tagCategoryId: this.label.selectLeftTreeId
              // page : this.clickIndex
            };
            this.init(data1);
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
      console.log("停用");
    },
    /******
     *  编辑方法
     * ******/
    editOneInfo({ row } = item) {
      console.log(row);
      this.$emit("show-editLog", "编辑事件");
      this.saveOldEditInfo(row);
    },
    handleSelectionChange(v) {
      console.log(v);
      console.log(this);
      this.$store.dispatch("changeSelectData", v);
    }
  }
};
</script>