<template>
  	<main class="page page--flex page--grey">
  		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
	    	<div class="section section--main" v-if="slider.length">
	    		<div class="main-slider">
	    			<!-- <div class="container"> -->
	    				<swiper :options="swiperOption" ref="mySwiper">
	    					<template v-for="(item, index) in slider">
	    						<swiper-slide>
	    							<template v-if="item.link">
	    								<nuxt-link :to="$i18n.path(item.link)">
				    						<img :src="item.image" alt="">
				    					</nuxt-link>
	    							</template>
	    							<template v-else>
	    								<img :src="item.image" alt="">
	    							</template>
		    					</swiper-slide>
	    					</template>
						    <div class="swiper-pagination" slot="pagination"></div>
	    				</swiper>
	    			<!-- </div> -->
	    		</div>
	    	</div>
	    	<div class="section section--coupons" v-if="coupons_ld !=null && coupons_winstone != null">
	    		<div class="container">
	    			<div class="coupons">
	    				<!-- <div class="coupons__item">
	    					<h5 class="title">
	    						{{$t('Купоны LD')}}
	    					</h5>
	    					<p v-if="coupons_ld !=null">
	    						{{$t('Купонов')}}: <span>{{ coupons_ld}}</span>
	    					</p>
	    					<p class="data">
	    						20.02.2000
	    					</p>
	    				</div> -->
	    				<div class="coupons__item">
	    					<h5 class="title">
	    						{{$t('Купоны LD')}}
	    					</h5>
	    					<p v-if="coupons_winstone != null">
	    						{{$t('Купонов')}}: <span>{{coupons_winstone}}</span>
	    					</p>
	    					<!-- <p class="data" v-if="coupons_data">
	    						{{
	    							coupons_data | formatData
	    						}}
	    					</p> -->
	    				</div>
	    			</div>
	    		</div>
	    	</div>
	    	<!-- <div :class="{'section section--icons' : true, 'pd16' : (phoneNumber != '7073222207' && phoneNumber != '7059521623')}"> -->
    		<div class="section section--icons">
	    		<div class="container">
	    			<div class="icons">
	    				<!-- <template v-if="getNumber"> -->
	    					<div :class="{'icons__item' : true, 'mh92' : $i18n.locale === 'kk'}">
		    					<nuxt-link :to="$i18n.path('plan')">
			    				</nuxt-link>
                                <div class="img">
                                    <img src="~/assets/img/icons/links/plan.svg" alt="">
                                </div>
                                <div class="title">
                                    {{$t('icons-plan-title')}}
                                </div>
		    				</div>
	    				<!-- </template>
	    				<template v-else>
		    				<div :class="{'icons__item' : true, 'mh92' : $i18n.locale === 'kk'}" @click="showModal()">
	    						<div class="img">
		    						<img src="~/assets/img/icons/links/plan.svg" alt="">
		    					</div>
		    					<div class="title">
		    						План закупок
		    					</div>
		    				</div>
	    				</template> -->
	    				<div :class="{'icons__item' : true, 'mh92' : $i18n.locale === 'kk'}">
	    					<nuxt-link :to="$i18n.path('anketa/createanketa')">
		    				</nuxt-link>
                            <div class="img">
                                <img src="~/assets/img/icons/links/new.svg" alt="">
                            </div>
                            <div class="title">
                                {{$t('icons-anketa-title')}}
                            </div>
	    				</div>
	    				<div :class="{'icons__item' : true, 'mh92' : $i18n.locale === 'kk'}">
	    					<nuxt-link :to="$i18n.path('anketa/gifts')">
		    				</nuxt-link>
                            <div class="img">
                                <img src="~/assets/img/icons/links/gift.svg" alt="">
                            </div>
                            <div class="title">
                                {{$t('icons-gifts-title')}}
                            </div>
	    				</div>
	    				<!-- <template v-if="getNumber"> -->
		    				<div :class="{'icons__item' : true, 'mh92' : $i18n.locale === 'kk'}">
                                <nuxt-link :to="$i18n.path('agent')">
				    			</nuxt-link>
                                <div class="img">
                                    <img src="~/assets/img/icons/links/agent.svg" alt="">
                                </div>
                                <div class="title">
                                    {{$t('icons-agent-title')}}
                                </div>
		    				</div>
		    			<!-- </template>
		    			<template v-else>
		    				<div class="icons__item" @click="showModal()">
		    					<div class="img">
		    						<img src="~/assets/img/icons/links/agent.svg" alt="">
		    					</div>
		    					<div class="title">
		    						Агент+
		    					</div>
		    				</div>
		    			</template> -->
		    			<!-- <template v-if="getNumber"> -->
		    				<div :class="{'icons__item' : true, 'mh92' : $i18n.locale === 'kk'}">
		    					<nuxt-link :to="$i18n.path('quiz')">
			    				</nuxt-link>
                                <div class="img">
                                    <img src="~/assets/img/icons/links/quiz.svg" alt="">
                                </div>
                                <div class="title">
                                    {{$t('icons-quiz-title')}}
                                </div>
		    				</div>
		    			<!-- </template>
		    			<template v-else>
		    				<div class="icons__item" @click="showModal()">
		    					<div class="img">
		    						<img src="~/assets/img/icons/links/quiz.svg" alt="">
		    					</div>
		    					<div class="title">
		    						Викторины
		    					</div>
		    				</div>
		    			</template> -->
	    				<div :class="{'icons__item' : true, 'mh92' : $i18n.locale === 'kk'}">
	    					<nuxt-link :to="$i18n.path('profile')">
		    				</nuxt-link>
                            <div class="img">
                                <img src="~/assets/img/icons/links/profile.svg" alt="">
                            </div>
                            <div class="title">
                                {{$t('icons-profile-title')}}
                            </div>
	    				</div>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="section section--plan" v-if="reports && reportsId">
	    		<div class="container">
	    			<h3 class="section__title">
	    				{{$t('section-plan-title')}}
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
									    	{{$t('section-plan-done')}}
								    	</span>
								    	<span class="number number--main">
								    		{{computedNumberPlan.toFixed(1)}}%
								    	</span>

								    </div>
								</div>
								<div class="plan-item__main plan-item__main--main">
    								<p class="title title--main">
    									<span class="name name--sub">
    										{{$t('section-plan-plan')}}
    									</span>
    									<span class="green">
    										{{$t('section-plan-total')}}
    									</span>
    									<span class="green green--light">
    										<!-- {{$t('section-plan-brand')}} -->
    										{{$t('На середину месяца')}} <span>(15.10.2020)</span>
    									</span>
    								</p>
    								<p class="title title--main title--right">
    									<span class="name name--sub">
    										{{$t('section-plan-purchased')}}
    									</span>
    									<span class="green">
    										<!-- 3 000 из 10 000 -->
    										<template v-if="$i18n.locale ==='ru'">
    											{{reports[reportsId].fact_portfolio}} из {{reports[reportsId].plan_portfolio}}
    										</template>
    										<template v-if="$i18n.locale ==='kk'">
    											{{reports[reportsId].fact_portfolio}}/{{reports[reportsId].plan_portfolio}}
    										</template>
    									</span>
    									<span class="green green--light">
    										<!-- 3 000 из 10 000 -->
    										<template v-if="$i18n.locale ==='ru'">
    											{{reports[reportsId].fact_brand}} из {{reports[reportsId].plan_brand}}
    										</template>
    										<template v-if="$i18n.locale ==='kk'">
    											{{reports[reportsId].fact_brand}}/{{reports[reportsId].plan_brand}}
    										</template>
    									</span>
    								</p>
    							</div>
    							<div class="plan-item__bonus">
    								<p class="title">    									
    									{{$t('section-plan-bonus')}}
    								</p>
    								<p class="amount">
    									{{reports[reportsId].bonus_total | formatAmount}} тг
    								</p>
    							</div>
							</div>
	    				</div>
	    				<div class="plan__updated-data" v-if="reports && reports[reportsId]">
		                  	<p v-if="$i18n.locale === 'ru'">
			                    Данные актуальны по: {{reports[reportsId].lastUpdated |  formatDataYear}}
		                  	</p>
                            <p v-if="$i18n.locale === 'kk'">
                                Мәліметтер {{reports[reportsId].lastUpdated |  formatDataYear}} бойынша өзекті
                            </p>
		                </div>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="section section--news" v-if="news.length">
	    		<div class="container">
	    			<h3 class="section__title">
	    				{{$t('section-news-title')}}
	    			</h3>
	    			<div class="news" v-if="news">
	    				<template v-if="news.length">
	    					<template v-for="(item, key) in news">
		    					<div :class="{'news__item' : true, 'news__item--noimg': item.media.length==0}">
		    						<nuxt-link
		    							:to="$i18n.path(`news/${item.id}`)"
		    						>
			    						<div class="banner" v-if="item.media.length">
				    						<img :src="item.media[0].url" alt="">
				    					</div>
				    					<div class="content">
                                            <template v-if="item.title[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]">
                                                <h4 class="title" v-if="item.title">
                                                    {{item.title[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]}}
                                                </h4>
                                            </template>
                                            <template v-else>
                                                <h4 class="title" v-if="item.title">
                                                    {{item.title['ru']}}
                                                </h4>
                                            </template>
					    					<p class="data" v-if="item.created_at">
					    						{{ item.created_at | formatData}}
					    					</p>
                                            <template v-if="item.contents[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]">
    					    					<div class="text" v-if="item.contents" v-html="item.contents[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]"></div>
                                            </template>
                                            <template v-else>
                                                <div class="text" v-if="item.contents" v-html="item.contents['ru']"></div>
                                            </template>
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
	    					<nuxt-link :to="$i18n.path('news')" class="news__link">
	    						{{$t('section-news-all')}}
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

		    				<nuxt-link :to="$i18n.path('feedback')" class="button button--green">
		    					{{$t('section-footer-title')}}
		    				</nuxt-link>
		    			</div>
	    			</div>
	    			<div class="footer__bottom">
	    				<div class="container">
		    				<a href="https://ibecsystems.com/ru#/" target="_blank" class="copyright">
		    					<span>
		    						{{$t('section-footer-author')}}
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
			formatDataYear(value){
		        return moment(value).format('DD.MM.YYYY');
		    },
	    },
	    data() {
	    	return {
	    		swiperOption: {
	    			loop: true,
	    			autoHeight: true,
	    			pagination:{
	    				el: '.swiper-pagination',
		    			dynamicBullets: true
	    			}
	    		},

	    		slider: [],
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
	    		coupons_data: null,
	    		coupons_ld: null,
	    		coupons_winstone: null
	    	}
	    },
	    mounted() {

	    	let _this = this;

	    	_this.getUserDevice();

	    	_this.getNews();

	    	_this.getPlanFact();

	    	_this.getMainBanner();

	    	_this.getCouponsLD();

	    	_this.getCouponsWN();

	    	let interval1 = setInterval(
                () => {
                    if($('#modal-main').length > 0) {
                        clearInterval(interval1);                        
                        // console.log('1', _this.subscribeStatus, _this.mobileOs);
	                    if(_this.subscribeStatus && _this.mobileOs){
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
				    	_this.$store.commit('setSubscribeStatus', false);
						localStorage.setItem('subscribeStatus', false);
				      	console.log("Push notifications are enabled!");
				    }
				    else{
				    	_this.$store.commit('setSubscribeStatus', true);
						localStorage.setItem('subscribeStatus', true);
				      	console.log("Push notifications are not enabled yet.");
				    }
				});
		        // _this.updateMangeWebPushSubscriptionButton(buttonSelector);
		        OneSignal.on("subscriptionChange", function(isSubscribed) {
		        	console.log('supported')
		            console.log('isSubscribed: ', isSubscribed)
		          	if(isSubscribed){
		          		_this.$store.commit('setSubscribeStatus', false);
						localStorage.setItem('subscribeStatus', false);
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
	        	subscribeStatus: state => state.subscribeStatus,
	        	phoneNumber: state => state.number
	      	}),
	      	computedNumberPlan(){
				return parseInt(this.reports[this.reportsId].fact_portfolio)/parseInt(this.reports[this.reportsId].plan_portfolio) > 0 ?   parseInt(this.reports[this.reportsId].fact_portfolio)/parseInt(this.reports[this.reportsId].plan_portfolio) * 100 > 100 ? 99.99 :  parseInt(this.reports[this.reportsId].fact_portfolio)/parseInt(this.reports[this.reportsId].plan_portfolio)*100 : 0

				// return this.reports[this.reportsId]
			},
			getNumber(){
				return localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")).mobile_phone == '77059521623' : false;
			}
	    },
	    methods:{

	    	showModal(modal){
	    		// $('#modal-error').modal('show')
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
	    		if(!this.$t('Отправлять уведомления')) return;
    			this.title = this.$t('Отправлять уведомления')
    			this.text = this.$t('Разрешите отправлять уведомления об изменениях статусов анкет, пополнения баланса и тд.')
    			this.img = 'bell-green';
    			this.btnText = 'notifications';
    			$('#modal-main').modal('show');
	    	},

	    	async getCouponsLD(){

	    		this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');


	    		try{
	    			let res = await this.$axios.$get('/coupons/get-ld');
	    			this.coupons_ld = res.coupons;    				
	    		} catch(error){
	    			console.log('errorCouposnLd', error)
	    		}
	    		    		
	    	},

	    	async getCouponsWN(){

	    		this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

	    		try{

		    		let res = await this.$axios.$get('/rewards/history');
					// console.log(res, 'coupons');						

					if(res.data.length){

						for(let i =0; i< res.data.length; i++){
							if(res.data[i].name['ru'] == "Купон для участия в розыгрыше"){
								this.coupons_winstone ++;
							}
						}
					} else {

						this.coupons_winstone = 0;

					} 

					this.coupons_data = moment();


	    		} catch(error){
	    			console.log('errorWinstone', error)
	    		}	    		

	    	},

	    	async getNews(){

	    		let data  = localStorage.getItem("news") ? JSON.parse(localStorage.getItem("news"))[0].created_at : 1;

	    		this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

	    		await this.$axios.get('/news?from_date=' + data)
	    			.then(response =>{
	    				// console.log(response.data.data);

	    				let arr = Object.values(response.data.data);

	    				// arr = arr.sort((a,b) => {
	    				// 	return moment(b.created_at) - moment(a.created_at)
	    				// });

	    				if(localStorage.getItem("news")){
	    					localStorage.setItem("news", JSON.stringify(JSON.parse(localStorage.getItem("news")).concat(arr)));
	    				} else {
	    					// console.log('news')
	    					localStorage.setItem("news", JSON.stringify(arr));
	    				}

	    				let newArr = JSON.parse(localStorage.getItem("news"));

	    				if(newArr){
	    					newArr = newArr.sort((a,b) => {
		    					return moment(b.created_at) - moment(a.created_at)
		    				});
	    				}	    				

	    				this.news = newArr.slice(0,3);

	    				localStorage.setItem("news", JSON.stringify(newArr));

	    				// this.loaderStatus = false;
	    			}).catch(error =>{
	    				console.log('error news')
	    			})
	    	},

	    	async getPlanFact(){
				this.$axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("authToken");

				try {

					let res = await this.$axios.$get('/plan-fact');

					this.reports = res.data;

					// console.log(res.data, 'plan')

					// this.loaderStatus = false;

					// localStorage.setItem('lastUpdated', res.lastUpdated);

					// console.log(this.reports,this.reportsId);
				} catch(error){

					console.log('error', error)
				}
			},

			async getMainBanner(){

				this.$axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("authToken");

				try {

					let res = await this.$axios.$get('/dict/slider')


					this.slider = res.data;

					this.loaderStatus = false;

					// console.log('res: ', res);

				} catch(error){
					console.log('error', error)
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
				this.$store.commit('setSubscribeStatus', false);
				localStorage.setItem('subscribeStatus', false);
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
        &--plan{
            .plan{
                padding-bottom: 0 !important;
            }
        }
		&__title{
			line-height: 33px;
			color: #969696;
		}
		&--coupons{
			padding: 12px 0 0px 0;
			.coupons{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-evenly;
				&__item{
					text-align: center;
					.title{
						font-weight: 500;
						font-size: 16px;
						line-height: 19px;
						color: #217461;
						margin-bottom: 5px;
					}
					p{
						font-weight: normal;
						font-size: 12px;
						line-height: 14px;
						color: #969696;
						margin-bottom: 4px;
						// &.data{
						// 	margin-top: 4px;
						// }
						span{
							font-weight: bold;
							font-size: 14px;
							line-height: 16px;
							color: #1F1F1F;
						}
					}
				}
			}
		}
		&--icons{
			padding-top: 16px;
			&.pd16{				
			}
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
                    display: flex;
                    flex-direction: column;
                    position: relative;
					&.mh92{
						height: 92px;
						display: flex;
					    align-items: center;
					    justify-content: center;
					}
					&>a{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
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
		&--main{
			.main-slider{
				img{
					max-height: 420px;
				    object-fit: cover;
				}
			}
		}
	}
</style>
