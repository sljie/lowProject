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
                        <div class="word-label first" >用户名</div>
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
        width: 70.5%;   // 1396
        height: 78.10%;
        background: white;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        display: flex;
        .left-container {
            height: 100%;// 843.5
            // 百分比1396
            margin-left: 2.97%;
            padding-top: 2.33%;
            padding-bottom: 2.51%;
            width: 44.77%; // 625/1396
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            .logo-box {
                width: 50.24%; //314px/625;
                height: 7.48%;// 60px/690;
                img {
                    width: 100%;
                    height: 100%;
                    // width: 41.15%; //297.5px;
                    // height: 6.58%;//55.5px;
                }
            }
            .middle-box {
                // margin-left: 20px;
                // margin-top: 20px;
                width: 92.32%; //577/625
                height: 74.5%; // 598 分母 0.9516 * 843.5
                margin-top: -5%;
                margin-left: 6.1%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .version {
                // margin-top: 30px;
                font-size: 14px;
                color: #333;

            }
        }

        .right-container {
            height: 100%;
            width: 55.23%;
            padding-left: 4.94%; //69/1396
            padding-top: 7.95%;
            position: relative;
            left: 3%;
            .top-logo {
                // width 分母 702   （55.23-4.94）*1396
                // height分母 776.4 0.9205 * 843.5
                // margin-top: 90px; 
                width: 76.57%;
                height: 11.01%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .user-form {
                width: 81.55%;
                height: 73%;
                border: 1px solid #b3b3b3;
                border-radius: 5px;
                padding-left: 5.7%; 
                padding-right: 5.7%; 
                .word-label {
                    font-size: 18px;
                    color: #999999;
                    margin-top: 5.6%;
                    &.first {
                        margin-top: 6.0%;
                    }
                }
                .remark {
                    font-size: 12px;
                    margin-top: 11px;
                    color: #333;
                }
                .look-pass {
                    position: absolute;
                    width: 18px;
                    height: 11px;
                    z-index: 2;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 0.8%;
                }
                .btn-box {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    
                    .el-button {
                        width: 40.1%;
                        border-radius: 30px;
                        font-size: 18px;
                        color: white;
                        margin-top: 2.6%;
                        margin-bottom: 1%;
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
