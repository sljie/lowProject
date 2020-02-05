<template>
  <el-dialog
    :rules="rules"
    :title="title"
    :visible.sync="isShow"
    @open="open()"
    @close="close()"
    width="800px"
    :before-close="handleClose">

    <el-form :model="form" label-width="100px" :rules="rules" ref="myForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目名称：" prop="projectname">
            <el-input size='small' v-model="form.projectname" placeholder="请输入英文的项目名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开发环境地址：" v-if="showByRole()" prop="devenvironment">
            <el-input size='small' v-model="form.devenvironment" placeholder="英文逗号隔开,例：192.168.0.1:8888,..."></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开发人员：" prop="developer">
            <el-select
              @visible-change="inputFilterStr = ''"
              :filter-method="inputStr => inputFilterStr = inputStr"
              filterable :multiple="true"
              v-model="form.developer"
              placeholder="请选择"
              size="small"
              style="width:100%;">
              <el-option
                v-for="item in filterPersons"
                :key="item.email"
                :label="item.nickname"
                :value="item.nickname">
                <span style="float: left">{{ item.nickname }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px;margin-right: 20px;">{{ item.email }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="测试环境地址：" v-if="showByRole()" prop="testenvironment">
            <el-input size='small' v-model="form.testenvironment" placeholder="英文逗号隔开,例：192.168.0.1:8888,..."></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="测试人员：" prop="tester">
            <el-select
              @visible-change="inputFilterStr = ''"
              :filter-method="inputStr => inputFilterStr = inputStr"
              filterable :multiple="true"
              v-model="form.tester"
              placeholder="请选择"
              size="small" style="width:100%;">
              <el-option
                v-for="item in filterPersons"
                :key="item.email"
                :label="item.nickname"
                :value="item.nickname">
                <span style="float: left">{{ item.nickname }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px;margin-right: 20px;">{{ item.email }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生产环境地址：" v-if="showByRole()" prop="proenvironment">
            <el-input size='small' v-model="form.proenvironment" placeholder="英文逗号隔开,例：192.168.0.1:8888,..."></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="运维人员：" prop="operation">
            <el-select
              @visible-change="inputFilterStr = ''"
              :filter-method="inputStr => inputFilterStr = inputStr"
              filterable
              :multiple="true"
              v-model="form.operation"
              placeholder="请选择"
              size="small"
              style="width:100%;">
              <el-option
                v-for="item in filterPersons"
                :key="item.email"
                :label="item.nickname"
                :value="item.nickname">
                <span style="float: left">{{ item.nickname }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px;margin-right: 20px;">{{ item.email }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item label="Git地址：" prop="giturl">
          <el-input size='small' v-model="form.giturl"></el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item label="war包地址:" label-width="100px" prop="warpath">
          <el-input size='small' v-model="form.warpath" placeholder="项目包含多模块 请录入模块名  无模块 不用填写">
            <template slot="append">{{postfixPath}}</template>
          </el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClose()">取 消</el-button>
      <el-button size="small" type="primary" @click="preSubmit()">{{isEdit ? '保存' : '添加'}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import constants from '@/js/constants'
import * as types from '@/store/mutation-types'
export default {
    props: {
      editData: {
        type: Object,
        default: () => {return null}
      },
      isShow: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '提示'
      }
    },
    computed: {
      ...mapGetters(['user', 'persons']),
      filterPersons: function() {
        if(Array.isArray(this.persons) && typeof this.inputFilterStr === 'string') {
          return this.persons.filter(item => {
            var reg = new RegExp(this.inputFilterStr)
            return reg.test(item.email) || reg.test(item.nickname)
          })
        }
        return []
      },
      // postfixPath: function() {
      //   console.log('changed11111')
      //   if(this.form.warpath) {
      //     return '/target/ROOT.war'
      //   }
      //   return 'target/ROOT.war'
      // }
    },
    watch: {
      'form.warpath': function() {
        if(this.form.warpath) {
          this.postfixPath =  '/target/ROOT.war'
        } else {
          this.postfixPath =  'target/ROOT.war'
        }  
      }
    },
    data() {
        return {
          postfixPath: 'target/ROOT.war',
          inputFilterStr: '',
          isEdit: false,
          rules: {
            projectname: [
              { required: true, message: '请输入英文项目名称', trigger: 'blur' },
            ],
            developer: [
              { required: true, message: '请选择开发人员', trigger: 'change' },
            ],
            tester: [
              { required: true, message: '请选择测试人员', trigger: 'change' },
            ],
            operation: [
              { required: true, message: '请选择运维人员', trigger: 'change' },
            ],
            giturl: [
              { required: true, message: '请输入git地址', trigger: 'blur' },
            ],
            // warpath: [
            //   { required: true, message: '请输入模块名', trigger: 'blur' },
            // ],
          },
          form: {
            warpath: ''
          }
        }
    },
    mounted() {
    },
    methods: {
      preSubmit() {
        this.$refs['myForm'].validate((valid) => {
          if (valid) {
            this.submit()
            return true
          } else {
            return false
          }
        })
      },
      formatPersonsFromArray(arr) {
        if(arr) {
          return arr.join(',')
        } else {
          return ''
        }
      },
      formatPersonsFromString(str) {
        if(str) {
          return str.split(',')
        } else {
          return []
        }
      },
      submit() {
        var data = new FormData()
        var keys = Object.keys(this.form)
        console.log(this.form)
        keys.forEach(key => {
          if (key === 'warpath') { // 有值的时候
            if(typeof this.form[key] === 'string') {
              this.form[key] = this.form[key].replace(/ /g,'')
            }
            data.append(key, this.form[key] ? (this.form[key] + this.postfixPath) : this.postfixPath)
          } else if (key === 'developer' || key === 'tester' || key === 'operation') {
            data.append(key, this.formatPersonsFromArray(this.form[key]))
          } else if (typeof this.form[key] === 'string') {
            this.form[key] = this.form[key].replace(/ /g,'')
            data.append(key, this.form[key] ? this.form[key] : '')
          } else {
            data.append(key, this.form[key] ? this.form[key] : '')
          }
        })

        var requestUrl = this.isEdit ?
          '/PublishPlatform/projectManage/addDeprecordOrUpdate' :
          '/PublishPlatform/projectManage/add'
        axios({
          url: requestUrl,
          method: 'post',
          data
        }).then(res => {
          if (res.success) {
            let msg = this.isEdit ? '保存成功':'添加成功'
            this.$message({
              message: msg,
              type: 'success'
            })
            this.submitOk()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(error => {
          let msg = this.isEdit ? '保存失败':'添加失败'
          this.$message.error(msg)
        })
      },
      open() {
        if (this.editData) {
          this.$nextTick(() => {
            this.isEdit = Object.keys(this.editData).length > 0
            this.form.devenvironment = this.editData.devenvironment
            this.form.testenvironment = this.editData.testenvironment
            this.form.proenvironment = this.editData.proenvironment
            this.form.version = this.editData.version
            this.form.projectname = this.editData.projectname
            this.form.developer = this.formatPersonsFromString(this.editData.developer)
            this.form.tester = this.formatPersonsFromString(this.editData.tester)
            this.form.operation = this.formatPersonsFromString(this.editData.operation)
            this.form.giturl = this.editData.giturl
            var val = this.warPathFormatter(this.editData.warpath)
            console.log(val)
            this.form.warpath = val
            this.form.id = this.editData.id
          })
        } else {
          this.isEdit = false
        }
      },
      warPathFormatter(data) {
        if(data) {
          return data.replace('target\/ROOT.war','').replace('\/', '')
        } else {
          return ''
        }
      },
      close() {
        this.$refs['myForm'].resetFields()
      },
      handleClose() {
        this.$emit('before-close')
      },
      submitOk() {
        this.$emit('submit-ok')
      },
      showByRole() {
        if (this.user) {
          switch (this.user.role) {
            case constants.ROLE_DEVELOPER:
              return false
            case constants.ROLE_TESTER:
              return false
            case constants.ROLE_OPS:
              return true
          }
        } else {
          return true
        }
      }
    }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
