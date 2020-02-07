<template>
    <div class="login">
        <div class="user">
            <div class="left-container">
                <div class="logo-box">
                    <img src="~img/logo.png" alt="">
                </div>
                <div class="middle-box">
                    <img src="~img/logo-bottom.png" alt="">
                </div>
                <div class="version">Copyright © 2020 宁波舜宇智能科技有限公司</div>
            </div>
            <div class="right-container">
                <div class="top-logo">
                    <img src="~img/outLogo2.png" alt="">
                </div>
                <div class="user-form">
                    <el-form :model="ruleForm" status-icon ref="ruleForm"  class="demo-ruleForm">
                        <div class="word-label">用户名</div>
                        <el-form-item  prop="uerName">
                            <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
                        </el-form-item>
                        <div class="word-label">密码</div>
                        <el-form-item  prop="pass" style="position: relative">
                            <img class="look-pass" src="~img/nopass.png" alt="">
                            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                        </el-form-item>
                        <div class="word-label">MAC</div>
                        <el-form-item  prop="mac">
                            <el-input type="text" v-model="ruleForm.mac" autocomplete="off"></el-input>
                        </el-form-item>
                        <div class="btn-box">
                            <el-button type="primary" @click="submitForm('ruleForm')">登&nbsp;&nbsp;&nbsp;陆</el-button>
                            <el-button class="right-btn" @click="resetForm('ruleForm')">重&nbsp;&nbsp;&nbsp;置</el-button>
                        </div>
                        <div class="remark">如果您是首次打开IFMS系统，请点击这里下载压缩包，内含获取MAC地址配置文件。</div>
                    </el-form>
                </div>
            </div>




            
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
            passImg: 'nopass',
            ruleForm: {
                uerName: '',
                pass: '',
                mac: ''
            },
        }
    },
    
    mounted() {
      
     
      
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$router.push('moduleManagement')
            // alert('submit!');
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

<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    position: relative;
    background: url('~img/bg-img.png') no-repeat;
    .user {
        width: 70.7%;
        height: 78%;
        background: white;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        display: flex;
        .left-container {
            padding-left: 39px;
            padding-top: 30px;
            width: 51.8%;
            .logo-box {
                img {
                    width: 297.5px;
                    height: 55.5px;
                }
            }
            .middle-box {
                margin-left: 20px;
                margin-top: 20px;
                width: 80.55%;
                height: 73.28%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .version {
                margin-top: 30px;
                font-size: 14px;
            }
        }

        .right-container {
            width: 48%;
            .top-logo {
                margin-top: 90px; 
                img {
                    width: 80%;
                    height: 10.15%;
                }
            }
            .user-form {
                width: 85.12%;
                height: 64.37%;
                border: 1px solid #b3b3b3;
                border-radius: 5px;
                padding-left: 40px; 
                padding-right: 40px; 
                .word-label {
                    font-size: 20px;
                    color: #999999;
                    margin-top: 20px;
                }
                .remark {
                    font-size: 14px;
                    margin-top: 11px;
                }
                .look-pass {
                    position: absolute;
                    width: 18px;
                    height: 11px;
                    z-index: 2;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 1%;
                }
                .btn-box {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    
                    .el-button {
                        width: 41%;
                        border-radius: 30px;
                        font-size: 18px;
                        color: white;
                        margin-top: 10px;
                        &.right-btn {
                            background: #999999;
                        }
                    }
                }
                .el-input {
                    // border-radius: 100%; 
                    width: 100%;
                    .el-input__inner {
                        background: white;
                        border-radius: 0;
                        border-top-width: 0px;
                        border-left-width: 0px;
                        border-right-width: 0px;
                        border-bottom-width: 1px solid #b3b3b3;
                        // border: 0;
                        // border-bottom: 1px solid #b3b3b3;
                    }
                }
            }
        }
        
    }
    
    
}
</style>
