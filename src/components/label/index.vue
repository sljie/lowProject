<template>
<div>
  <div style="display:flex">
      <my-nav style='width:12%' @show-left-add='showLeftDia'></my-nav>
      <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
      <div style="width:2%"></div>
      <my-search style="width:85%" @show-add='showFun'></my-search>
      
      <my-add-dialog :showDia='showAdd' @close-add='closeAdd' :title='title'></my-add-dialog>
  </div>
  <div>
    <my-left-dialog :showLeft='isShowLeft' @close-left='closeLeft'></my-left-dialog>
  </div>
</div>


</template>
<style lang="scss" scoped>

</style>
<script>
import MyNav from "./leftNav";
import MySearch from "./search";
import MyAddDialog from "./addDialog";
import MyLeftDialog from "./addColHierarchy";
export default {
  components: {
    MyNav,
    MySearch,
    MyAddDialog,
    MyLeftDialog
  },
  data() {
    return {
      input: "",
      showAdd: false,
      title: "test",
      isShowLeft: false
    };
  },
  mounted() {},
  methods: {
    showFun(str) {
      this.showAdd = true;
      this.title = str;
    },
    closeAdd() {
      this.showAdd = false;
    },

    showLeftDia() {
      this.isShowLeft = true;
    },
    closeLeft(){
      this.isShowLeft = false;
    }
  }
};
</script>