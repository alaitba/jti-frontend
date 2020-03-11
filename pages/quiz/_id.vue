<template>
	<main class="page page--flex page--grey">
  		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			
		</template>		
	</main>
</template>
<script>
	export default{
		data(){
			return {
				loaderStatus: true,
			}
		},
		mounted(){
			console.log('name: ', this.$route.name)
		}
	}
</script>