<!-- 反馈 -->
<template>
<div class="feedback">
	<div class="btn" @click="toggle()">
		<div class="wrapper" v-if="!isOpen">
			<span class="path path1"></span>
			<span class="path path2"></span>
			<span class="path3"></span>
		</div>
		<div v-else class="close-btn">
			<i class="el-icon-close"></i>
		</div>
	</div>

	<el-card :body-style="bodyStyle" class="box-card" v-show="isOpen">
		<p class="title">您的意见是我们前进的 <span class="power">动力</span></p>
		<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="content" resize="none"></el-input>
    <div class="submit-btn">
    <el-button type="primary" size="small" :disabled="disabled" @click="ok()">提交反馈</el-button>
    </div>
	</el-card>

</div>
</template>

<script>
export default {
  props: {
    submit: {
      type: Function,
      default: null
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
	data() {
		return {
      bodyStyle: {
        padding: '15px'
      },
      disabled: true,
      content: '',
		}
	},
  watch: {
    content: function(val) {
      this.disabled = !val
    },
    isOpen: function(val) {
      if(!val) this.content = ''
    }
  },
	mounted() {

	},
	methods: {
    ok() {
      if(this.submit) {
        this.submit(this.content)
      }
    },
		toggle() {
			this.$emit('toggle')
		},
	}
}
</script>

<style lang="scss" scoped>
.feedback {
		z-index: 9;
    position: fixed;
    right: 50px;
    bottom: 50px;
}
.btn {
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 1px 1px 9px 1px #afafaf;
    height: 39px;
    width: 47px;
    background: #F34258;
    position: relative;

    .wrapper {
        height: 100%;
        width: 100%;
        position: relative;
        &:before {
            z-index: 0;
            position: absolute;
            left: -10px;
            top: 0;
            content: '';
            display: block;
            width: 0;
            height: 0;
            border-top: 20px solid #F34258;
            border-right: 20px solid transparent;
            border-left: 20px solid transparent;
        }
    }
    .path {
        position: absolute;
        background: white;
        height: 5px;
        width: 5px;
        top: 9px;
        border-radius: 5px;
    }
    .path1 {
        left: 10px;
    }
    .path2 {
        left: 31px;
    }
    .path3 {
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        position: absolute;
        background: white;
        height: 7px;
        width: 15px;
        top: 23px;
        left: 16px;
    }
}

.close-btn {
    height: 100%;
    width: 100%;
    background: relative;
    i {
        font-weight: bold;
        color: white;
        position: absolute;
        left: 11px;
        top: 8px;
        font-size: 25px;
    }
}

.box-card {
    position: absolute;
    top: -213px;
    left: -364px;
    width: 350px;
    .title {
      margin: 0;
      margin-bottom: 10px;
      .power {
        font-weight: bold;
        font-size: 20px;
        font-style: italic;
        color: #F34258;
      }
    }
    .submit-btn {
      padding-top: 15px;
      text-align: right;
    }
}
</style>
