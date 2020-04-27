<template>
  <div>
    <Header-Store/>
    <nuxt />
  </div>
</template>

<script>
  import HeaderStore from '~/components/layouts/Header/Header-store.vue'
  import {mapState, mapMutations} from 'vuex'

  export default {
    middleware: ['authenticated'],
    components: {
      HeaderStore,      
    },
    mounted(){ 
      // console.log('route-name', this.$route.name)
    },
    computed: {
      ...mapState({
        user: state => state.user,        
      })
    },
    methods:{  
    }

  }
</script>
<style>

</style>
