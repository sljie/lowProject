<template>
    <div class="header">
      <span class="title">管理系统</span>

      <div class="marquee-box">
        <marquee :data="marquees"></marquee>
      </div>
      <div class="right-text">
        <span>欢迎 {{user ? role[user.role] : '您'}}: {{ user ? user.nickName : '' }}</span> | <span @click="signOut" class="login-out">退出</span>
      </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import marquee from '@/components/commons/marquee'
import constants from '@/js/constants'
import * as types from '@/store/mutation-types'
export default {
    components: {
      marquee
    },
    data() {
        return {
          roleName: '',
          role: {
            '0': '您',
            '2': '您',
            '3': '您'
          },
          marquees: []
        }
    },
    computed: {
  		...mapGetters(['user'])
  	},
    mounted() {
      var _self = this
  		// if (this.user !== null) {
  		// 	this.getMarqueeData()
  		// }
      // eBus.register(constants.HEADER, function(data) {
			// 	switch (data.mutationType) {
      //     case types.LOGIN:
			// 			_self.getMarqueeData()
			// 			break
			// 		case types.NOTICES:
			// 			_self.getMarqueeData()
			// 			break
			// 	}
      // })
     
      
    },
    methods: {
      getMarqueeData() {
        axios({
          url: '/PublishPlatform/projectManage/messageshow',
          method: 'post',
          params: {
            page: 1,
            rows: 5,
          }
        }).then(res => {
          if (res.success) {
            this.marquees = res.data.list
          }
        })
      },
      signOut() {
        if (this.user) {
          axios.post('/logout').then(res => {
    				if (res.success) {
    					location.href = res.data
    				} else {
              this.$message.error('退出失败：' + res.msg)
            }
    			})
        } else {
          this.$message.warning('网路延迟, 请重试')
        }
      }
    },
    beforeDestroy() {
      eBus.unregister(constants.HEADER)
  	}
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: 100%;
  background: #373c42;
  justify-content: center;
  align-items: center;
}
.title {

  color: white;
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  padding-right: 20px;
}
.marquee-box {
  flex: 1;
  overflow: hidden;
  // width: 400px;
  padding-left: 20px;
  padding-right: 20px;
}
.right-text {
  color: white;
  span {
    padding: 2px;
    display: inline-block;
    color: white;
  }
}
.login-out {
  margin-right: 10px;
  cursor: pointer;
}
</style>
