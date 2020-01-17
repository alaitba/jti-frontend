<template>
  <div>
    <!-- <Header-Auth /> -->    
    <nuxt />
  </div>
</template>

<script>
  // import HeaderAuth from '~/components/layouts/Header/Header-Auth.vue'
  import {mapState, mapMutations} from 'vuex'

  export default {
    middleware: ['authenticated'],
    // components: {
    //   HeaderAuth,      
    // },
    computed: {
      ...mapState({
        user: state => state.user,        
      })
    },

  }
</script>
<style>

</style>
