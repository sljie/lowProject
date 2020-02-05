<template>
    <div class="login">
        <div class="logo">
            <img src="@/assets/outLCDP.png" alt="">
        </div>
        <div class="user">
            <div class="user-login">用户登陆</div>
            <el-form :model="ruleForm" status-icon ref="ruleForm"  class="demo-ruleForm">
                <el-form-item  prop="uerName">
                    <el-input placeholder="用户名" type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="pass">
                    <el-input placeholder="密码" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import constants from '@/js/constants'
import * as types from '@/store/mutation-types'
export default {
    components: {
    },
    data() {
        return {
          ruleForm: {
              uerName: '',
              pass: ''
          },
        }
    },
    
    mounted() {
      
     
      
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    position: relative;
    .logo {
        width: 100%;
        height: 60px;
        background: white;
        display: flex;
        align-items: center;
        padding-left: 44px;
    }
    .user {
        width: 370px;
        height: 300px;
        background: white;
        text-align: center;
        position: absolute;
        left: 72%;
        top:39%;
        transform: translate(-50%, -50%);
        .el-input {
            width: 280px;
        }
        .user-login {
            font-size: 16px;
            height: 18px;
            margin-bottom: 20px;
            text-align: left;
            margin-left: 45px;
        }
    }
}
</style>
