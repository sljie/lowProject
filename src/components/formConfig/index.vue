<template>
  <div class="formConfig">
    <el-dialog title="单表配置" :visible.sync="dialogVisible" :fullscreen="true">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid">
            <div class="view-header">
              <div class="title">选择组件（点击添加）</div>
            </div>
            <div class="components-list">
              <div class="type">文字类组件</div>
              <ul>
                <li class="components-item" @click="addComponent('input')">输入框</li>
                <li class="components-item" @click="addComponent('textarea')">文本框</li>
                <li class="components-item" @click="addComponent('editor')">富文本编辑器</li>
              </ul>
              <div class="type">下拉组件</div>
              <ul>
                <li class="components-item" @click="addComponent('select')">自定义下拉</li>
                <li class="components-item">数据字典</li>
                <li class="components-item">特殊（工厂 公司）</li>
              </ul>
              <div class="type">时间日期组件</div>
              <ul>
                <li class="components-item" @click="addComponent('time')">时间</li>
                <li class="components-item" @click="addComponent('datetimerange')">日期时间范围</li>
                <li class="components-item" @click="addComponent('date')">日期</li>
                <li class="components-item" @click="addComponent('daterange')">日期范围</li>
                <li class="components-item" @click="addComponent('year')">年</li>
                <li class="components-item" @click="addComponent('month')">月</li>
              </ul>
              <div class="type">其它</div>
              <ul>
                <li class="components-item" @click="addComponent('muticheck')">多选框</li>
                <li class="components-item" @click="addComponent('radio')">单选</li>
                <li class="components-item" @click="addComponent('file')">文件上传</li>
                <li class="components-item">弹窗</li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid">
            <div class="view-header">
              <div class="title" style="position: absolute;">预览</div>
              <el-button
                @click="reset()"
                type="danger"
                style="margin: 4px;padding: 4px;position: relative;float: right;"
              >重置</el-button>
              <el-button
                @click="preview()"
                type="primary"
                style="margin: 4px;padding: 4px;position: relative;float: right;"
              >预览</el-button>
              <el-button
                @click="copyCode()"
                type="primary"
                style="margin: 4px;padding: 4px;position: relative;float: right;"
              >复制代码</el-button>
            </div>
            <el-scrollbar style="height:100%;">
              <el-form class="formList">
                <draggable
                  v-model="formList"
                  :group="{ name:'widget',put:true}"
                  ghostClass="ghost"
                  :swapThreshold="0.8"
                  :animation="100"
                  class="widget-form-list"
                >
                  <div
                    class="formItem"
                    v-for="(formItem, index) in formList"
                    :key="index"
                    :class="{ active: activeItemIndex === index }"
                    @click="handleSelectWidget(formItem, index)"
                  >
                    <el-form-item :label="formItem.label + '：'" :required="formItem.required">
                      <!-- 输入框 -->
                      <el-input
                        v-if="formItem.type === 'input'"
                        v-model="formItem.cvalue"
                        :placeholder="formItem.placeholder"
                        :readonly="formItem.readonly"
                        :disabled="formItem.disabled"
                      ></el-input>
                      <!-- 文本框 -->
                      <el-input
                        :disabled="formItem.disabled"
                        :readonly="formItem.readonly"
                        type="textarea"
                        v-model="formItem.cvalue"
                        v-if="formItem.type === 'textarea'"
                        size="mini"
                      ></el-input>
                      <!-- 富文本编辑器 -->
                      <div v-if="formItem.type === 'editor'" class="quile" style="height:400px">
                        <vue-ueditor-wrap
                          v-model="formItem.cvalue"
                          :config="myConfig"
                          style="line-height: 20px;"
                        ></vue-ueditor-wrap>
                      </div>
                      <!-- 下拉 -->
                      <el-select
                        filterable
                        :disabled="formItem.disabled"
                        v-model="formItem.cvalue"
                        v-if="formItem.type === 'select'"
                      >
                        <el-option
                          v-for="val in formItem.content"
                          :label="val.ctext"
                          :value="val.cvalue"
                          :key="val.cvalue"
                        ></el-option>
                      </el-select>
                      <!-- 时间 -->
                      <el-time-picker
                        :disabled="formItem.disabled"
                        :clearable="true"
                        :editable="true"
                        v-model="formItem.cvalue"
                        v-if="formItem.type ==='time'"
                        value-format="HH:mm:ss"
                      ></el-time-picker>
                      <!-- 日期时间范围 -->
                      <el-date-picker
                        :disabled="formItem.disabled"
                        :editable="true"
                        v-model="formItem.cvalue"
                        type="daterange"
                        v-if="formItem.type ==='daterange'"
                        size="mini"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                      ></el-date-picker>
                      <!-- 日期 -->
                      <el-date-picker
                        :disabled="formItem.disabled"
                        :clearable="true"
                        :editable="true"
                        v-model="formItem.cvalue"
                        align="right"
                        v-if="formItem.type ==='date'"
                        type="date"
                      ></el-date-picker>
                      <!-- 日期范围 -->
                      <el-date-picker
                        :disabled="formItem.disabled"
                        :editable="true"
                        v-model="formItem.cvalue"
                        type="datetimerange"
                        v-if="formItem.type ==='datetimerange'"
                        size="mini"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                      ></el-date-picker>
                      <!-- 年 -->
                      <el-date-picker
                        :disabled="formItem.disabled"
                        :clearable="true"
                        :editable="true"
                        v-model="formItem.cvalue"
                        align="right"
                        v-if="formItem.type ==='year'"
                        type="year"
                      ></el-date-picker>
                      <!-- 月 -->
                      <el-date-picker
                        :disabled="formItem.disabled"
                        :clearable="true"
                        :editable="true"
                        v-model="formItem.cvalue"
                        align="right"
                        v-if="formItem.type ==='month'"
                        type="month"
                      ></el-date-picker>
                      <!-- 多个勾选框 -->
                      <div
                        class="muticheck"
                        v-if="formItem.type === 'muticheck'"
                        style="display:flex;flex-flow:row;"
                      >
                        <el-button
                          type="primary"
                          @click="checkInverse()"
                          size="mini"
                          v-if="!formItem.disabled"
                        >反选</el-button>
                        <el-checkbox-group v-model="formItem.cvalue" :disabled="formItem.disabled">
                          <el-checkbox
                            v-for=" val in formItem.content"
                            :key="val.cvalue"
                            :label="val.cvalue"
                            :disabled="val.disabled"
                          >{{val.ctext}}</el-checkbox>
                        </el-checkbox-group>
                      </div>
                      <!-- 单选 -->
                      <div v-if="formItem.type === 'radio'">
                        <el-radio
                          v-model="formItem.cvalue"
                          :label="radio.cnum"
                          v-for="radio in formItem.content"
                          :key="radio.cnum"
                        >{{radio.ctext}}</el-radio>
                      </div>
                      <!-- 文件上传 -->
                      <upload-form
                        class="file"
                        ref="uploadFrom"
                        :upload="formItem"
                        v-if="formItem.type ==='file'"
                        :tips="formItem.tips?formItem.tips:''"
                      ></upload-form>

                      <!-- 弹窗 -->

                      <el-button
                        title="删除"
                        @click.stop="handleWidgetDelete()"
                        class="widget-action-delete"
                        circle
                        plain
                        type="danger"
                        v-if="activeItemIndex === index"
                      >删除</el-button>
                      <el-button
                        title="复制"
                        @click.stop="handleWidgetClone()"
                        class="widget-action-clone"
                        circle
                        plain
                        type="primary"
                        v-if="activeItemIndex === index"
                      >复制</el-button>
                    </el-form-item>
                  </div>
                </draggable>
              </el-form>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid">
            <div class="view-header">
              <div class="title">详细配置</div>
            </div>
            <div class="right-grid">
              <el-form :label-position="'top'" v-if="formList.length>0">
                <el-form-item label="字段名：">
                  <el-input v-model="formList[activeItemIndex].label"></el-input>
                </el-form-item>
                <el-form-item label="是否禁用：">
                  <el-switch v-model="formList[activeItemIndex].disabled"></el-switch>
                </el-form-item>
                <el-form-item label="是否必输：">
                  <el-switch v-model="formList[activeItemIndex].required"></el-switch>
                </el-form-item>
                <el-form-item label="是否只读：" v-if="formList[activeItemIndex].type === 'input'">
                  <el-switch v-model="formList[activeItemIndex].readonly"></el-switch>
                </el-form-item>
                <el-form-item label="提示内容：" v-if="formList[activeItemIndex].type === 'input'">
                  <el-input v-model="formList[activeItemIndex].placeholder"></el-input>
                </el-form-item>
                <el-form-item label="下拉框选项：" v-if="formList[activeItemIndex].type === 'select'">
                  <draggable
                    tag="ul"
                    :list="formList[activeItemIndex].content"
                    :group="{ name: 'content' }"
                    ghostClass="ghost"
                    handle=".move-icon"
                  >
                    <li v-for="(item, index) in formList[activeItemIndex].content" :key="index">
                      <div class="flex align-middle">
                        <span>选项名</span>
                        <el-input
                          size="mini"
                          v-model="formList[activeItemIndex].content[index].ctext"
                        ></el-input>
                        <span>选项值</span>
                        <el-input
                          size="mini"
                          v-model="formList[activeItemIndex].content[index].cvalue"
                        ></el-input>
                        <i class="el-icon-menu move-icon" style="cursor: move;"></i>
                        <i
                          class="el-icon-delete delect-icon"
                          style="cursor: pointer;"
                          @click="handleOptionsRemove(index)"
                        ></i>
                      </div>
                    </li>
                  </draggable>
                  <div>
                    <el-button size="mini" type="primary" @click="handleOptionsAdd()">增加选项</el-button>
                  </div>
                </el-form-item>
                <el-form-item label="多选框选项：" v-if="formList[activeItemIndex].type === 'muticheck'">
                  <draggable
                    tag="ul"
                    :list="formList[activeItemIndex].content"
                    :group="{ name: 'content' }"
                    ghostClass="ghost"
                    handle=".move-icon"
                  >
                    <li v-for="(item, index) in formList[activeItemIndex].content" :key="index">
                      <div class="flex align-middle">
                        <span>选项名</span>
                        <el-input
                          size="mini"
                          v-model="formList[activeItemIndex].content[index].ctext"
                        ></el-input>
                        <span>选项值</span>
                        <el-input
                          size="mini"
                          v-model="formList[activeItemIndex].content[index].cvalue"
                        ></el-input>
                        <i class="el-icon-menu move-icon" style="cursor: move;"></i>
                        <i
                          class="el-icon-delete delect-icon"
                          style="cursor: pointer;"
                          @click="handleOptionsRemove(index)"
                        ></i>
                      </div>
                    </li>
                  </draggable>
                  <div>
                    <el-button size="mini" type="primary" @click="handleOptionsAdd()">增加选项</el-button>
                  </div>
                </el-form-item>
                <el-form-item label="单选框选项：" v-if="formList[activeItemIndex].type === 'radio'">
                  <draggable
                    tag="ul"
                    :list="formList[activeItemIndex].content"
                    :group="{ name: 'content' }"
                    ghostClass="ghost"
                    handle=".move-icon"
                  >
                    <li v-for="(item, index) in formList[activeItemIndex].content" :key="index">
                      <div class="flex align-middle">
                        <span>选项名</span>
                        <el-input
                          size="mini"
                          v-model="formList[activeItemIndex].content[index].ctext"
                        ></el-input>
                        <span>选项值</span>
                        <el-input
                          size="mini"
                          v-model="formList[activeItemIndex].content[index].cnum"
                        ></el-input>
                        <i class="el-icon-menu move-icon" style="cursor: move;"></i>
                        <i
                          class="el-icon-delete delect-icon"
                          style="cursor: pointer;"
                          @click="handleOptionsRemove(index)"
                        ></i>
                      </div>
                    </li>
                  </draggable>
                  <div>
                    <el-button size="mini" type="primary" @click="handleOptionsAdd()">增加选项</el-button>
                  </div>
                </el-form-item>
                <el-form-item label="提示内容：" v-if="formList[activeItemIndex].type === 'file'">
                  <el-input v-model="formList[activeItemIndex].tips"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 单表模块 -->
    <el-dialog :visible.sync="monacoVisible" :fullscreen="true">
        <monaco ref="monaco" :opts="opts" @change="changeValue"></monaco>
    </el-dialog>

    

  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";

import Draggable from "vuedraggable";
import monaco from '@/components/monaco'
export default {
  components: {
    Draggable,
    monaco
  },
  data() {
    return {
      monacoVisible: false,
      opts: {
          value: 'function t () {console.log(111)} var a =1 ; var b = 2;var c = [{A:1},{B:2}]',
          readOnly: false, // 是否可编辑
          language: 'javascript', // 语言类型
          theme: 'vs-dark' // 编辑器主题
      },
      dialogVisible: false,
      activeItem: {},
      activeItemIndex: 0,
      formList: [
        {
          label: "工厂",
          type: "select",
          cvalue: "",
          disabled: false,
          required: true,
          content: [
            {
              ctext: "1200 光学",
              cvalue: 1200
            },
            {
              ctext: "4100 智能科技",
              cvalue: 4100
            }
          ]
        },
        {
          label: "物料",
          type: "input",
          cvalue: "",
          placeholder: "",
          readonly: false,
          disabled: false,
          required: true
        },
        {
          label: "时间",
          type: "time",
          cvalue: "",
          placeholder: "",
          disabled: false,
          required: true
        },
        {
          label: "日期",
          type: "date",
          cvalue: "",
          placeholder: "",
          disabled: false,
          required: true
        },
        {
          label: "盘点范围",
          type: "muticheck",
          cvalue: [],
          disabled: false,
          required: true,
          content: [
            {
              ctext: "部分",
              cvalue: 0
            },
            {
              ctext: "全部",
              cvalue: 1
            }
          ]
        },
        {
          label: "检验次数",
          type: "radio",
          cvalue: "",
          disabled: false,
          required: true,
          content: [
            {
              ctext: "一次",
              cnum: 0
            },
            {
              ctext: "两次",
              cnum: 1
            }
          ]
        },
        {
          label: "文件",
          type: "file",
          cvalue: "",
          disabled: false,
          required: true,
          tips: "仅限选择图片支持png,jpg"
        }
      ],
      myConfig: {
        // ueditor禁止编辑
        readonly: false,
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: "/commons/upload/uploadFile",
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: "/static/UEditor/",
        zIndex: 2900, // 编辑器层级的基数,默认是900
        toolbars: [
          [
            "fullscreen",
            "source",
            "|",
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "underline",
            "fontborder",
            "strikethrough",
            "superscript",
            "subscript",
            "removeformat",
            "formatmatch",
            "autotypeset",
            "blockquote",
            "pasteplain",
            "|",
            "forecolor",
            "backcolor",
            "insertorderedlist",
            "insertunorderedlist",
            "selectall",
            "cleardoc",
            "|",
            "rowspacingtop",
            "rowspacingbottom",
            "lineheight",
            "|",
            "customstyle",
            "paragraph",
            "fontfamily",
            "fontsize",
            "|",
            "directionalityltr",
            "directionalityrtl",
            "indent",
            "|",
            "justifyleft",
            "justifycenter",
            "justifyright",
            "justifyjustify",
            "|",
            "touppercase",
            "tolowercase",
            "|",
            "link",
            "unlink",
            "anchor",
            "|",
            "imagenone",
            "imageleft",
            "imageright",
            "imagecenter",
            "|",
            "simpleupload",
            "attachment",
            "pagebreak",
            "|",
            "horizontal",
            "date",
            "time",
            "spechars",
            "|",
            "inserttable",
            "deletetable",
            "insertparagraphbeforetable",
            "insertrow",
            "deleterow",
            "insertcol",
            "deletecol",
            "mergecells",
            "mergeright",
            "mergedown",
            "splittocells",
            "splittorows",
            "splittocols",
            "charts",
            "|",
            "print",
            "preview",
            "searchreplace",
            "drafts",
            "help"
          ]
        ]
      },
      /** 单表form数据 */
      singleFormData: {
        formData: [],
        btnObj: {},
        moduleName: "",
        treeData: []
      },
      moduleData: {
        moduleName: ""
      }
    };
  },

  created() {},
  mounted() {
    // this.$nextTick(() => {
    //   var h = document.documentElement.clientHeight - 35 - 60
    //   document
    //     .getElementsByClassName('grid')[0]
    //     .setAttribute(
    //       'style',
    //       'max-height:' + h + 'px !important;height:' + h + 'px !important;'
    //     )
    //   document
    //     .getElementsByClassName('grid')[1]
    //     .setAttribute(
    //       'style',
    //       'max-height:' + h + 'px !important;height:' + h + 'px !important;'
    //     )
    //   document
    //     .getElementsByClassName('grid')[2]
    //     .setAttribute(
    //       'style',
    //       'max-height:' + h + 'px !important;height:' + h + 'px !important;'
    //     )
    // })
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
    addComponent(type) {
      const obj = {
        label: "字段名",
        disabled: false,
        required: true,
        cvalue: ""
      };
      obj.type = type;
      switch (type) {
        case "input":
          obj.readonly = false;
          obj.placeholder = "";
          break;
        case "textarea":
          obj.readonly = false;
          obj.placeholder = "";
          break;
        case "select":
          obj.content = [];
          break;
        case "muticheck":
          obj.cvalue = [];
          obj.content = [];
          break;
        case "radio":
          obj.content = [];
          break;
        case "daterange":
          obj.cvalue = [];
          break;
        case "datetimerange":
          obj.cvalue = [];
          break;
        case "file":
          obj.tips = "";
          break;
        default:
          break;
      }
      this.formList.push(obj);
    },
    handleWidgetDelete() {
      const index = this.activeItemIndex;
      if (this.formList.length - 1 === index) {
        if (index === 0) {
        } else {
          this.activeItemIndex = index - 1;
        }
      } else {
        this.activeItemIndex = index;
      }
      this.formList.splice(index, 1);
    },
    handleWidgetClone() {
      const item = JSON.parse(
        JSON.stringify(this.formList[this.activeItemIndex])
      );
      this.formList.push(item);
    },
    handleSelectWidget(item, index) {
      this.activeItem = item;
      this.activeItemIndex = index;
    },
    handleOptionsRemove(index) {
      this.formList[this.activeItemIndex].content.splice(index, 1);
    },
    handleOptionsAdd() {
      const obj = {
        ctext: ""
      };
      switch (this.formList[this.activeItemIndex].type) {
        case "select":
          obj.cvalue = "";
          break;
        case "muticheck":
          obj.cvalue = "";
          break;
        case "radio":
          obj.cnum = "";
          break;
        default:
          break;
      }
      this.formList[this.activeItemIndex].content.push(obj);
    },
    checkInverse() {
      const arr = [];
      this.formList[this.activeItemIndex].content.forEach(item => {
        if (!this.formList[this.activeItemIndex].cvalue.includes(item.cvalue)) {
          arr.push(item.cvalue);
        }
      });
      this.formList[this.activeItemIndex].cvalue = arr;
    },
    reset() {
      this.$confirm("此操作清空表单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.formList = [];
          this.$message({
            type: "success",
            message: "清空成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清空"
          });
        });
    },
    copyCode() {
        this.monacoVisible = true;

      const str = JSON.stringify(this.formList);
      var createInput = document.createElement("input");
      createInput.value = str;
      document.body.appendChild(createInput);
      createInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      createInput.className = "createInput";
      createInput.style.display = "none";
      this.$message.success("已复制到剪切板！");
    },
    preview() {
      // let main = {}
      // main = JSON.parse(JSON.stringify(this.formList))
      // let btnObj = {
      //   icon: '',
      //   ctext: '',
      //   btn: {
      //     set: {
      //       data: main
      //     },
      //     type: 'Single',
      //     cbtnType: 'Insert',
      //     api: '',
      //     nauth: ''
      //   },
      //   loading: false
      // }
      // singleFormInit([], btnObj, this)
      this.singleFormData.formData = JSON.parse(JSON.stringify(this.formList));
      this.$refs.addSingleForm.addFormVisible = true;
    }
  }
};
</script>

<style lang="scss">
.formConfig {
  .view-header {
    height: 30px;
    line-height: 30px;
    //display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    background-color: #eef1f8;
    padding-right: 5px;
    .title {
      font-size: 14px;
      text-indent: 10px;
      font-weight: bold;

      color: #0093e0;
    }
    width: 100%;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 10px 14px;
  }
  .el-dialog--center .el-dialog__header {
    padding-top: 15px;
  }
  .el-dialog__headerbtn {
    top: 8px !important;
  }
  .el-dialog__header {
    background-color: #eef1f8 !important;
    height: 35px;
    padding: 5px 15px 10px !important;
    .el-dialog__title {
      color: #0093e0 !important;
      font-size: 16px !important;
      font-weight: bold;
    }
  }
  .el-col {
    padding: 0 5px !important;
  }
  .grid {
    border: 1px solid #dcdfe6;
    .components-list {
      padding: 8px 0;
      width: 100%;
      overflow: auto;
      height: calc(100vh - 90px);

      .type {
        padding: 8px 12px;
        font-size: 13px;
      }

      ul {
        position: relative;
        overflow: hidden;
        padding: 0 10px 10px;
        margin: 0;
      }

      // .ghost {
      //   background: #fff;
      //   border: 1px dashed $primary-color;

      //   &::after {
      //     background: #fff;
      //   }
      // }

      .components-item {
        font-size: 12px;
        display: block;
        width: 48%;
        line-height: 30px;
        position: relative;
        float: left;
        left: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 1%;
        color: #333;
        border: 1px solid #f4f6fc;
        text-align: center;
        background: #f4f6fc;
        cursor: pointer;
        &:hover {
          color: #409eff;
          border: 1px dashed #409eff;
        }

        & > a {
          display: block;
          cursor: move;
          background: #f4f6fc;
        }
      }
    }
    .formList {
      padding: 10px;
      overflow: auto;
      height: calc(100vh - 90px);
      .el-form-item {
        margin: 0;
        padding: 5px;
      }
      .el-form-item__label {
        width: 120px;
      }
      .el-input {
        width: 200px;
      }
      .formItem {
        position: relative;
        &:hover {
          box-shadow: 0px 1px 10px 1px #90c7ff inset;

          .el-icon-rank {
            display: block;
          }
        }

        &.active {
          box-shadow: 0px 1px 10px 1px #90c7ff;
          z-index: 1111;
          cursor: move;
          .el-icon-rank {
            display: block;
          }
        }
        .muticheck {
          .el-button {
            padding: 0px 7px;
            margin: 5px 20px;
            height: 25px;
          }
        }
        .file {
          width: 400px;
        }
      }
      .widget-action-delete {
        position: absolute;
        right: 10px;
        bottom: 0px;
        z-index: 3009;
      }

      .widget-action-clone {
        position: absolute;
        right: 70px;
        bottom: 0px;
        z-index: 3009;
      }
    }
    .right-grid {
      padding: 10px;
      overflow: auto;
      height: calc(100vh - 90px);
      .el-form-item {
        margin-bottom: 0px;
      }
      .el-form-item__content {
        display: inline-block;
        vertical-align: top;
      }
      .el-input {
        width: 200px;
      }
      ul {
        padding-left: 0px;
        margin: 0 0 5px 0;
      }
      li {
        list-style: none;
        .el-input {
          width: 115px;
        }
      }
      li.ghost {
        position: relative;
        line-height: 30px;
        list-style: none;
        font-size: 0;

        &::after {
          content: "放到这里";
          display: block;
          background: #fff;
          position: absolute;
          left: 50%;
          margin-left: -32px;
          top: 0;
          font-size: 16px;
          color: #999;
          z-index: 10;
        }
      }
    }
  }
}
</style>
