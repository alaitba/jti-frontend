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
										Анкета отправлена потребителю
									</template>								
									<template v-else-if="item.type=='LeadQualified'">
										Анкета заполнена
									</template>								
									<template v-else-if="item.type=='LeadEffective'">
										Код с пачки отправлен, анкета эффективна
									</template>								
									<template v-else-if="item.type=='RewardBought'">
										{{item.data.rewardTitle}}
									</template>								
									<template v-else-if="item.type=='HappyBirthday'">
										C днем рождения
									</template>								
									<template v-else-if="item.type=='BalanceReplenished'">
										Пополнен баланс телефона
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
									<p class="point minus" v-if="item.data.price">
										+ {{item.data.price | formatAmount}} баллов						
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
					</div>
				</div>
				<div class="container" v-else>
					<div class="anketa__head">
						<h3 class="anketa__title">
							У вас пока нет новых уведомлений		
						</h3>
					</div>
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
	      		return moment(value).format('DD.MM.YYYY');
	      	}
	    },
		data(){
			return{
				notificationsStatus: true,
				loaderStatus: true,
				notifications:[],
			}
		},
		mounted(){
			this.getNotifications();
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

			}
		}
	}
</script>