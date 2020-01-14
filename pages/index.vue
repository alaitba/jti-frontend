<template>
  <main class="page">
    <div class="container">
     	<h4>
     		tradepoint:{{ tradepoint }}
     	</h4>
    </div>
  </main>
</template>

<script>
	import HeaderAuth from '~/components/layouts/Header/Header-Auth.vue'
	import {mapState, mapMutations} from 'vuex'
	export default {
	  	components: {
	      HeaderAuth,      
	    },
	    computed: {
	      ...mapState({
	        tradepoint: state => state.tradepoint,      
	      })
	    },
	}
</script>

<style>

</style>
