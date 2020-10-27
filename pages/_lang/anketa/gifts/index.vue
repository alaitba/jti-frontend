<template>
	<main class="page page--flex page--grey">
		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>

			<div class="fill-section" >
				<div class="navigation-menu" >
					<ul class="nav nav-pills">
						<li class="nav-item">
							<a class="nav-link active" data-toggle="pill" href="#home">
								{{$t('Призы')}}
							</a>
						</li>
					  	<li class="nav-item">
							<a class="nav-link" data-toggle="pill" href="#menu">
								{{$t('История')}}
							</a>
						</li>
					</ul>
				</div>
				<div class="navigation-content tab-content" >
					<div class="tab-pane fade active" id="home">
						<template  v-if="phoneNumber == '+77059521623' ||  phoneNumber == '+77085222707' || phoneNumber == '+77471748557'">
						<!-- <template v-if="false"> -->
							<div class="gifts">
								<div class="container">
									<h3 class="section__title gifts__title">
										{{$t('Призы')}}
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
									<div class="gifts__wrapper" v-if="gifts.length">
										<div class="item" v-for="(item,key) in gifts" v-if="item.qty!=0">
					            			<nuxt-link
					            				:to="$i18n.path(`anketa/gifts/${item.rewardId}`)"
					            			>
						  						<div class="item__img" v-if="item.images">
						  							<img :src="item.images[0].origin_url" alt="" v-if="item.images[0]">
						  						</div>
						  						<div class="item__content">
						  							<div>
						  								<h4 class="title" v-if="item.price">
						  									{{item.price | formatPrice}} <span>{{$t('баллов')}}</span>
						  								</h4>
						  								<p class="text">
						  									{{item.name[$i18n.locale ==='kk' ? 'kz' : 'ru']}}
						  								</p>
										                <template v-if="item.rewardId=='069ab460-263c-ea11-80cc-1cc1dee6b654' || item.rewardId=='7b9f8a06-0a44-ea11-80cc-1cc1dee6b654'">
										                	<p class="left" v-if="item.totalQty!=null">
										                      {{$t('количество не ограничено')}}
										                    </p>
										                </template>
										                <template v-else>
										                    <p class="left" v-if="item.totalQty!=null">
										                      {{$t('Осталось штук:')}} {{item.totalQty | formatAmount}}
										                    </p>
										                </template>
						  							</div>
						  							<div class="d-flex">
						  								<nuxt-link
						  									class="link"
						  									:to="$i18n.path(`anketa/gifts/${item.rewardId}`)"
						  								>
						                    				{{$t('Получить приз')}}
						                  				</nuxt-link>
						  							</div>
						  						</div>
					            			</nuxt-link>
										</div>
									</div>
								</div>
							</div>
						</template>
						<template v-else>
					        <div class="information-block information-block--gifts" style="height: calc(100vh - 210px);">
					            <h3 class="section section--text" style="line-height: 1.2;">            	
					                {{$t('Период программы завершен')}}            
					            </h3>
					            <!-- <p class="underline">
					                {{$t('Успейте обменять баллы на призы до 31 марта включительно.')}}
					            </p> -->
					        </div>
				        </template>
					</div>
					<div class="tab-pane" id="menu">
						<div class="gifts">
							<div class="container">
								<h3 class="section__title gifts__title">
									{{$t('История')}}
								</h3>
								<!-- <div class="gifts__points points">
									<p>
										{{$t('Количество баллов:')}}
										<span v-if="balance">
											{{balance}}
										</span>
										<span v-else>
											0
										</span>
									</p>
								</div> -->
								<div class="gifts__wrapper gifts__wrapper--history ">
									<template v-if="giftsHistory.length">
										<div class="list-item" v-for="(item,key) in giftsHistory">
											<div class="list-item__content">
												<p class="title" v-if="item.name">
													{{item.name[$i18n.locale ==='kk' ? 'kz' : 'ru']}}
												</p>
												<p class="info" v-if="item.date">
													{{item.date | formatData}}
												</p>
											</div>
											<div class="list-item__status">
												<p class="point minus" v-if="item.amount">
													{{item.amount | formatAmount}} {{$t('баллов')}}
												</p>
												<!-- <div :class="{'status' : true, 'status--active': item.isEffective, 'status--filled': item.isQualified, 'status--waiting': !item.isQualified}">
													<img src="~/assets/img/icons/anketa/status_active.svg" alt="" v-if="item.isEffective && item.isQualified">
													<img src="~/assets/img/icons/anketa/status_filled.svg" alt="" v-if="item.isQualified && !item.isEffective">
													<img src="~/assets/img/icons/anketa/status_waiting.svg" alt="" v-if="!item.isQualified && !item.isEffective">
												</div> -->
											</div>
										</div>
									</template>
									<template v-else>
										<h5>

										</h5>
									</template>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		
		    <!-- <div class="information-block information-block--gifts">
                <h3 class="section section--text">
                    {{$t('Период программы завершён')}}
                </h3>
                <p class="underline">
                    {{$t('Успейте обменять баллы на призы до 31 марта включительно.')}}
                </p>
            </div>        -->
        
			<footer-anketa/>
			<modal-error/>
		</template>
	</main>
</template>
<script>
	import FooterAnketa from '~/components/layouts/Footer/Footer.vue'
	import ModalError from '~/components/layouts/Modals/ModalError.vue'
	import {mapState, mapMutations} from 'vuex'
	export default {
		components:{
			FooterAnketa,
			ModalError,
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
		    formatNumber (value){
		      	value = value.replace('+','');
		    	return '+' + String(value).replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
		        // return value;
		    },
	      	formatData(value) {
		    	return moment(value).format('DD.MM.YYYY');
		    }
		},
		data(){
			return {
				gifts:[],
				balance:'',
				giftsHistory:[],
				loaderStatus: false,
			}
		},
		mounted(){
			this.getBalance();
			this.getPrizes();
			this.getGiftsHistory();
			// console.log('locale',this.$i18n.locale);
		},
		computed: {
      		...mapState({
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

				await this.$axios.get('/rewards/available')
					.then(response =>{
						this.loaderStatus = false;
						if(response.data.rewards.length){
							this.gifts = response.data.rewards.sort((a,b) => { return a.price - b.price});
						}

					}).catch(error =>{
						// console.log('error',error.response)
				})
			},

			async getGiftsHistory(){

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

				try{

					let res = await this.$axios.$get('/rewards/history');
					this.giftsHistory = res.data;
					this.loaderStatus = false;
					// console.log('res:', this.giftsHistory);

				} catch(error){
					console.log(error);
				}

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
		padding: 0px 0 120px 0;
		width: 100%;
		&__wrapper{
			&--history{
				margin: 0 -16px;
				margin-top: 16px;
			}
			.item{
				display: flex;
				background: #FFFFFF;
				margin-top: 8px;
				box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 4px 8px rgba(0, 0, 0, 0.04);
				border-radius: 8px;
				padding: 8px;
		        .d-flex{
		          padding-bottom: 4px;
		        }
		        &>a{
		          display: flex;
		          width: 100%;
		          &:hover{
		            text-decoration: none;
		          }
		        }
				&__img{
		            background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(5, 177, 134, 0.05) 100%);
		            border-radius: 8px;
		            display: flex;
		            justify-content: center;
		            align-items: center;
		            min-width: 125px;
		            max-width: 125px;
		            width: 125px;
		            height: 121px;
		            align-items: center;
							img{
								// max-height: 121px;
		            // max-width: 125px;
		            max-height: 100%;
		            max-width: 100%;
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
					    margin-bottom: 4px;
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
