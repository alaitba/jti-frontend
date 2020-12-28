<template>
	<main  class="page page--grey page--block">
		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template >
			<div v-if="false" class="anketa">
				<div class="container" v-if="anketaStatus">
					<div :class="{'anketa__head': true, 'kz' : $i18n.locale === 'kk'}">
						<h3 class="anketa__title">
							{{$t('Мои анкеты')}}
						</h3>
						<span class="amount" v-if="list">
							{{$t('Анкет:')}} {{list.length}}
						</span>
					</div>
					<div class="anketa__wrapper" v-if="list.length">

						<div class="list-item item" v-for="(item,key) in list">
							<div class="list-item__content item__content">
								<p class="title" v-if="item.mobilePhone">
									{{item.mobilePhone | formatNumber}}
								</p>
								<p class="info" v-if="item.fillingDate">
									{{$t('Сохранена')}} {{item.fillingDate | formatData}}
								</p>
							</div>
							<div class="list-item__status item__status">
								<p class="point">
									<!-- +50 баллов -->
								</p>
								<div :class="{'status' : true, 'status--active': item.isEffective, 'status--filled': item.isQualified, 'status--waiting': !item.isQualified}">
									<img src="~/assets/img/icons/anketa/status_active.svg" alt="" v-if="item.isEffective && item.isQualified">
									<img src="~/assets/img/icons/anketa/status_filled.svg" alt="" v-if="item.isQualified && !item.isEffective">
									<img src="~/assets/img/icons/anketa/status_waiting.svg" alt="" v-if="!item.isQualified && !item.isEffective">
								</div>
							</div>
						</div>
						<!-- <div class="item">
							<div class="item__content">
								<p class="title">
									+7 775 156 85 20
								</p>
								<p class="info">
									Сохранена 20.12.2019
								</p>
							</div>
							<div class="item__status">
								<p class="point">
									+50 баллов
								</p>
								<div class="status status--filled">
									<img src="~/assets/img/icons/anketa/status_filled.svg" alt="">
								</div>
							</div>
						</div>
						<div class="item">
							<div class="item__content">
								<p class="title">
									+7 775 156 85 20
								</p>
								<p class="info">
									Сохранена 20.12.2019
								</p>
							</div>
							<div class="item__status item__status--waiting">
								<div class="status status--waiting">
									<img src="~/assets/img/icons/anketa/status_waiting.svg" alt="">
								</div>
							</div>
						</div> -->
					</div>
				</div>
			</div>

            <template v-else>
                <div class="information-block information-block--gifts mt-56">
                    <h3 class="section section--text" style="line-height: 1.2;">
                        {{$t('Период программы завершен')}}
                    </h3>
                    <!-- <p class="underline">
                        {{$t('Успейте обменять баллы на призы до 31 марта включительно.')}}
                    </p> -->
                </div>
            </template>
			<footer-anketa/>
		</template>
	</main>
</template>
<script>
	import FooterAnketa from '~/components/layouts/Footer/Footer.vue'
	import {mapState, mapMutations} from 'vuex'
	import moment from 'moment'
	export default {
		components:{
			FooterAnketa,
		},
		// filters: {
	    //   formatNumber (value){
	    //   	value = value.replace('+','');
	    //     return '+' + String(value).replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
	    //     // return value;
	    //   },
	    //   formatData(value) {
	    //   	return moment(value).format('DD.MM.YYYY');
	    //   }
	    // },
        //
		// data() {
		// 	return {
		// 		list: null,
		// 		anketaStatus: false,
		// 		loaderStatus: true
		// 	}
		// },
		// computed:{
		// 	...mapState({
		//       authToken: state => state.authToken,
		//       anketaNumber: state =>state.numberAnketa
		//     }),
		// },
		// mounted(){
		// 	this.getAnketaHistory();
		// },
		// methods: {
		// 	async getAnketaHistory() {
        //
		// 		let fields = {
		// 			'perpage': 100,
		// 			'page':1
		// 		}
		// 		this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('authToken');
        //
		// 		await this.$axios.get('/client/lead-history/', fields)
		//         .then(response =>{
		//         	if(response.data.status =='ok'){
		//          		this.anketaStatus = true;
		//          		this.list = response.data.data;
		//          		this.loaderStatus = false;
		//           	}
		//         }).catch(error => {
        //
		//         });
        //
        //
		// 	},
		// }
	}
</script>

<style lang="scss">
	// .anketa{
	// 	padding: 16px 0 120px;
	// 	min-height: 100vh;
	// 	width: 100%;
	// 	&__head{
	// 		// padding: 0 16px;
	// 		display: flex;
	// 		align-items: baseline;
	// 		justify-content: space-between;
	// 		margin-bottom: 8px;
	// 		.amount{
	// 			font-weight: 300;
	// 			font-size: 16px;
	// 			line-height: 19px;
	// 			text-align: right;
	// 			color: #969696;
	// 		}
	// 	}
	// 	&__title{
	// 		line-height: 33px;
	// 		color: #969696;
	// 	}

	// 	&__wrapper{
	// 		margin: 0 -16px;
	// 		.item{
	// 			padding: 16px;
	// 			background-color: #fff;
	// 			display: flex;
	// 			justify-content: space-between;
	// 			position: relative;
	// 			&:after{
	// 				content: '';
	// 				position: absolute;
	// 				bottom: 0;
	// 				left: 0;
	// 				right: 0;
	// 				margin: 0 auto;
	// 				height: 1px;
	// 				width: 87%;
	// 				background: #F0F0F0;
	// 			}
	// 			&__content{
	// 				.title{
	// 					font-weight: 500;
	// 					font-size: 16px;
	// 					line-height: 19px;
	// 					color: #1F1F1F;
	// 					margin-bottom: 10px;
	// 				}
	// 				.info{
	// 					font-weight: normal;
	// 					font-size: 12px;
	// 					line-height: 14px;
	// 					color: #969696;
	// 					margin-bottom: 0;
	// 				}
	// 			}
	// 			&__status{
	// 				&--waiting{
	// 					display: flex;
	// 					align-items:flex-end;
	// 				}
	// 				.point{
	// 					font-weight: 500;
	// 					font-size: 16px;
	// 					line-height: 19px;
	// 					text-align: right;
	// 					color: #05B186;
	// 					margin-bottom: 10px;
	// 				}
	// 				.status{
	// 					&--active,&--filled, &--waiting{
	// 						text-align: right;
	// 						img{
	// 							max-width: 100%;
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }
</style>
