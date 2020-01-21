<template>
	<main>
		<header-auth/>
		<div class="container">			
			<div class="select-store" v-if="tradepoints">
				<template v-for="(item,key) in tradepoints">
					<div :class="{'select-store__item item' : true, 'active': selected == key}">
						<label class="radiobutton-container">
							<input type="radio" v-model="selected" :value="key" name="radio" @change="changeTradepoint()">
							<span class="checkmark"></span>
						</label>
						<p class="title">						
							Магазин «{{item.account_name}}»						
						</p>
						<p class="address">
							{{item.city}}, {{item.street_address}}
						</p>					
					</div>
				</template>
				<template>
					{{showSelected}}
				</template>
			</div>
			<!-- <div class="select-store" v-if="!tradepoints">
				<div :class="{'select-store__item item' : true, 'active': selected =='Один'}">
					<label class="radiobutton-container">
						<input type="radio" v-model="selected" value="Один" name="radio" >
						<span class="checkmark"></span>
					</label>
					<p class="title">						
						Магазин «Супермаркет»						
					</p>
					<p class="address">
						Алматы, ул. Байтурсынова 123, блок 2
					</p>					
				</div>
				<div :class="{'select-store__item item' : true, 'active': selected=='два'}">
					<label class="radiobutton-container">
						<input type="radio" v-model="selected" value="два" name="radio" >
						<span class="checkmark"></span>
					</label>
					<p class="title">						
						Магазин «Супермаркет»						
					</p>
					<p class="address">
						Алматы, ул. Байтурсынова 123, блок 2
					</p>					
				</div>
				<div :class="{'select-store__item item' : true, 'active': selected=='три'}">
					<label class="radiobutton-container">
						<input type="radio" v-model="selected" value="три" name="radio" >
						<span class="checkmark"></span>
					</label>
					<p class="title">						
						Магазин «Супермаркет»						
					</p>
					<p class="address">
						Алматы, ул. Байтурсынова 123, блок 2
					</p>					
				</div>
				<div :class="{'select-store__item item' : true, 'active': selected=='четыре'}">
					<label class="radiobutton-container">
						<input type="radio" v-model="selected" value="четыре" name="radio" >
						<span class="checkmark"></span>
					</label>
					<p class="title">						
						Магазин «Супермаркет»						
					</p>
					<p class="address">
						Алматы, ул. Байтурсынова 123, блок 2
					</p>					
				</div>
			</div> -->
			

			<div class="continue">
				<div class="container">
					<button class="button button--green fixed" disabled v-if="!selected.length">
						Продолжить
					</button>
					<button class="button button--green fixed" v-if="selected.length" @click="setTradePoint()">
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

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+this.authToken;

				try{
					let res = await this.$axios.$post('http://jti.ibec.systems/api/v1/auth/set-tradepoint', fields
						)				
						this.$router.push('/');
				} catch(err){
					// console.log(err,'err')
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
		&__item{
			background: #FFFFFF;			
			border: 1px solid #969696;
			box-sizing: border-box;
			border-radius: 5px;
			margin-bottom: 8px;
			padding: 12px 12px 12px 36px;
			position: relative;
			cursor: pointer;
			&.active{
				background: #C2EEE3;				
				border: 1px solid #05B186;
				.address{
					color: #217461;
				}
			}
			.title{
				font-weight: 500;
				font-size: 16px;
				line-height: 19px;
				color: #217461;
				margin-bottom: 0;
			}
			.address{
				font-weight: normal;
				font-size: 12px;
				line-height: 14px;				
				color: #969696;
				margin-bottom: 0;
			}
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