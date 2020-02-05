<template>
<div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="formInfo">
            <el-form-item label="标签名称" :label-width="formLabelWidth">
                <el-input v-model="formInfo.setLabelName" auto-complete="off" placeholder="请输入标签名称"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addLabel">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>
<style lang="scss" scoped>

</style>
<script>
import { addLabel,editLabel } from "@/server/api";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  props: {
    showDia: Boolean,
    title:String
  },
  watch: {
    showDia(curVal, oldVal) {
      this.dialogFormVisible = curVal;
      if(this.title === '添加标签'){
        this.formInfo.setLabelName = '';
      }else{
        this.formInfo.setLabelName = this.label.editInfo.tagName;
        this.editId = this.label.editInfo.id;
      }
      
      
    },
    dialogFormVisible() {
      !this.dialogFormVisible&&this.closeDia();
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      formInfo: {
        setLabelName: ""
      },
      formLabelWidth: "120px",
      editId:null
    };
  },
  mounted() {
  },
  computed: {
    ...mapState(["label"]),
    ...mapGetters(["label"]),
  },
  methods: {

    ...mapActions(["getLabelInfo"]),

    closeDia() {
      this.$emit("close-add", this.dialogFormVisible);
    },
    /*****
     *  添加标签方法
     * ****/
    addLabel(){
      if(this.title === '添加标签'){
        this.addApiFun();
      }else{
        console.log('编辑标签')
        this.editLabelFun();
      }
    },


    /******
     *  添加接口方法
     * *****/
    addApiFun(){
      addLabel(this.formInfo.setLabelName,this.label.selectLeftTreeId)
      .then(res => {
        if (res.success) {
          let data = {
            tagName: this.label.labelSearchName || "",
            startTime: this.label.searchTime[0] || "",
            endTime: this.label.searchTime[1] || "",
            eventId: this.label.selectEvent || "",
            tagCategoryId:this.label.selectLeftTreeId
          };
          this.getLabelInfo(data);
          this.dialogFormVisible = false;
          this.$message.success('添加成功');
        } else {
          return this.$message.error(res.errorMsg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    },


    /*****
     *  编辑接口方法
     * ******/
    editLabelFun(){
      editLabel(this.formInfo.setLabelName,this.editId,this.label.selectLeftTreeId)
      .then(res => {
        if (res.success) {
          let data = {
            tagName: this.label.labelSearchName || "",
            startTime: this.label.searchTime[0] || "",
            endTime: this.label.searchTime[1] || "",
            eventId: this.label.selectEvent || "",
            tagCategoryId:this.label.selectLeftTreeId
          };
          this.getLabelInfo(data);
          this.dialogFormVisible = false;
          this.$message.success('编辑成功');
        } else {
          return this.$message.error(res.errorMsg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
};
</script>