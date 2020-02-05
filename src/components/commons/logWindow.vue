<!-- 输出控制台 -->
<template>
    <div class="logWindow" v-show="isShow">

      <div class="inner">
        <div class="slider" v-if="serverList.length > 0">
          <div class="title">
            服务器列表
          </div>
          <div class="content">
            <p class="sr-item" v-for="item in serverList">
              <i :class="checkStatus(item)"></i>{{item.host}}
            </p>
          </div>
        </div>
        <div class="container">
          <div class="close-btn" @click="handleClose">
            x
          </div>
          <div class="title">
            > 输出控制台
          </div>
          <div id="log-content" class="content">
            <pre>{{logs}}</pre>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      query: {
        type: Function,
        default: () => {}
      },
      serverList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
        return {
          timer: null,
          logs: ''
        }
    },
    watch: {
      isShow: function(val) {
        if (val) {
           if(this.query) {
             if (!this.timer) {
             this.timer = setInterval(() => {
                 this.queryLog()
               },2000)
             }
           } else {
             this.clearTimer()
           }

        } else {
          this.clearTimer()
        }
      }
    },
    mounted() {},
    methods: {
      checkStatus(item) {
        switch (item.checkStatus) {
          case 0:
            return 'el-icon-close error'
          case 1:
            return 'el-icon-check success'
          case 2:
            return 'el-icon-loading loading'
          case 3:
            return 'el-icon-minus stop'
        }
      },
      queryLog() {
        this.query(log => {
          console.log(log)
          this.logs = log
          this.$nextTick(() => {
            if (document.getElementById("log-content")) {
              var objDiv = document.getElementById("log-content")
              objDiv.scrollTop = objDiv.scrollHeight
            }
          })
        })
      },
      clearTimer() {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
      },
      handleClose() {
        this.$emit('close')
      }
    },
    beforeDestroy() {
      this.clearTimer()
    }
}
</script>

<style lang="scss" scoped>

@mixin none-select {
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}

.logWindow {
  position:fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 999999;
}
.inner {
  padding-top: 25px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -400px;
  margin-top: -245px;
  width: 700px;
  height: 490px;
  background-color: #1E1F29;
  color: #FDFDFD;
  box-shadow: 0px 1px 6px 1px #151313;
  border: 1px solid white;
  border-radius: 3px;
  .container {
    overflow: auto;
  }

  .close-btn {
    z-index: 2;
    @include none-select;
    text-align: center;
    height: 25px;
    line-height: 25px;
    width: 25px;
    position: absolute;
    top:0;
    right: 0;
    font-size: 18px;
    cursor: pointer;
  }

  .title {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;

    @include none-select;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    padding-left: 10px;
    background: #25354c;
    border-bottom: 1px solid white;
  }
  .content {
    height: 462px;
    // height: 100%;
    overflow: auto;
    padding-top: 8px;
  }
  pre {
    overflow: auto;
    line-height: 1.6;
    font-size: 14px;
    margin:0;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 5px;
  }

  .slider {
    box-shadow: 0px 1px 6px 1px #151313;
    border: 1px solid white;
    padding: 10px;
    background: #1E1F29;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 200px;
    right: -230px;
    z-index: 2;
  }
  .success {
    font-size: 12px;
    margin-right: 3px;
    color: #00CD00;
  }

  .error {
    font-size: 12px;
    margin-right: 3px;
    color: red;
  }
  .loading {
    font-size: 12px;
    margin-right: 3px;
    color: #D1975D;
  }
  .stop {
    font-size: 12px;
    margin-right: 3px;
    color: #9DA5B2;
  }
}
</style>
