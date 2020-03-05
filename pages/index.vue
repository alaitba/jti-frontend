<template>
  	<main class="page page--flex page--grey">
  		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
	    	<div class="section section--main">
	    		<div class="main-slider">
	    			<!-- <div class="container"> -->
	    				<!-- <swiper :options="swiperOption" ref="mySwiper">
	    					<swiper-slide>
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
						    </swiper-slide>
						    <div class="swiper-pagination" slot="pagination"></div>
	    				</swiper> -->
	    			<!-- </div> -->
	    		</div>
	    	</div>
	    	<div class="section section--icons">
	    		<div class="container">
	    			<div class="icons">
	    				<template v-if="getNumber">
	    					<div class="icons__item" >
		    					<nuxt-link to="/plan">
			    					<div class="img">
			    						<img src="~/assets/img/icons/links/plan.svg" alt="">
			    					</div>
			    					<div class="title">
			    						План закупок
			    					</div>
			    				</nuxt-link>
		    				</div>
	    				</template>
	    				<template v-else>
		    				<div class="icons__item" @click="showModal()">
		    					<!-- <nuxt-link to="/plan"> -->
			    					<div class="img">
			    						<img src="~/assets/img/icons/links/plan.svg" alt="">
			    					</div>
			    					<div class="title">
			    						План закупок
			    					</div>
			    				<!-- </nuxt-link> -->
		    				</div>
	    				</template>
	    				<div class="icons__item">
	    					<nuxt-link to="/anketa/createanketa">
		    					<div class="img">
		    						<img src="~/assets/img/icons/links/new.svg" alt="">
		    					</div>
		    					<div class="title">
		    						Анкеты
		    					</div>
		    				</nuxt-link>
	    				</div>
	    				<div class="icons__item">
	    					<nuxt-link to="/anketa/gifts">
		    					<div class="img">
		    						<img src="~/assets/img/icons/links/gift.svg" alt="">
		    					</div>
		    					<div class="title">
		    						Призы
		    					</div>
		    				</nuxt-link>
	    				</div>
	    				<div class="icons__item" @click="showModal()">
	    					<div class="img">
	    						<img src="~/assets/img/icons/links/agent.svg" alt="">
	    					</div>
	    					<div class="title">
	    						Агент+
	    					</div>
	    				</div>
	    				<div class="icons__item" @click="showModal()">
	    					<div class="img">
	    						<img src="~/assets/img/icons/links/quiz.svg" alt="">
	    					</div>
	    					<div class="title">
	    						Викторины
	    					</div>
	    				</div>
	    				<div class="icons__item">
	    					<nuxt-link to="/profile">
		    					<div class="img">
		    						<img src="~/assets/img/icons/links/profile.svg" alt="">
		    					</div>
		    					<div class="title">
		    						Профиль
		    					</div>
		    				</nuxt-link>
	    				</div>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="section section--plan" v-if="reports && reportsId && getNumber">
	    		<div class="container">
	    			<h3 class="section__title">
	    				Текущий план закупок
	    			</h3>
	    			<div class="plan" v-if="reports && reportsId">
	    				<div class="plan__graphic">
	    					<div class="plan-item plan-item--main">
								<div class="plan-item__circle">
									<circle-counter
			                            width="188px"
			                            height="188px"
			                            stroke="#C2EEE3"
			                            :activeCount= computedNumberPlan
			                            :dashCount=100
			                            :dash-spacing=0
			                            :strokeWidth=28
			                            :activeWidth=28
			                            activeStroke="#05B186"
			                        />
								    </circle-counter>
									<div class="circle-text circle-text--main">					
								    	<span class="name name--main">
									    	Процент выполнения
								    	</span>
								    	<span class="number number--main">
								    		{{computedNumberPlan.toFixed(1)}}%
								    	</span>
								    </div>
								</div>
								<div class="plan-item__main plan-item__main--main">
    								<p class="title title--main">
    									<span class="name name--sub">
    										План
    									</span>    								
    									<span class="green">
    										Общий
    									</span>
    									<span class="green green--light">
    										Бренд
    									</span>
    								</p>
    								<p class="title title--main title--right">
    									<span class="name name--sub">
    										Закуплено блоков
    									</span>
    									<span class="green">
    										<!-- 3 000 из 10 000 -->
    										{{reports[reportsId].fact_portfolio}} из {{reports[reportsId].plan_portfolio}}
    									</span>
    									<span class="green green--light">
    										<!-- 3 000 из 10 000 -->
    										{{reports[reportsId].fact_brand}} из {{reports[reportsId].fact_portfolio}}
    									</span>
    								</p>
    							</div>    							
    							<div class="plan-item__bonus">
    								<p class="title">
    									Бонус за выполнение плана
    								</p>
    								<p class="amount">
    									{{reports[reportsId].bonus_portfolio | formatAmount}} тг
    								</p>
    							</div>
							</div>
	    				</div>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="section section--news">
	    		<div class="container">
	    			<h3 class="section__title">
	    				Новости
	    			</h3>
	    			<div class="news" v-if="news">
	    				<template v-if="news.length">
	    					<template v-for="(item, key) in news">
		    					<div :class="{'news__item' : true, 'news__item--noimg': item.media.length==0}">
		    						<nuxt-link :to="{name: 'news-id', params: {id: key}}">
			    						<div class="banner" v-if="item.media.length">
				    						<img :src="item.media[0].url" alt="">
				    					</div>
				    					<div class="content">
				    						<h4 class="title" v-if="item.title">
					    						{{item.title.ru}}
					    					</h4>
					    					<p class="data" v-if="item.created_at">
					    						{{ item.created_at | formatData}}
					    					</p>
					    					<div class="text" v-if="item.contents" v-html="item.contents.ru"></div>
				    					</div>
				    				</nuxt-link>
		    					</div>
		    				</template>
	    				</template>
	    				<!-- <div class="news__item news__item--noimg">
	    					<nuxt-link :to="{name: 'news-id', params:{id: '1'}}">
		    					<div class="banner">
		    						<img src="~/assets/img/news/12.png" alt="">
		    					</div>
		    					<div class="content">
		    						<h4 class="title">
			    						Призы можно заказывать только через веб-приложение «Partner 360».
			    					</h4>
			    					<p class="data">
			    						10.01.2020
			    					</span>
			    					<div class="text">
			    						С 03 февраля 2020 года покупайте больше продукции LD с красной лентой, регистрируйте потребителей и получайте крутые призы от наших Торговых представителей!

										Вас ждут много интересных призов: термокружки, пледы, зонты, сертификаты, беспроводные наушники, мультиварки, футболки и другие.

										А еще специально для вас каждую неделю вас ждут еженедельные розыгрыши призов как смартфоны, телевизоры и стиральные машины.
										Для участия в них достаточно к моменту розыгрыша заработать минимум 100 баллов.

										Главный приз финального розыгрыша – автомобиль Camry 70!

			    					</div>
		    					</div>
		    				</nuxt-link>
	    				</div> -->
	    				<div class="news__all">
	    					<!-- <nuxt-link class="news__link" to="/news">
	    						Все новости
	    					</nuxt-link> -->
	    					<nuxt-link to="/news" class="news__link">
	    						Все новости
	    					</nuxt-link>
	    				</div>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="section section--footer">
	    		<div class="footer">
	    			<div class="footer__head">
	    				<div class="container">
		    				<h4 class="title">
		    					JTI Partner 360
		    				</h4>

		    				<!-- <button class="button button--green" type="button">
		    					Обратная связь
		    				</button> -->
		    			</div>
	    			</div>
	    			<div class="footer__bottom">
	    				<div class="container">
		    				<a href="https://ibecsystems.com/ru#/" target="_blank" class="copyright">
		    					<span>
		    						Разработано в
		    					</span>
		    					<img src="~/assets/img/icons/ibec_systems_logo.svg" alt="">
		    				</a>
		    			</div>
	    			</div>
	    		</div>	    		
	    	</div>
	    	<modal-main 
	    		:title="title" 
	    		:text="text" 
	    		:img="img" 
	    		:btnText="btnText"
	    		v-if="modalStatus"
	    	>	    		
	    	</modal-main>
	    	<modal-error/>
	    </template>
    </main>
</template>

<script>
	import ModalError from '~/components/layouts/Modals/ModalError.vue'
	import moment from 'moment'
	import ModalMain from '~/components/layouts/Modals/modal-main.vue'
	import {mapState, mapMutations} from 'vuex'
	export default {
	  	components: {
	      ModalError,
	      ModalMain,	      
	    },
	    filters:{
	    	formatData(value){
	    		return moment(value).format('DD.MM.YYYY');
	    	},
	    	truncateText(text,stop,clamp){
				return text.slice(0,stop) +  (stop < text.length ? clamp || '...' : '');
			},
			formatAmount(value){
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
	    },
	    data() {
	    	return {
	    		swiperOption: {
	    			pagination:{
	    				el: '.swiper-pagination',
		    			dynamicBullets: true
	    			}
	    		},

	    		news: '',
	    		loaderStatus: true,
	    		title: '',
	    		text:'',
	    		img:'',
	    		btnText:'',
	    		reports: '',
	    		reportsId: localStorage.getItem('tradepoint') ? JSON.parse(localStorage.getItem('tradepoint')).account_code : '',
	    		modalStatus: localStorage.getItem('modalStatus') ? JSON.parse(localStorage.modalStatus) : true,
	    		mobileOs: localStorage.getItem('android') ? JSON.parse(localStorage.getItem('android')) : false,

	    	}
	    },
	    mounted() {

	    	let _this = this;

	    	_this.getUserDevice();


	    	_this.getNews();

	    	+_this.getPlanFact();

	    	let interval1= setInterval(
                () => {                    
                    if($('#modal-main').length > 0) {
                        clearInterval(interval1);
                        // console.log('1');
	                    if(_this.modalStatus && _this.mobileOs){
	                    	_this.showSubscribe();                        	
	                    }
                    }                    
                },
                1000
            );

	    	_this.$nuxt.$on('onManageWebPushSubscriptionButtonClicked',_this.onManageWebPushSubscriptionButtonClicked);
	    	// this.showModal();

	    	OneSignal.push(function() {
		        // If we're on an unsupported browser, do nothing
		        if (!OneSignal.isPushNotificationsSupported()) {
		        	console.log('not supported')
		            return;
		        }


		        OneSignal.isPushNotificationsEnabled(function(isEnabled) {
				    if (isEnabled){
				    	_this.modalStatus = false;		          		
		          		localStorage.setItem('modalStatus', false);
				      	console.log("Push notifications are enabled!");
				    }
				    else{
				    	_this.modalStatus = true;		          		
		          		localStorage.setItem('modalStatus', true);
				      	console.log("Push notifications are not enabled yet.");    
				    }
				});
		        // _this.updateMangeWebPushSubscriptionButton(buttonSelector);
		        OneSignal.on("subscriptionChange", function(isSubscribed) {
		        	console.log('supported')
		            console.log('isSubscribed: ', isSubscribed)
		          	if(isSubscribed){
		          		_this.modalStatus = false;		          		
		          		localStorage.setItem('modalStatus', false);
		            	OneSignal.getUserId( function(userId) {
		                	console.log('userId:', userId)              
		                	// let userId = userId          
		                	_this.setUserId(userId);                
		              	});              
		          	} else{
		            	console.log('false')
		            	// OneSignal.setSubscription(false);
		            	// OneSignal.showNativePrompt({force: true});
			        }
		        });
		    });

	    },
	    computed: {
	      	...mapState({
	        	tradepoint: state => state.tradepoint,
	      	}),
	      	computedNumberPlan(){
				return parseInt(this.reports[this.reportsId].fact_portfolio)/parseInt(this.reports[this.reportsId].plan_portfolio) > 0 ?   parseInt(this.reports[this.reportsId].fact_portfolio)/parseInt(this.reports[this.reportsId].plan_portfolio) * 100 > 100 ? 100 :  parseInt(this.reports[this.reportsId].fact_portfolio)/parseInt(this.reports[this.reportsId].plan_portfolio)*100 : 0

				// return this.reports[this.reportsId]
			},
			getNumber(){
				return localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")).mobile_phone == '77059521623' : false;
			}
	    },
	    methods:{

	    	showModal(modal){
	    		$('#modal-error').modal('show')
	    	},

	    	getUserDevice(){

		        let ua = navigator.userAgent;

		        let checker = {

		          ios: ua.match(/(iPhone|iPod|iPad)/),
		          android: ua.match(/(Android)/)

		        }

		        if(checker.ios){
		          // console.log('ios:',navigator.userAgent);
		          localStorage.setItem('ios', true);
		        } else if(checker.android){
		          // console.log('android:',navigator.userAgent)
		          localStorage.setItem('android', true);
		          this.mobileOs = true;
		        } else{
		          // console.log('userAgent',navigator.userAgent)
		        }

		    },

	    	showSubscribe(){	    		
	    		// console.log('adas');
    			this.title = 'Отправлять уведомления'
    			this.text = 'Разрешите отправлять уведомления об изменениях статусов анкет, поплнения баланса и тд.'
    			this.img = 'bell-green';
    			this.btnText = 'notifications';
    			$('#modal-main').modal('show');	    			
	    	},

	    	async getNews(){

	    		let data  = JSON.parse(localStorage.getItem("news")) ? JSON.parse(localStorage.getItem("news"))[0].created_at : 1;

	    		this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

	    		await this.$axios.get('/news?from_date=' + data)
	    			.then(response =>{
	    				// console.log(response.data.data);

	    				let arr = Object.values(response.data.data);

	    				arr = arr.sort((a,b) => {
	    					return moment(b.created_at) - moment(a.created_at)
	    				});

	    				if(localStorage.getItem("news")){
	    					localStorage.setItem("news", JSON.stringify(JSON.parse(localStorage.getItem("news")).concat(arr)));
	    				} else {
	    					// console.log('news')
	    					localStorage.setItem("news", JSON.stringify(arr));
	    				}

	    				let newArr = JSON.parse(localStorage.getItem("news"));

	    				newArr = newArr.sort((a,b) => {
	    					return moment(b.created_at) - moment(a.created_at)
	    				});

	    				this.news = newArr.slice(0,3);

	    				this.loaderStatus = false;
	    			}).catch(error =>{
	    				console.log('error news')
	    			})
	    	},

	    	async getPlanFact(){
				this.$axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("authToken");

				try {

					let res = await this.$axios.$get('/plan-fact');

					this.reports = res.data;

					this.loaderStatus = false;

					localStorage.setItem('lastUpdated', res.lastUpdated);

					// console.log(this.reports,this.reportsId);
				} catch(error){

					// console.log('error', error.response)
				}
			},

	    	async setUserId(userId){

		        // console.log('here')

		        let fields = {
		          'push_token': userId
		        }

		        this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

		        try{

		          let res = await this.$axios.$post('/auth/set-push-token', fields)

		          // console.log('res:', res);
		        } catch(error){

		          console.log('errorPush', error)
		        }
		    },

			getSubscriptionState(){
				return Promise.all([
		        	OneSignal.isPushNotificationsEnabled(),
		        	OneSignal.isOptedOut()
		        ]).then(function(result) {
		            var isPushEnabled = result[0];
		            var isOptedOut = result[1];
		            return {
		                isPushEnabled: isPushEnabled,
		                isOptedOut: isOptedOut
		            };
		        });
			},

			onManageWebPushSubscriptionButtonClicked(){				
				// console.log('asdasd')
				this.modalStatus = false;
				$('#modal-main').modal('hide');
				this.getSubscriptionState().then(function(state) {

		            if (state.isPushEnabled) {
		                /* Subscribed, opt them out */
		                OneSignal.setSubscription(false);
		            } else {
		                if (state.isOptedOut) {
		                    // Opted out, opt them back in 
		                    OneSignal.setSubscription(true);
		                } else {
		                    /* Unsubscribed, subscribe them */
		                    OneSignal.registerForPushNotifications();
		                }
		            }
		        });
		        // event.preventDefault();
			},
	    }
	}
</script>

<style lang="scss">
	.page{
		&--flex{
			flex-direction: column;
			justify-content: space-between;
		}
	}
	.section{
		&__title{
			line-height: 33px;
			color: #969696;
		}
		&--icons{
			padding-top: 16px;
			.icons{
				display: flex;
				flex-wrap:wrap;
				&__item{
					cursor: pointer;
					background: #FFFFFF;
					border: 1px solid #217461;
					box-sizing: border-box;
					border-radius: 8px;
					padding: 16px 11px;
					text-align: center;
					width: calc((100% - 16px)/3);
					height: 100%;
					margin-bottom: 8px;
					&>a{
						&:hover{
							text-decoration: none;
						}
					}
					&:nth-child(2),&:nth-child(5){
						margin: 0 8px 8px 8px;
					}
					.img{
						max-width: 100%;
						margin-bottom: 4px;
					}
					.title{
						font-weight: normal;
						font-size: 12px;
						line-height: 14px;
						text-align: center;
						color: #217461;
						@media screen and (max-width: 359px) {
							font-size: 10px;
							line-height: 12px;
						}
						@media screen and (max-width: 320px) {
							font-size: 9px;
							line-height: 11px;
						}
					}
				}
			}
		}
		&--news{
			iframe{
				width: 100%;
			}
			// padding-top: 32px;
		}
	}
</style>
