<template>
	<main class="page page--grey page--block">		
		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="anketa">
				<div class="container" v-if="notifications.length">
					<div class="anketa__head">
						<h3 class="anketa__title">
							Уведомления		
						</h3>
						<!-- <span class="amount" v-if="list">
							Анкет: {{list.length}}
						</span> -->
					</div>			
					<div class="anketa__wrapper">

						<div class="item" v-for="(item,key) in notifications">
							<div class="item__content">
								<p class="title" v-if="item">
									<template v-if="item.type=='LeadCreated'">
										<template v-if="item.data.self=='0' || item.data.self==null">
											Анкета сохранена, начисление бонусов
										</template>
										<template v-else>
											Анкета отправлена потребителю на заполнение 
										</template>
									</template>								
									<template v-else-if="item.type=='LeadQualified'">
										<template v-if="item.data.self=='0' || item.data.self==null">
											Анкета создана
										</template>
										<template v-else>
											Потребитель завершил заполнение анкеты на сайте realday.kz 
										</template>										
									</template>								
									<template v-else-if="item.type=='LeadEffective'">
										Потребитель отправил код с пачки
									</template>								
									<template v-else-if="item.type=='RewardBought'">
										{{item.data.rewardTitle}}
									</template>								
									<template v-else-if="item.type=='HappyBirthday'">
										Уважаемый Партнер, поздравляем Вас с днем рождения. С уважением, JTI
									</template>								
									<template v-else-if="item.type=='BalanceReplenished'">
										На ваш номер было начислено 500 тг
									</template>								
									<!-- {{item.mobilePhone | formatNumber}} -->
								</p>
								
								<p class="info" v-if="item.created_at">
									{{item.created_at | formatData}}
								</p>
							</div>
							<div class="item__status">
								<template v-if="item.type =='RewardBought' || item.type == 'BalanceReplenished'">									
									<p class="point minus" v-if="item.data.price">
									- {{item.data.price | formatAmount}} баллов						
									</p>
								</template>
								<template v-else>									
									<p class="point" v-if="item.data.amount">
										+ {{item.data.amount | formatAmount}} баллов						
									</p>
								</template>									
								<div :class="{'status' : true, 'status--active': true}">
									<!-- <img src="~/assets/img/icons/anketa/status_active.svg" alt=""> -->
									<!-- <img src="~/assets/img/icons/anketa/status_filled.svg" alt="">									 -->
								</div>
							</div>
						</div>
						<!-- <div class="item">
							<div class="item__content">
								<p class="title">
									Прохождение викторинывикторины
								</p>
								<p class="info">
									20.12.2019
								</p>
							</div>
							<div class="item__status">
								<p class="point minus">
									-50 баллов
								</p>
								<div class="status status--filled">
									<img src="~/assets/img/icons/anketa/status_active.svg" alt="">
								</div>
							</div>
						</div>
						<div class="item">
							<div class="item__content">
								<p class="title">
									Прохождение викторинывикторины
								</p>
								<p class="info">
									20.12.2019
								</p>
							</div>
							<div class="item__status">
								<p class="point">
									+50 баллов
								</p>
								<div class="status ">
									<img src="~/assets/img/icons/anketa/status_filled.svg" alt="">
								</div>
							</div>
						</div>
						<div class="item">
							<div class="item__content">
								<p class="title">
									Прохождение викторины
								</p>
								<p class="info">
									20.12.2019
								</p>
							</div>
							<div class="item__status">
								<div class="status status--waiting">
									<img src="~/assets/img/icons/anketa/status_waiting.svg" alt="">
								</div>
							</div>
						</div> -->

						<!-- <button type="button" @click="onManageWebPushSubscriptionButtonClicked" v-if="getNumber" class="button button--green">
							Subscribe to Notifications
						</button> -->
					</div>					
				</div>
				<div 
					class="container" 
					style="display: flex; align-items: center; min-height: calc(100vh - 136px);" 
					v-else 
				>
					<div class="anketa__head">
						<h3 
							class="anketa__title"
							style="line-height: 20px; color: #969696; font-size: 18px; justify-content: center;     text-align: center;"
						>
							У вас пока нет новых уведомлений		
						</h3>
					</div>

					<!-- <button type="button" @click="onManageWebPushSubscriptionButtonClicked" v-if="getNumber" class="button button--green">
						Subscribe to Notifications
					</button> -->
				</div>
			</div>		
		</template>
	</main>
</template>
<script>
	import Loader from '~/components/layouts/loader.vue'
	import moment from 'moment'
	export default{
		components:{
			Loader
		},
		filters: {
	      	formatNumber (value){
	      		value = value.replace('+','');
	        	return '+' + String(value).replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
	        // return value;
	      	},
	      	formatAmount(value){
				// return typeof(value)
				if(value!=null){
					if(typeof(value)!='string'){						
						return parseInt(Number(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')))
					} else{
						return parseInt(value.replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
					}
				} else{
					return value
				}
			},
	    	formatData(value) {
	      		return moment(value).format('DD.MM.YYYY HH:mm');
	      	}
	    },
		data(){
			return{
				notificationsStatus: true,
				loaderStatus: true,
				notifications:[],
			}
		},
		computed:{
			getNumber(){
				return this.$store.state.auth.mobile_phone == '77059521623';
			}
		},
		mounted(){
			let _this = this;
			_this.getNotifications();			

			OneSignal.push(function() {
		        // If we're on an unsupported browser, do nothing
		        if (!OneSignal.isPushNotificationsSupported()) {
		        	console.log('not supported')
		            return;
		        }
		        // _this.updateMangeWebPushSubscriptionButton(buttonSelector);
		        OneSignal.on("subscriptionChange", function(isSubscribed) {
		        	console.log('supported')
		            console.log('isSubscribed: ', isSubscribed)
		          	if(isSubscribed){
		            	OneSignal.getUserId( function(userId) {
		                	console.log('userId:', userId)              
		                	// let userId = userId          
		                	_this.setUserId(userId);                
		              	});              
		          	} else{
		            	console.log('false')
		            	OneSignal.setSubscription(false);
		            	// OneSignal.showNativePrompt({force: true});
			        }
		        });
		    });
		},
		methods:{
			async getNotifications(){
				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');
				try{
					
					let res = await this.$axios.$get('/notifications');

					this.loaderStatus = false;

					this.notifications = res.data;

					// console.log('res:',res.data);
				} catch(error){
					console.log(error)
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

		          console.log('res:', res);
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
				this.getSubscriptionState().then(function(state) {

					console.log('asdasd')
		            if (state.isPushEnabled) {
		                /* Subscribed, opt them out */
		                OneSignal.setSubscription(false);
		            } else {
		                if (state.isOptedOut) {
		                    /* Opted out, opt them back in */
		                    OneSignal.setSubscription(true);
		                } else {
		                    /* Unsubscribed, subscribe them */
		                    OneSignal.registerForPushNotifications();
		                }
		            }
		        });
		        event.preventDefault();
			},

			// updateMangeWebPushSubscriptionButton(buttonSelector){
			// 	var hideWhenSubscribed = false;
		 //        var subscribeText = "Subscribe to Notifications";
		 //        var unsubscribeText = "Unsubscribe from Notifications";

		 //        this.getSubscriptionState().then(function(state) {
		 //            var buttonText = !state.isPushEnabled || state.isOptedOut ? subscribeText : unsubscribeText;

		 //            var element = document.querySelector(buttonSelector);
		 //            if (element === null) {
		 //                return;
		 //            }

		 //            element.removeEventListener('click', onManageWebPushSubscriptionButtonClicked);
		 //            element.addEventListener('click', onManageWebPushSubscriptionButtonClicked);
		 //            element.textContent = buttonText;

		 //            if (state.hideWhenSubscribed && state.isPushEnabled) {
		 //                element.style.display = "none";
		 //            } else {
		 //                element.style.display = "";
		 //            }
		 //        });
			// }

		}
	}
</script>

<style lang="scss">
	.button{
		&--green{
			display: block;
			margin-top: 32px;
		}
	}
</style>