<template>
<div class="right-container">
    <el-row :gutter="20">
        <el-col :span="6">
            <el-input v-model="labelSearchName" placeholder="标签"></el-input>
        </el-col>
        <el-col :span="1.5" style = 'margin-top:7px'>
            更新时间
        </el-col>  
        <el-col :span="8.5">
            <el-date-picker
            v-model="searchTime"
            type="datetimerange"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </el-col>
        <el-col :span="6" v-if='false'>
            <el-select v-model="selectEvent" placeholder="请选择事件">
                <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.eventName"
                :value="item.id">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="2" class="m-5">
            <el-button type="primary" @click='searchInfo' size="medium">搜索</el-button>
        </el-col>

        <el-col :span="2" class="m-5">
            <el-button type="danger" size="medium" @click='batchDelete'>删除</el-button>
        </el-col>
       
        
        <el-col :span="2" class="m-5">
            <el-button type="warning" size="medium" @click="exportExl">导出</el-button>
        </el-col>
        <el-col :span="2.2" class="m-20">
            <el-button type="warning" size="medium" @click="downLoadModel">下载模版</el-button>
        </el-col>

        <el-col :span="2.2" class="m-20">
            <el-button type="primary" size="medium" @click="addLabel">添加标签</el-button>
        </el-col>
        <el-col :span="6" class="m-20">
            <el-upload
              class="upload-demo"
              :data="{categoryId: label.selectLeftTreeId}"
              action="/v1/tag/info/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              accept='.xlsx'
              :on-exceed="handleExceed"
              >
              <el-button type="warning" size="medium">导入</el-button>
            </el-upload>

        </el-col>
    </el-row>
    <div style="height:50px"></div>
    <my-table-list @show-editLog = 'editLog'></my-table-list>
</div>
</template>
<style lang="scss" scoped>
.m-20 {
  margin-top: 20px;
}
.m-5 {
  margin-top: 5px;
}
</style>
<script>
import MyTableList from "./tableList";
import { deleteSome } from "@/server/api";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  components: {
    MyTableList
  },
  data() {
    return {
      labelSearchName: "", //搜索标签名称
      searchTime: "", //搜索时间
      selectEvent: "" //搜索事件
    };
  },

  watch: {
    labelSearchName(curVal, oldVal) {
      this.saveDataToCommon();
    },
    searchTime() {
      this.saveDataToCommon();
    },
    selectEvent() {
      this.saveDataToCommon();
    }
  },
  computed: {
    ...mapState(["label", "events"]),
    ...mapGetters(["label", "events"]),
    options() {
      return this.events.selectList.data;
    }
  },
  mounted() {
    this.selectInfo();
  },
  methods: {
    ...mapActions(["selectInfo", "getLabelInfo", "setSearchData"]),

    createEvent() {
      this.$emit("show-editLog", "创建事件");
    },

    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },

    /****
     *  保存当前搜索信息到公共数据部分方法
     * ****/
    saveDataToCommon() {
      this.setSearchData({
        labelSearchName: this.labelSearchName,
        searchTime: this.searchTime,
        selectEvent: this.selectEvent
      });
    },

    /*******
     *  记录用户筛选条件 并return
     * *******/
    selectDateInfo() {
      let data = {
        tagName: this.label.labelSearchName || "",
        startTime: this.label.searchTime&&this.label.searchTime[0] || "",
        endTime: this.label.searchTime&&this.label.searchTime[1] || "",
        eventId: this.label.selectEvent || "",
        tagCategoryId: this.label.selectLeftTreeId
      };
      return data;
    },

    /****
     *  搜索按钮
     * *****/
    searchInfo() {
      let data = this.selectDateInfo();
      this.getLabelInfo(data);
    },

    /*****
     *  删除方法
     * ******/
    batchDelete() {
      console.log("删除方法");
      // console.log(this.label.selectList);
      if (!this.label.selectList.length) {
        return this.$message("请选中所需删除项");
      }
      let data = this.label.selectList;
      let ids = data.map(item => {
        return item.id;
      });
      console.log(ids);
      deleteSome(ids)
        .then(res => {
          console.log(res);
          if (res.success) {
            let dataInfo = this.selectDateInfo();
            this.getLabelInfo(dataInfo);
            this.$message.success("删除成功");
          } else {
            return this.$message.error(res.errorMsg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    /*****
     *  导入方法
     * ********/

    importExl() {
      console.log("导入方法");
    },
    /******
     *  导出方法
     * *******/
    exportExl() {
      this.downLoadExc('/v1/tag/info/export');
    },

    /*****
     *  下载模版方法
     * *****/
    downLoadModel(){
      this.downLoadExc('/v1/tag/info/template',true)
    },
      

    /*******
     *  下载方法 传入url参数,bol值区别url上需不需要带参数
     * ******/
    downLoadExc(link,bol){
      let data = this.selectDateInfo();
      let url = bol ? link : link + `?tagName=${data.tagName}&tagCategoryId=${data.tagCategoryId}&eventId=${data.eventId}&startTime=${data.startTime}&endTime=${data.endTime}`;
      let form = document.createElement("form");
      form.id = "formTable";
      form.style.display = "none";
      form.setAttribute("target", "");
      form.setAttribute("method", "post");
      form.setAttribute("action", url);
      document.body.appendChild(form);
      form.submit();
      if (document.querySelector("#formTable")) {
        document.querySelector("#formTable").remove();
      }
    },

    /*****
     *  增加标签
     * *******/
    addLabel() {
      this.$emit("show-add", "添加标签");
    },

    /****
     *  编辑标签
     * ****/
    editLog() {
      this.$emit("show-add", "编辑标签");
    }
  }
};
</script>