<template>
    <div class="menu">
      <div class="logo-box">
        <img src="@/assets/logo1.png" alt="">
      </div>
      
      <el-menu
      @select="menuSelectChanged"
      :default-active="$route.name"
      class="el-menu-vertical-demo"
      background-color="rgb(48, 65, 86)"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="events">
          <i class="el-icon-setting"></i>
          <span slot="title">事件配置</span>
      </el-menu-item>
      <el-menu-item index="label">
        <i class="el-icon-goods"></i>
        <span slot="title">标签管理</span>
      </el-menu-item>
    </el-menu>
    </div>
</template>

<script>
import constants from '@/js/constants'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
          routes: {}
        }
    },
    computed: {
  		...mapGetters(['user','label','test'])
  	},
    mounted() {
      // this.routes[constants.ROLE_DEVELOPER] = 'devProjects'
  		// this.routes[constants.ROLE_TESTER] = 'testProjects'
  		// this.routes[constants.ROLE_OPS] = 'opsProjects'
    },
    // filters: {
    //   activeFilter(routeName) {
    //     if(/Projects/.test(routeName) || routeName === 'projectDetail') {
    //       return 'projects'
    //     } else {
    //       return routeName
    //     }
    //   }
    // },
    methods: {
      menuSelectChanged(routeName) {
        if (routeName === 'projects') {
          console.log('user', this.user)
          if (this.user) {
            this.$router.replace({
      				name: this.routes[this.user.role]
      			})
          }
        } else {
          this.$router.push({name: routeName})
          if(routeName === 'label'){
            
            this.$store.dispatch('changeIndexInit');
            console.log(this.label)
          }
        }
      }
    }
}
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  background-color: rgb(48, 65, 86);
  width: 180px;
  .logo-box {
    width: 180px;
    height: 75px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
}
</style>
