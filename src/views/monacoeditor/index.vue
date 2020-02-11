<template>
    <div>
      
      <el-button type="primary" size="mini" @click="getValue">获取内容</el-button>
      <!--调用子组件-->
        <monaco ref="monaco" :opts="opts" @change="changeValue"></monaco>

        <div @click='show'>test</div>
        <form-config ref="formConfig"></form-config>
    </div>
</template>
<script>
import monaco from '@/components/monaco'
import formConfig from '@/components/formConfig'
export default {
    components: { monaco, formConfig },
    data() {
      return {
        
        opts: {
          value: 'function t () {console.log(111)} var a =1 ; var b = 2;var c = [{A:1},{B:2}]',
          readOnly: false, // 是否可编辑
          language: 'javascript', // 语言类型
          theme: 'vs-dark' // 编辑器主题
        }
      }
    },
    methods: {
      // 手动获取值
      getValue() {
        this.$message.info(this.$refs.monaco.getVal())
      },
      // 内容改变自动获取值
      changeValue(val) {
        console.log(val)
      },
      show() {
          this.$refs.formConfig.dialogVisible = true
      }
    }
}
</script>