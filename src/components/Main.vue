<template>
<div class="main">
	<el-container style="height:100%;">
		<el-header>
      <my-header></my-header>
    </el-header>
		<el-container>
			<el-aside width="200px">
        <my-menu> </my-menu>
      </el-aside>
			<el-main v-loading="loading">
				<div class="content">
					<router-view />
				</div>
				<!-- <feedback :submit="feedback" @toggle="feedbackOpen = !feedbackOpen" :isOpen="feedbackOpen"></feedback> -->
      </el-main>
		</el-container>
	</el-container>
</div>
</template>

<script>
import feedback from '@/components/commons/feedback'
import MyHeader from './header'
import MyMenu from './menu'
import constants from '@/js/constants'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
export default {
  components: {
    MyHeader, MyMenu, feedback
  },
	data() {
		return {
			loading: false,
			feedbackOpen: false,
			routes: {},
		}
	},
	mounted() {
		this.routes[constants.ROLE_DEVELOPER] = 'devProjects'
		this.routes[constants.ROLE_TESTER] = 'testProjects'
		this.routes[constants.ROLE_OPS] = 'opsProjects'
    this.loading = true
		var _self = this
		if (this.user !== null) {
			this.loading = false
			_self.init()
		} else {
			eBus.register(constants.MAIN, function(data) {
				switch (data.mutationType) {
					case types.LOGIN:
						_self.loading = false
						_self.init()
						break
					case types.NOTICES:
						_self.getMarqueeData()
						break
				}
			})
		}
	},
	computed: {
		...mapGetters(['user'])
	},
	methods: {
		init() {
			this.routeView()
		},
		routeView() {
			//默认路由
			if(this.$route.path === '/') {
				this.$router.replace({
					name: 'events' 
				})
			}
		},
		feedback(content) {
			var data = new FormData()
			data.append('opinions', content)
			axios({
				url: '/PublishPlatform/projectManage/opinionadd',
				method: 'post',
				data
			}).then(res => {
				if (res.success) {
					this.$message({
						message:  '我们已收到您的反馈',
						type: 'success'
					})
				} else {
					this.$message.error(res.msg)
				}
				this.feedbackOpen = false
			}).catch(error => {
				this.feedbackOpen = false
				this.$message.error('处理失败')
			})
		}
	},
	beforeRouteUpdate (to, from, next) {
		if(to.path === '/') {
			this.$router.replace({
				name: this.routes[this.user.role]
			})
		} else {
			next()
		}
	},
	beforeDestroy() {
		eBus.unregister(global.MAIN)
	}
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
	position: relative;
}
.el-main {
	padding: 0;
}
.content {
	padding: 20px;
}
</style>
