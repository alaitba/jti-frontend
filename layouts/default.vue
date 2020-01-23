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
    computed: {
      ...mapState({
        user: state => state.user,        
      })
    },

  }
</script>
<style>

</style>
