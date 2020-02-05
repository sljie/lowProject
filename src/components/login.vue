<template>
    <div class="header">
      11111111

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
          
        }
    },
    
    mounted() {
      
     
      
    },
    methods: {
      
    },
    beforeDestroy() {
      eBus.unregister(constants.HEADER)
  	}
}
</script>

<style lang="scss" scoped>

</style>
