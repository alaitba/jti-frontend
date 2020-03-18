<template>
	<main class="page page--grey">
		<header-auth/>
		<div class="container">			
			<div class="select-store options options" v-if="tradepoints">
				<template v-for="(item,key) in tradepoints">
					<div :class="{'options__item options__item--radio' : true, 'active': selected == item.account_code}">
						<label class="radiobutton-container">
							<input type="radio" v-model="selected" :value="item.account_code" name="radio" @change="changeTradepoint()">
							<span class="checkmark"></span>
							<p class="title">						
								Магазин «{{item.account_name}}»						
							</p>
							<p class="address">
								{{item.city}}, {{item.street_address}}
							</p>					
						</label>						
					</div>					
				</template>				
			</div>			

			<div class="continue">
				<div class="container">					
					<button class="button button--green fixed" v-if="selected.length" @click="setTradePoint()">
						Продолжить
					</button>	
					<button class="button button--green fixed" disabled v-else>
						Продолжить
					</button>
				</div>
			</div>			
		</div>
	</main>
</template>
<script>
	import HeaderAuth from '~/components/layouts/Header/Header-Auth.vue'
	import {mapState, mapMutations} from 'vuex'
	export default{
		components:{
			HeaderAuth	
		},
		middleware:[
			'select-store'
		],
		layout:'auth',
		data(){
			return {
				selected: '',	
				showSelected: '',
			}
		},
		computed: {
		    ...mapState({
		      tradepoints: state => state.tradepoints,
		      authToken: state => state.authToken,          
		    }),
		},
		methods: {
			changeTradepoint(){
				// this.showSelected = this.selected;
				this.$store.commit('setTradePoint', this.selected)
			},
			async setTradePoint(){
				let fields = {
					'account_code': this.selected,
				}

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

				try{
					let res = await this.$axios.$post('/auth/set-tradepoint', fields
						)		
						// console.log(res,'res')		
						localStorage.setItem("setTradePoint", 't');   
						localStorage.setItem("tradepoint", JSON.stringify(res.tradepoint));
						localStorage.setItem('account',JSON.stringify(res.account));
			            localStorage.setItem('tradeagent',JSON.stringify(res.tradeagent));       
						this.$router.push('/');
				} catch(err){						
					if(err.response.data == "Unauthorized."){
						localStorage.clear();
					    this.$store.commit('resetState');
				    	this.$router.push('/auth/signin')
					}
					// if(err.response.data.message=="Unauthorized"){
					// 	localStorage.clear()
					// 	this.$store.commit('resetState');
					
					// }
				}
			}
		}
	}
</script>
<style lang="scss">
	main{
		&>.container{
			position: relative;
		}
	}
	.select-store{
		margin-top: 16px;
		padding-bottom: 100px;
		&__item{
			
		}
	}
	.continue{
		position: fixed;
		width: 100%;
		bottom: 16px;
		left: 0;
	}
	.button--green{
		width: 100%;		
		text-align: center;
		display: block;
		&:hover{
			text-decoration:none;
			color:#fff;
		}
		// max-width: 300px;		
	}
</style>