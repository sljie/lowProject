<template>
<div>

<el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="handleClose">
  <el-form :model="form" ref="form">
    <el-form-item label="事件名称" :label-width="formLabelWidth" prop="labelName"  
    :rules="[
          { required: true, message: '事件名称不能为空'},
    ]"
      >
      <el-input v-model="form.labelName" auto-complete="off" placeholder='请输入事件名称'></el-input>
    </el-form-item>


    <!-- 事件权重配置 -->
    <el-form-item
    :label-width="formLabelWidth" 
    v-for='(item,index) in eventLength' 
    v-if='item?true:false'
    :key='item'
    :label="index==0?'事件权重配置':''" 
    :prop="'eventsKey.region.'+index+'.selectValue'"
    style='margin-top:20px'
    :rules="[
          { required: true, message: '事件权重配置不能为空'},
    ]"
    
    >
        <el-select v-model='form.eventsKey.region[index].selectValue' placeholder="请选择"
        >
        <el-option v-for='item in selectInfo'
         :label='item.pageName' 
         :value='item.id'
         :key='item.id'></el-option>
        </el-select>
        <el-form-item label="得分" class='score'  
        :prop="'eventsKey.inputValues.'+index+'.value'"
        :rules="[
          { required: true, message: '得分不能为空'},
          { type: 'number', message: '得分必须为数字值'}
        ]"
        >
            <el-input  placeholder="得分" style='width:100px' 
            v-model.number='form.eventsKey.inputValues[index].value'
            type='number'
            min="1" max="100"
            ></el-input>
        </el-form-item>
        <el-button type="danger" v-if='index==0?false:true' @click='deleteEventLine(index)'>删除</el-button>
    </el-form-item>
   
    <div class='add-event' @click='addEvent'>
        <span class="el-icon-circle-plus"></span>
        <span>添加事件</span>
    </div>
    
    <div class='line'></div>


    <!-- 衰减因子配置 -->

    <el-form-item 
    :label-width="formLabelWidth"
    v-for='(item,index) in eleLength' 
    v-if='item?true:false'
    :key = 'item'
    :label='index==0?"衰减因子配置":""' 
    :prop="'eleKey.region.'+index+'.leftValue'"
    style='margin-top:20px'
    
    :rules="[
      { required: true, message: '衰减因子不能为空'},
      { type: 'number', message: '衰减因子必须为数字值'},

    ]"
    >
        <span>
            <el-input  v-model.number='form.eleKey.region[index].leftValue'
            placeholder="请输入天数" style='width:110px' size='small' type='number'
            :max = '365'
            :min= '1'
            ></el-input>
            <span>日</span>
            <span class='ride-icon'>X</span>
            <span style='margin-left:10px'>衰减度为：</span>

            <el-form-item class='score'  
            :prop="'eleKey.inputValues.'+index+'.rightValue'"
            :rules="[
              { required: true, message: '衰减度不能为空'},
              { type: 'number', message: '衰减度必须为数字值'}
            ]"
            >
               <el-input placeholder="请输入比例" 
                style='width:110px' 
                size='small' 
                type='number'
                v-model.number='form.eleKey.inputValues[index].rightValue'
                min="0" max="100"
               ></el-input>%
               <el-button type="danger" style='margin-left:10px' size='small' v-if='index==0?false:true' @click='deleteEleLine(index)'>删除</el-button>
            </el-form-item>

        </span>
    </el-form-item>
   
    <div class='add-event' @click='addEle'>
        <span class="el-icon-circle-plus"></span>
        <span>添加因子</span>
    </div>
    <div class='line'></div>
    <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="resetForm('form')" v-if='isShowRet'>重置</el-button>
    </el-form-item>
  </el-form>
  
</el-dialog>
</div>
</template>
<style lang="scss" scoped>
.score {
  display: inline-block;
  width: 200px;
  margin-left: 10px;
}
.add-event {
  padding-left: 120px;
  color: #008fff;
  cursor: pointer;
}
.line {
  width: 100%;
  margin-top: 10px;
  border: 1px dashed #ccc;
  margin-bottom: 30px;
}
.ride-icon {
  font-weight: 600;
  margin-left: 10px;
}
</style>
<script>
import {
  createEvent,
  getSelectList,
  getEventEditInfo,
  changeStatus
} from "@/server/api";
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    isShowDia: Boolean,
    title: String
  },
  watch: {
    isShowDia(curVal, oldVal) {
      if (curVal) {
        if (this.title.includes("编辑")) {
          this.setEditInfo();
          this.isShowRet = false;
        } else {
          this.isShowRet = true;
        }
      }
      this.dialogFormVisible = curVal;
    },
    dialogFormVisible() {
      if (!this.dialogFormVisible) {
        if (this.title.includes("编辑")) {
          this.initFormData();
        }
        this.closeDia();
      }
    }
  },
  data() {
    return {
      form: {
        labelName: "", //事件名称
        //事件权重配置字段
        eventsKey: {
          region: [
            {
              selectValue: "" //下拉框选中值
            }
          ],
          inputValues: [
            {
              value: "" //得分值
            }
          ]
        },
        //因素字段
        eleKey: {
          region: [
            {
              leftValue: "" //左边输入框字段
            }
          ],
          inputValues: [
            {
              rightValue: "" //右边输入框字段
            }
          ]
        }
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      eventLength: [], //事件配置长度
      eleLength: [], //配置因子长度
      rand1: "1", //随机数1
      rand2: "2", //随机数1
      selectInfo: [],
      isShowRet: true
    };
  },
  computed: {
    ...mapState(["events"]),
    ...mapGetters(["events"])
  },
  created() {
    this.rand1 = Math.random();
    this.rand2 = Math.random();
    this.eventLength.push(this.rand1);
    this.eleLength.push(this.rand2);
  },
  mounted() {
    this.init();
  },
  methods: {
    /*****
     *  初始化调用下拉框方法
     * ***/
    init() {
      getSelectList()
        .then(res => {
          if (res.success) {
            this.selectInfo = res.data;
          } else {
            return this.$message.error(res.errorMsg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    closeDia() {
      this.$refs["form"].resetFields();
      this.$emit("close-dia", this.dialogFormVisible);
      this.eventLength = [1];
      this.eleLength = [2];
    },
    /****
     *  添加事件方法
     * ****/
    addEvent() {
      this.eventLength.push(Math.random());
      this.form.eventsKey.region.push({ selectValue: "" });
      this.form.eventsKey.inputValues.push({ value: "" });
    },
    /****
     *  添加因子方法
     * ****/
    addEle() {
      this.eleLength.push(Math.random());
      this.form.eleKey.region.push({ leftValue: "" });
      this.form.eleKey.inputValues.push({ rightValuevalue: "" });
    },

    /*****
     *  重置方法
     * ******/
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /****
     *  提交方法
     * ******/
    submitForm(formName) {
      if (this.title === "创建事件") {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.form);

            // this.resetForm(formName);

            this.creatData(this.form);
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.form);

            this.creatData(this.form, true);
          } else {
            console.log("error submit!!");
            return false;
          }
        });

      }
    },

    /****
     *  如果是编辑初始化的时候把原先数据挂上去
     * ******/
    setEditInfo() {
      this.form.labelName = this.events.editInfo.eventName;
      console.log(this.events.editInfo);
      let data = this.events.editInfo;
      let eventsData = JSON.parse(data.eventWeightConfig),
        eleData = JSON.parse(data.attenuationConfig);

      //事件配置添加数据
      if (eventsData) {
        if (eventsData.length == 1) {
          for (let key in eventsData[0]) {
            //必须是number类型select才能渲染内容，string的话就会变成内容
            this.form["eventsKey"].region[0]["selectValue"] = Number(key);
            this.form["eventsKey"].inputValues[0]["value"] = Number(
              eventsData[0][key]
            );
          }
        } else {
          console.log(eventsData);
          this.deleteEventLine(0);
          this.$nextTick(() => {
            for (let j = 0, len = eventsData.length; j < len; j++) {
              this.eventLength.push(Math.random());

              for (let key in eventsData[j]) {
                this.form.eventsKey.region.push({ selectValue: Number(key) });
                this.form.eventsKey.inputValues.push({
                  value: Number(eventsData[j][key])
                });
              }
            }
          });
          
        }
      }

      //衰减因素配置填充数据
      if (eleData) {
        if (eleData.length == 1) {
          for (let key in eleData[0]) {
            this.form["eleKey"].region[0]["leftValue"] = Number(key);
            this.form["eleKey"].inputValues[0]["rightValue"] = Number(
              eleData[0][key]
            );
          }
        } else {
          console.log(eleData);
          this.deleteEleLine(0);
          this.$nextTick(() => {
            for (let j = 0, len = eleData.length; j < len; j++) {
              this.eleLength.push(Math.random());
              for (let key in eleData[j]) {
                this.form.eleKey.region.push({ leftValue: Number(key) });
                this.form.eleKey.inputValues.push({
                  rightValue: Number(eleData[j][key])
                });
              }
            }
          });
          
        }
      }
    },

    /******
     *  关闭编辑清空数据方法
     * ******/
    initFormData() {
      console.log(this.form);
      this.form = {
        labelName: "", //事件名称
        //事件权重配置字段
        eventsKey: {
          region: [
            {
              selectValue: "" //下拉框选中值
            }
          ],
          inputValues: [
            {
              value: "" //得分值
            }
          ]
        },
        //因素字段
        eleKey: {
          region: [
            {
              leftValue: "" //左边输入框字段
            }
          ],
          inputValues: [
            {
              rightValue: "" //右边输入框字段
            }
          ]
        }
      };
    },

    /******
     *  创建方法，拼接字段,bol为true就是编辑
     * ******/
    creatData(res, bol) {
      let data = {
        eventName: res.labelName,
        eventWeightConfig: [],
        attenuationConfig: []
      };

      //事件权重字段拼接
      let top = res.eventsKey;
      for (let i = 0, len = top.inputValues.length; i < len; i++) {
        if (
          Number(top["inputValues"][i]["value"]) > 0 &&
          Number(top["inputValues"][i]["value"]) <= 100
        ) {
          data.eventWeightConfig.push({
            //key需要有外层[] ， 不然会报错
            [top["region"][i]["selectValue"]]: top["inputValues"][i]["value"]
          });
        } else {
          return this.$message.error("得分范围为1-100");
        }
      }

      //添加字段拼接
      let bottom = res.eleKey;
      for (let j = 0, len = bottom.inputValues.length; j < len; j++) {
        if (
          Number(bottom["region"][j]["leftValue"]) > 0 &&
          Number(bottom["region"][j]["leftValue"]) <= 365
        ) {
          if (
            Number(bottom["inputValues"][j]["rightValue"]) > 0 &&
            Number(bottom["inputValues"][j]["rightValue"]) <= 100
          ) {
            data.attenuationConfig.push({
              [bottom["region"][j]["leftValue"]]:
                bottom["inputValues"][j]["rightValue"]
            });
          } else {
            return this.$message.error("帅监度范围为0-100");
          }
        } else {
          return this.$message.error("天数范围为1-365");
        }
      }
      data.eventWeightConfig = JSON.stringify(data.eventWeightConfig);
      data.attenuationConfig = JSON.stringify(data.attenuationConfig);
      console.log(data);
      if (bol) {
        data.id = this.events.editInfo.id;
        this.editFun(data);
      } else {
        this.createFun(data);
      }
    },

    /****
     *  编辑接口方法
     * ****/
    editFun(data) {
      changeStatus(data)
        .then(res => {
          console.log(res);
          this.$refs["form"].resetFields();
          if (res.success) {
            this.dialogFormVisible = false;
            this.$store.dispatch("initList");
            this.$message.success("修改成功");
          } else {
            return this.$message.error(res.errorMsg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    /****
     *  走创建接口方法
     * *****/
    createFun(data) {
      createEvent(data)
        .then(res => {
          console.log(res);
          this.$refs["form"].resetFields();
          if (res.success) {
            this.dialogFormVisible = false;
            this.$store.dispatch("initList");
            this.$message.success("创建成功");
            this.initFormData();
          } else {
            return this.$message.error(res.errorMsg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    /****
     *  点击关闭确认
     * *****/
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    /*****
     *  事件配置删除行方法
     * *****/
    deleteEventLine(i) {
      //把当前行的内容清空
      this.form.eventsKey.region.splice(i, 1);
      this.form.eventsKey.inputValues.splice(i, 1);
      //删除当前行
      this.eventLength.splice(i, 1);
    },

    /*****
     *  衰减因子删除行方法
     * ****/
    deleteEleLine(i) {
      //把当前行的内容清空
      this.form.eleKey.region.splice(i, 1);
      this.form.eleKey.inputValues.splice(i, 1);
      //删除当前行
      this.eleLength.splice(i, 1);
    }
  }
};
</script>