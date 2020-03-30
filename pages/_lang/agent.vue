<template>
	<main class="page page--flex page--grey">
		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="agent">
				<div class="container">
					<h3 class="section__title section__title--profile">						
						{{$t('agent-title')}}				
	    			</h3>
	    			<p class="agent__text">
	    				{{$t('agent-text')}}					    				
	    			</p>
	    			<button class="button button--green" type="button" @click="sendToAgent()" :disabled="btnStatus">
	    				{{$t('agent-button-text')}}				
	    			</button>
				</div>				
			</div>
		</template>

		<modal-main :title="title" :text="text" :img="img" :btnText="btnText"></modal-main>
	</main>
</template>
<script>
	export default{
		data(){
			return{
				loaderStatus: false,
				btnStatus: false,
				title:'',
				img:'',
				text:'',
				btnText: ''
			}
		},
		methods:{
			async sendToAgent(){
				
				this.btnStatus = true;
				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

				try {
					let res = await this.$axios.$get('/agent/call');
					
					this.btnStatus = false;

					// this.title="Заявка принята!"

					this.title = this.$t('agent-success-title');
	              	this.text=this.$t('agent-success-text');
	              	this.img="agent"
	              	this.btnText = 'agent'
		            $('#modal-main').modal('show')

				} catch(error){
					this.btnStatus = false;
					console.log('errorAgent: ', error)

					this.title= this.$t('agent-error-title');
	              	this.text = this.$t('agent-error-text');
					this.img = 'error'
	              	this.btnText = 'agent'
		            $('#modal-main').modal('show')
		            
				}
			}
		}
	}
</script>
<style lang="scss">
	.agent{
		width: 100%;
		padding: 16px 0 100px 0;
		&__text{
			font-weight: 300;
			font-size: 16px;
			line-height: 19px;
			color: #000000;
			margin-top: 8px;
			margin-bottom: 32px;
		}
	}
</style>		