<template>
	<main class="page page--flex page--grey">
		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="gifts gifts-inside">
				<div class="container">
					<h3 class="section__title section__title--link" @click="$router.go(-1)">
						<!-- <nuxt-link to="/anketa/gifts"> -->
							{{$t('Призы')}}
						<!-- </nuxt-link>	 -->
					</h3>
					<div class="gifts__points points">
						<p>
							{{$t('Количество баллов:')}}
							<span v-if="balance">
								{{balance}}
							</span>
							<span v-else>
								0
							</span>
						</p>
					</div>


					<div class="gift" v-if="gift">
						<div class="gift__slider" v-if="gift.images.length>1">
							<swiper :options="swiperOption" ref="mySwiper">
								<swiper-slide v-for="(item,key) in gift.images" :key="key">
		    						<img :src="item.origin_url" alt="">
		    					</swiper-slide>
		    					<!-- <swiper-slide>
		    						<img src="~assets/img/gifts/inside/1.png" alt="">
		    					</swiper-slide>
							    <swiper-slide>
							    	<img src="~assets/img/gifts/inside/1.png" alt="">
							    </swiper-slide>
							    <swiper-slide>
							    	<img src="~assets/img/gifts/inside/1.png" alt="">
							    </swiper-slide>
							    <swiper-slide>
							    	<img src="~assets/img/gifts/inside/1.png" alt="">
							    </swiper-slide> -->
							    <div class="swiper-pagination" slot="pagination"></div>
		    				</swiper>
						</div>
						<div class="gift__banner" v-else-if="gift.images.length==1">
							<img :src="gift.images[0].origin_url" alt="">
						</div>
						<div class="gift__content">
							<h4 class="point" v-if="gift.price">
								{{gift.price | formatPrice}} {{$t('баллов')}}
							</h4>
							<p class="title" v-if="gift.name">
								{{gift.name[$i18n.locale ==='kk' ? 'kz' : 'ru']}}
							</p>
							<template v-if="gift.rewardId=='069ab460-263c-ea11-80cc-1cc1dee6b654' || gift.rewardId=='7b9f8a06-0a44-ea11-80cc-1cc1dee6b654'">
			                    <p class="left" v-if="gift.totalQty">
			                    	{{$t('количество не ограничено')}}
			                    </p>
			                  </template>
			                  <template v-else>
			                  	<p class="left" v-if="gift.totalQty!=null">
			                    	{{$t('Осталось штук:')}} {{gift.totalQty | formatAmount}}
			                    </p>
		                  	</template>

							<div class="text" v-if="gift.description" v-html="gift.description[$i18n.locale ==='kk' ? 'kz' : 'ru']"></div>
							<!-- <p class="text" v-if="gift.description">
								{{gift.description}}
								Рюкзак сделан из велюра зеленого цвета. На рюкзаке термопечатью нанесен логотип JTI Company <br>
								<strong>Внимание!</strong> Определенный приз можно заказать только 1 раз. При заказе приза, представитель JTI доставит вам его на торговую точку.
							</p> -->
						</div>
					</div>
				</div>
				<div :class="{'gifts__select' : true, 'kz': $i18n.locale === 'kk'}">
					<div class="container">
						<button type="button" class="button button--green" :disabled="btnStatus" @click="getCurrentPrize()">
							{{$t('Получить приз')}}
						</button>
					</div>
				</div>
			</div>
			<footer-anketa/>
			<modal-error/>
			<modal-main :title="title" :text="text" :img="img" :btnText="btnText"></modal-main>
		</template>
	</main>
</template>
<script>
	import FooterAnketa from '~/components/layouts/Footer/Footer.vue'
	import ModalError from '~/components/layouts/Modals/ModalError.vue'
	import ModalMain from '~/components/layouts/Modals/modal-main.vue'
	import {mapState, mapMutations} from 'vuex'
	export default {
		components:{
			FooterAnketa,
			ModalError,
			ModalMain,
		},
		filters:{
			formatAmount(value){
				// return typeof(value)
				if(value!=null){
					if(typeof(value)!='string'){
						return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
					} else{
						return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
					}
				} else{
					return value
				}
			},
			formatPrice(value){
		        return parseInt(Number(value));
		    },
		},
		data(){
			return {
				swiperOption: {
	    			pagination:{
	    				el: '.swiper-pagination',
		    			dynamicBullets: true
	    			}
	    		},
				balance:'',
				gift: '',
				btnStatus: false,
				loaderStatus: true,

				title:'',
				text:'',
				img:'',
				btnText: '',

				tradePoint : localStorage.getItem("tradepoint") ? JSON.parse(localStorage.getItem("tradepoint")) : null,
			}
		},
		mounted(){
			this.getBalance();
			this.getPrizes();
			console.log('locale',this.$i18n.locale);
		},
		computed:{
			...mapState({
        		auth: state => state.auth,
                phoneNumber: state => state.number,
      		}),
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

				// let fields = {
				// 	'reward_id': this.$route.params.id,
				// }

				// console.log(fields)
				await this.$axios.get('/rewards/available')
					.then(response =>{
						// if(response.data.rewards.length){
							for(var i =0; i< response.data.rewards.length;i++){
								if(response.data.rewards[i].rewardId == this.$route.params.id){
									this.gift = response.data.rewards[i];
									this.loaderStatus = false;
								}
							}

					}).catch(error =>{
						console.log('error',error.response)
					})

			},



			async getCurrentPrize(){

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

				let fields = {
					'reward_id': this.$route.params.id,
				}

				this.btnStatus = true;
				// console.log(fields)
				await this.$axios.get('/rewards/get?reward_id=' + this.$route.params.id)
					.then(response =>{
						// if(response.data.rewards.length){
						// this.$store.commit('setBalance')
						if(this.gift.rewardId == "7d9f8a06-0a44-ea11-80cc-1cc1dee6b654" || this.gift.rewardId == "089ab460-263c-ea11-80cc-1cc1dee6b654"){
							this.title = this.phoneNumber;
							this.text = this.$t('на указанный номер в ближайшее время будет начислено 500 тг');
							this.img = 'money'
						} else if(this.gift.rewardId == "7b9f8a06-0a44-ea11-80cc-1cc1dee6b654" || this.gift.rewardId=='069ab460-263c-ea11-80cc-1cc1dee6b654'){
							this.title = this.gift.name[this.$i18n.locale ==='kk' ? 'kz' : 'ru'];
							this.text = this.$t("Поздравляем, вы приобрели купон на участие в розыгрыше! Участники розыгрыша и победители будут объявлены в разделе 'Новости'");
							this.img = 'gift'
						} else{
							this.title = this.gift.name[this.$i18n.locale ==='kk' ? 'kz' : 'ru'];
							if(this.$i18n.locale == 'ru'){
								this.text = `приз будет доставлен к вам на точку г. ${this.tradePoint.city} , ул. ${this.tradePoint.street_address} по окончанию программы`;
							} else {
								this.text = `Жүлде сізге ${this.tradePoint.city} қаласы, ${this.tradePoint.street_address} мекен-жайына бағдарламаның соңында жеткізіледі.`
							}
							this.img = 'gift'
						}
						this.btnText = 'gifts'
						$('#modal-main').modal('show');
							// console.log(response.data.rewards,'gift')
							// this.gift = response.data.rewards;
						// }
						this.btnStatus = false;

					}).catch(error =>{
						console.log('error',error.response);
						this.btnStatus = false;
						this.title = this.$t('Недостаточно баллов!');
						this.text = this.$t('У вас не хватает баллов для получения данного приза!');
						this.img = 'alert';
						$('#modal-main').modal('show');
						// this.btnText = 'Вернуться в Призы'
					})

			}
		}
	}
</script>
<style lang="scss">
	// .swiper-pagination-bullet{
	// 	background: #C2EEE3;
	// 	opacity: 1;
	// }
	// .swiper-pagination-bullet-active{
	// 	background: #05B186;
	// }
	//  .swiper-container-horizontal > .swiper-pagination-bullets{
	// 	bottom: 4px;
	// }
	// main.page{
	// 	padding-bottom: 100px;
	// }

	.points{
		margin-top: 16px;
	}
	.container{
		position: relative;
	}
	.gifts{
		&-inside{
			padding: 16px 0 220px 0 !important;
		}
		width: 100%;
		// &__title{
		// 	&--link{
		// 		position: relative;
		// 		padding-left: 25px;
		// 		a{
		// 			color: #969696;
		// 			text-decoration: none;
		// 			&:hover{
		// 				color: #969696;
		// 			}
		// 			&:after{
		// 				content: '';
		// 				position: absolute;
		// 				top: -2px;
		// 				bottom: 0;
		// 				left: 0;
		// 				margin: auto;
		// 				background: url('~assets/img/icons/backlink.svg');
		// 				width: 12px;
		// 				height: 20px;
		// 			}
		// 		}

		// 	}
		// }
		&__select{
			position: fixed;
			width: 100%;
			bottom: 72px;
			z-index: 9;
			&.kz{
			    bottom: 100px;
			}
			@media screen and (max-width: 320px) {
				// bottom: 89px;
			}
		}
		.gift{
			.swiper-slide{
				background: #fff;
				border-radius: 8px;
				img{
					// max-width: 312px !important;
					width: auto;
		    		max-height: 162px !important;
				}
			}
			&__banner, &__slider{
				margin: 16px 0 0 0;
				text-align: center;
				img{
				    width: auto;
		    		// max-height: 162px !important;
		    		max-width: 312px !important;
				}
			}
			&__banner{
				background: #fff;
			    border-radius: 8px;
			    width: 100%;
			    height: 162px;
			    display: flex;
			    align-items: center;
			    justify-content: center;
			    img{
			    	width: auto;
		    		max-height: 162px !important;
		    		max-width: 312px !important;
			    }
			}
			&__content{
				margin-top: 16px;
			}
			.title{
				font-weight: 500;
				font-size: 16px;
				line-height: 19px;
				color: #1F1F1F;
				margin-bottom: 8px;
			}
			.left{
				font-weight: normal;
				font-size: 12px;
				line-height: 14px;
				color: #969696;
				margin-bottom: 0;
			}
			.text{
				margin-top: 16px;
				p{
					b{
						font-weight: 300;
					}
					font-weight: 300;
					font-size: 16px;
					line-height: 19px;
					color: #1F1F1F;
					margin-bottom: 0;
				}
			}
		}
	}
</style>
