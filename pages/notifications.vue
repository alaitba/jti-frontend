<template>
	<main class="page page--grey page--block">
		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="anketa">
				<div class="container" v-if="notificationsStatus">
					<div class="anketa__head">
						<h3 class="anketa__title">
							Уведомления		
						</h3>
						<!-- <span class="amount" v-if="list">
							Анкет: {{list.length}}
						</span> -->
					</div>			
					<div class="anketa__wrapper">

						<!-- <div class="item" v-for="(item,key) in list"> -->
							<!-- <div class="item__content">
								<p class="title" v-if="item.mobilePhone">
									{{item.mobilePhone | formatNumber}}
								</p>
								<p class="info" v-if="item.fillingDate">
									Сохранена {{item.fillingDate | formatData}}
								</p>
							</div>
							<div class="item__status">
								<p class="point">
									+50 баллов
								</p>
								<div :class="{'status' : true, 'status--active': item.isEffective, 'status--filled': item.isQualified, 'status--waiting': !item.isQualified}">
									<img src="~/assets/img/icons/anketa/status_active.svg" alt="" v-if="item.isEffective && item.isQualified">
									<img src="~/assets/img/icons/anketa/status_filled.svg" alt="" v-if="item.isQualified && !item.isEffective">
									<img src="~/assets/img/icons/anketa/status_waiting.svg" alt="" v-if="!item.isQualified && !item.isEffective">
								</div>
							</div> -->
						<!-- </div> -->
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
						</div>
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
	      formatData(value) {
	      	return moment(value).format('DD.MM.YYYY');
	      }
	    },
		data(){
			return{
				notificationsStatus: true,
				loaderStatus: false,
			}
		}
	}
</script>