<!-- 跑马灯 -->
<template>
<div class="marquee" id="marquee" v-if="data.length > 0">
	<div class="content" id="marquee-content">{{content}}</div>
	<div class="update-tips" v-if="updating">
		更新中...
	</div>
</div>
</template>

<script>
import TWEEN from 'tween.js'
export default {
	props: {
		data: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
      index: 0,
			content: '',
			tween: null,
			updating: false,
		}
	},
  watch: {
    data() {
      console.log('changed')
			this.index = 0
			if(this.tween != null) {
				this.content = ''
				this.updating = true
				this.tween.stop()
				setTimeout(() => {
					this.updating = false
					this.init()
				},1000)
			} else {
				this.init()
			}
    }
  },
	mounted() {
    this.init()
	},
	methods: {
		init() {
			if(this.data.length > 0) {
				this.content = this.data[0].addname + ': ' + this.data[0].content
	      this.$nextTick(() => {
	        //  执行一次动画
	        this.runing()
	      })
	    }
		},
    setup(next) {
      // 完成一次动画后
      if(this.index < this.data.length - 1) {
        this.index ++
				var item = this.data[this.index]
        this.content = item.addname + ': ' + item.content
      } else {
        // 重新执行第一条内容
        this.index = 0
				var item = this.data[this.index]
        this.content = item.addname + ': ' + item.content
      }
      this.$nextTick(() => { next() })
    },
		runing() {
			function animate() {
				if (TWEEN.update()) {
					requestAnimationFrame(animate)
				}
			}

      var run = () => {
        var start = document.getElementById('marquee').offsetWidth
        var target = document.getElementById('marquee-content')
        var end = -target.offsetWidth
  			var position = {
  				x: start
  			}
				var speed = 0.05 // 速度
				var duration = (target.offsetWidth + start) / speed
        this.tween = new TWEEN.Tween(position)
  				.to({ x: end }, duration)
  				.onUpdate(() => {
            target.style.webkitTransform = 'translateX('+position.x+ 'px)'
  				})
          .onComplete(() => {
            this.setup(() => { run() }) // 设置完下次滚动内容后，继续执行动画
          })
  			.start()
  			animate()
      }
      run() //开始执行动画
		}
	}
}
</script>

<style lang="scss" scoped>
.marquee {
    overflow: hidden;
    color: #569ea0;
    font-size: 14px;
		position: relative;
		&:before {
			z-index: 1;
			content: '';
			display: block;
			position: absolute;
			left: 0;
			height: 23px;
			width: 35px;
			background: linear-gradient(90deg, #373c42, transparent);
		}
		&:after {
			content: '';
			display: block;
			position: absolute;
			right: 0;
			height: 23px;
			width: 35px;
			background: linear-gradient(90deg, transparent , #373c42);
		}
}
.content {
    height: 23px;
    line-height: 23px;
    float: left;
    white-space: nowrap;
    padding-left: 10px;
    padding-right: 10px;
}
.update-tips {
	z-index: 1;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	height: 23px;
	line-height: 23px;
	text-align: center;
}
</style>
