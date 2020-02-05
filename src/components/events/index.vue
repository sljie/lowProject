<template>
<div class="name">
    <my-search @show-editLog="showLog"></my-search>
    <div style='margin-top:50px'></div>
    <my-table @show-editLog="showLog"></my-table>
    <my-dialog :isShowDia='showDialog' @close-dia='changeDia' :title='title'></my-dialog>
</div>
</template>
<style lang="scss" scoped>

</style>
<script>
import MyTable from "./table";
import MySearch from "./search";
import MyDialog from "./dialog";
export default {
  components: {
    MyTable,
    MySearch,
    MyDialog
  },
  data() {
    return {
      showDialog: false,
      title: "test"
    };
  },
  mounted() {},
  methods: {
    showLog(str) {
      this.showDialog = true;
      this.title = str;
    },
    changeDia(bol) {
      this.showDialog = bol;
    }
  }
};
</script>