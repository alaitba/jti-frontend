<template>
	<main class="page page--flex">
		<div class="gifts">
			<div class="container">
				<h3 class="section__title gifts__title">
					Призы
				</h3>
				<div class="gifts__points points">
					<p>
						Количество баллов:
						<span v-if="balance">
							{{balance}}
						</span>
						<span v-else>
							0
						</span>
					</p>
				</div>
				<div class="gifts__wrapper" v-if="gifts.length">
					<div class="item" v-for="(item,key) in gifts" v-if="item.qty!=0">
						<div class="item__img" v-if="item.images">
							<img :src="item.images[0].origin_url" alt="" v-if="item.images[0]">
						</div>
						<div class="item__content">
							<div>
								<h4 class="title">
									{{item.price}} <span>баллов</span>
								</h4>
								<p class="text">
									{{item.name}}
								</p>
								<p class="left" v-if="item.totalQty!=null">
									Осталось штук: {{item.totalQty | formatAmount}}
								</p>
							</div>
							<div>
								<nuxt-link class="link" :to="{name : 'Anketa-Gifts-id', params: {id : item.rewardId}}">
                  Получить приз
                </nuxt-link>
							</div>
						</div>
					</div>
				</div>

				<!-- <div class="gifts__wrapper">
					<div class="item" v-for="(item,key) in gifts">
						<div class="item__img">
							<img :src="item.url" alt="">
						</div>
						<div class="item__content">
							<div>
								<h4 class="title">
									{{item.points}} <span>баллов</span>
								</h4>
								<p class="text">
									{{item.name}}
								</p>
								<p class="left" v-if="item.left!=null">
									Осталось штук: {{item.left | formatAmount}}
								</p>
							</div>
							<div>
								<nuxt-link class="link" :to="{name : 'Anketa-Gifts-id', params: {id : 'd492446f-2826-ea11-80cc-1cc1dee6b654'}}">
									Получить приз
								</nuxt-link>
							</div>
						</div>
					</div>
				</div> -->
			</div>
		</div>
		<footer-anketa/>
		<modal-error/>
	</main>
</template>
<script>
	import FooterAnketa from '~/components/layouts/Footer/Footer.vue'
	import ModalError from '~/components/layouts/Modals/ModalError.vue'
	export default {
		components:{
			FooterAnketa,
			ModalError
		},
		filters:{
			formatAmount(value){
				// return typeof(value)
				if(typeof(value)!='string' && value!=null){
					return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
				} else{
					return value
				}
			}
		},
		data(){
			return {
				gifts:[
					{
						name: 'Купон для участия в розыгрыше',
						points: 25,
						left: '∞',
						url: '/gifts/10.png'
					},
					{
						name: 'Пополнение баланса ',
						points: 50,
						left: 6000,
						url: '/gifts/15.png'
					},
					{
						name: 'Футболка',
						points: 100,
						left: 2400,
						url: '/gifts/11.png'
					},
					{
						name: 'Плед',
						points: 150,
						left: 1700,
						url: '/gifts/12.png'
					},
					{
						name: 'Термокружка',
						points: 175,
						left: 1600,
						url: '/gifts/13.png'
					},
					{
						name: 'Зонт',
						points: 200,
						left: 1200,
						url: '/gifts/14.png'
					},
					{
						name: 'Сертификат Технодом на 5000 тг',
						points: 250,
						left: 500,
						url: '/gifts/16.png'
					},
					{
						name: 'Толстовка',
						points: 300,
						left: 500,
						url: '/gifts/17.png'
					},
					{
						name: 'Power-bank Xiaomi',
						points: 350,
						left: 600,
						url: '/gifts/18.png'
					},
					{
						name: 'Утюг Maxwell',
						points: 400,
						left: 600,
						url: '/gifts/19.png'
					},
					{
						name: 'Чайник Vitek',
						points: 500,
						left: 400,
						url: '/gifts/20.png'
					},
					{
						name: 'Беспроводные наушники Xiaomi',
						points: 600,
						left: 250,
						url: '/gifts/21.png'
					},
					{
						name: 'Рюкзак',
						points: 700,
						left: 300,
						url: '/gifts/22.png'
					},
					{
						name: 'Мультиварка Redmond',
						points: 800,
						left: 340,
						url: '/gifts/23.png'
					},

				],
				balance:'',
			}
		},
		mounted(){
			this.getBalance();
			this.getPrizes();
		},
		methods:{
			showModal(modal){
				$('#modal-error').modal('show')
			},

			async getBalance(){

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

				await this.$axios.get('/rewards/balance')
					.then(response =>{
						this.balance = response.data.balance;

					}).catch(error =>{
						// console.log('error',error.response)
					})

			},

			async getPrizes(){

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

				await this.$axios.get('/rewards/available')
					.then(response =>{
						if(response.data.rewards.length){
							this.gifts = response.data.rewards;
						}

					}).catch(error =>{
						// console.log('error',error.response)
					})

			}
		}
	}
</script>
<style lang="scss">
	main.page{

	}
	.points{
		margin-top: 16px;
	}
	.gifts{
		padding: 16px 0 120px 0;
		width: 100%;
		&__wrapper{
			.item{
				display: flex;
				background: #FFFFFF;
				margin-top: 8px;
				box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 4px 8px rgba(0, 0, 0, 0.04);
				border-radius: 8px;
				padding: 8px;
				&__img{
					img{
						// max-width: 100%;
						max-height: 121px;
					}
				}
				&__content{
					margin-left: 16px;
				    display: flex;
				    flex-direction: column;
				    justify-content: space-between;
					.title{
						margin-top: 8px;
						line-height: 25px;
					}
					.text{
						font-weight: 300;
						font-size: 16px;
						line-height: 19px;
						color: #1F1F1F;
						margin-bottom: 0;
					}
					.left{
						font-weight: normal;
						font-size: 12px;
						line-height: 14px;
						color: #969696;
						margin-bottom: 5px;
					}
					.link{
						font-weight: bold;
						font-size: 14px;
						line-height: 16px;
						color: #05B186;
						background: transparent;
						box-shadow: none;
						border:0;
						padding: 0;
						&:hover{
							text-decoration: none;
						}
					}
				}
			}
		}
	}
</style>
