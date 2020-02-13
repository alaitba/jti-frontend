<template>
	<main class="page page--flex page--grey">
		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="fill-section">
				<div class="fill-section__menu">
					<ul class="nav nav-pills">
						<li class="nav-item">
							<a class="nav-link active" data-toggle="pill" href="#home">
								Текущий план
							</a>
						</li>
					  	<li class="nav-item">
							<a class="nav-link" data-toggle="pill" href="#menu">
								История
							</a>
						</li>
					</ul>
				</div>
				<div class="fill-section__content tab-content">				
					<div class="tab-pane fade active container" id="home">
						<h3 class="section__title section__title--profile">
	    					Текущий план закупок
	    				</h3>

	    				<div class="plan">
	    					<div class="plan__selector">
	    						<div class="form-group--selector" v-if="setBrands">
		    						<label for="input" class="form__label form__label--selector"> 
					                  Торговая точка
					                </label>  
					                <multiselect 
					            		v-model="selectedBrand" 
					            		name="brands"
					            		track-by="account_name"
						            	label="account_name" 				
					            		:options="setBrands" 
					            		:searchable="false" 
					            		:close-on-select="true" 
					            		:show-labels="false" 
					            		placeholder="Торговая точка"
					            		v-validate="'required'"
					            		:disabled="setBrands.length<2"
					            	>					            		
					            	</multiselect>			            	
					            </div>				            
	    					</div>  
							<div class="plan__graphic graphic" v-if="reports && reports[selectedBrand.account_code]">							
	    						<swiper :options="swiperOption" ref="mySwiper">
	    							<swiper-slide>
			    						<div class="plan-item">
			    							<div class="plan-item__circle">
			    								<circle-counter 
				                                    width="188px" 
				                                    height="188px" 
				                                    stroke="#C2EEE3"
				                                    :activeCount= computedNumberPlan
				                                    :dashCount=100
				                                    :dash-spacing=n 
				                                    :strokeWidth=m
				                                    :activeWidth=c       
				                                    activeStroke="#05B186"	              
				                                />
											    </circle-counter>

											    <div class="circle-text">
											    	<span class="name">					
												    	Бонус за выполнение
											    	</span>
											    	<span class="number">
											    		{{reports[selectedBrand.account_code][0].bonus_portfolio | formatAmount}} тг
											    	</span>
											    </div>
			    							</div>    			
			    							<div class="plan-item__main">
			    								<p class="title">
			    									Общий план
			    								</p>
			    								<p class="amount">
			    									<span class="name">
			    										Закуплено блоков
			    									</span>
			    									<span class="number">
			    										{{reports[selectedBrand.account_code][0].fact_portfolio}}/{{reports[selectedBrand.account_code][0].plan_portfolio}}
			    									</span>
			    								</p>
			    							</div>				
			    						</div>
			    					</swiper-slide>
			    					<swiper-slide>
			    						<div class="plan-item">
			    							<div class="plan-item__circle">
			    								<circle-counter 
				                                    width="188px" 
				                                    height="188px" 
				                                    stroke="#C2EEE3"
				                                    :dashCount=100
				                                    :activeCount=computedNumberBonus
				                                    :dash-spacing=n 
				                                    :strokeWidth=m
				                                    :activeWidth=c       
				                                    activeStroke="#05B186"	              
				                                />
											    </circle-counter>

											    <div class="circle-text">
											    	<span class="name">					
												    	Бонус за выполнение
											    	</span>
											    	<span class="number">
											    		{{reports[selectedBrand.account_code][0].bonus_brand | formatAmount}} тг
											    	</span>
											    </div>
			    							</div>    			
			    							<div class="plan-item__main">
			    								<p class="title">
			    									{{reports[selectedBrand.account_code][0].brand}}
			    								</p>
			    								<p class="amount">
			    									<span class="name">
			    										Закуплено блоков
			    									</span>
			    									<span class="number">
			    										{{reports[selectedBrand.account_code][0].fact_brand}}/{{reports[selectedBrand.account_code][0].plan_brand}}
			    									</span>
			    								</p>
			    							</div>				
			    						</div>
			    					</swiper-slide>
			    					<div class="swiper-pagination" slot="pagination"></div>
		    					</swiper>
	    					</div>


	    					<div class="plan__images">
	    						<div class="item">
	    							<img src="~/assets/img/plan/1.png" alt="">
	    						</div>
	    						<div class="item">
	    							<img src="~/assets/img/plan/1.png" alt="">
	    						</div>
	    						<div class="item">
	    							<img src="~/assets/img/plan/1.png" alt="">
	    						</div>
	    					</div>  					
	    				</div>
					</div>
					<div class="tab-pane container" id="menu">
						<h3 class="section__title section__title--profile">
	    					История плана закупок
	    				</h3>

	    				<div class="history">
	    					<div class="history__selector">
	    						
	    						<div class="form-group--selector" v-if="history && setBrands">
		    						<label for="input" class="form__label form__label--selector"> 
					                  Торговая точка
					                </label>  
					                <!-- {{setBrands}} -->
					            	<multiselect 
					            		v-model="selectedBrandHistory" 
					            		name="brands"
					            		track-by="account_name"
						            	label="account_name" 				
					            		:options="setBrands" 
					            		:searchable="false" 
					            		:close-on-select="true" 
					            		:show-labels="false" 
					            		placeholder="Торговая точка"
					            		v-validate="'required'"
					            		:disabled="setBrands.length<2"
					            	>					            		
					            	</multiselect>			            	
					            </div>


	    					</div>

	    					<!-- <div class="history__table table" v-if="history && history[selectedBrand.account_code]"> -->
    						<div class="history__table table" v-if="history">
	    						<table >
	    							<!-- <thead>
									    <tr class="thead">
									    	<th class="bold" width="35%">Месяц</th>
									    	<th width="20%">План</th>
									    	<th width="20%">Факт</th>
									    	<th width="25%">Бонус</th>
									    </tr>
									</thead> -->
									<tbody>
										<!-- <tr v-for="(item, key) in history[selectedBrand.account_code]">
											<td width="30%">{{item.year_month | formatData}}</td>
											<td width="20%">{{item.plan_brand}}</td>
											<td width="20%">{{item.fact_brand}}</td>
											<td width="20%">{{item.bonus_brand}}</td>
										</tr> -->
									<template v-for="(item, key) in history[selectedBrandHistory.account_code]">
																			
									    <tr class="head">
									    	<td class="bold" width="30%">
									    		{{item.year_month | formatData}}
									    	</td>
									    	<template v-if="key==0">
										    	<td width="20%">План</td>
										    	<td width="20%">Факт</td>
										    	<td width="25%">Бонус</td>
									    	</template>
									    	<template v-else>
									    		<td width="20%"></td>
										    	<td width="20%"></td>
										    	<td width="25%"></td>
									    	</template>
									    </tr>									
									    <tr class="body">
									    	<td class="bold" width="30%">Общий</td>
									    	<td width="20%">{{item.plan_portfolio}}</td>
									    	<td width="20%">{{item.fact_portfolio}}</td>
									    	<td width="25%">{{item.bonus_portfolio}}</td>
									    </tr>									
									    <tr class="body">
									    	<td class="bold" width="30%">Бренд</td>
									    	<td width="20%">{{item.plan_brand}}</td>
									    	<td width="20%">{{item.fact_brand}}</td>
									    	<td width="25%">{{item.bonus_brand}}</td>
									    </tr>
									</template>									
									    <!-- <tr>
									    	<td width="30%">Январь</td>
									    	<td width="20%">2 000</td>
									    	<td width="20%">2 000</td>
									    	<td width="25%">2 000</td>
									    </tr>	 -->								    
								    </tbody>
								</table>
	    					</div>
	    				</div>
					</div>
				</div>
			</div>
		</template>
	</main>
</template>
<script>
	import CircleCounter from 'vue-circle-counter';  
	import Loader from '~/components/layouts/loader.vue';
	import moment from 'moment'

	export default{
		components: {
			CircleCounter,
			Loader
		},
		filters:{
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
			formatData(value){
	    		return moment(value).format('MMMM');
	    	},
		},
		data(){
			return {
				selectedBrand: '',
				selectedBrandHistory:'',
				reports: '',		
				history: '',		
				amount: 200000,
				loaderStatus: true,
				n: 0,
                m: 28,
                c: 28, 
                brands : localStorage.getItem('tradePoints') ? JSON.parse(localStorage.getItem('tradePoints')) : '',
                swiperOption: {	    	
	    			pagination:{
	    				el: '.swiper-pagination',
		    			dynamicBullets: true
	    			}			    			
	    		},               
			}
		},
		mounted(){
			// console.log('route', this.$route);

			moment.locale('ru');

			this.getPlanFact();

			this.getHistory();
		},
		computed:{
			setBrands(){
				let arr = []
				if(!JSON.parse(localStorage.getItem('tradePoints')).length){
					arr.push(JSON.parse(localStorage.getItem('tradePoints')))
					this.selectedBrand = arr[0]
					return arr 
				} else {
					this.selectedBrand = JSON.parse(localStorage.getItem('tradePoints'))[0]
					return JSON.parse(localStorage.getItem('tradePoints'))
				}
			},
			computedNumberPlan(){
				return parseInt(this.reports[this.selectedBrand.account_code][0].fact_portfolio)/parseInt(this.reports[this.selectedBrand.account_code][0].plan_portfolio) > 0 ?   parseInt(this.reports[this.selectedBrand.account_code][0].fact_portfolio)/parseInt(this.reports[this.selectedBrand.account_code][0].plan_portfolio) * 100 > 100 ? 100 :  parseInt(this.reports[this.selectedBrand.account_code][0].fact_portfolio)/parseInt(this.reports[this.selectedBrand.account_code][0].plan_portfolio)*100 : 0
			},
			computedNumberBonus(){
				return parseInt(this.reports[this.selectedBrand.account_code][0].fact_brand)/parseInt(this.reports[this.selectedBrand.account_code][0].plan_brand) > 0 ?   parseInt(this.reports[this.selectedBrand.account_code][0].fact_brand)/parseInt(this.reports[this.selectedBrand.account_code][0].plan_brand) * 100 > 100 ? 100 :  parseInt(this.reports[this.selectedBrand.account_code][0].fact_brand)/parseInt(this.reports[this.selectedBrand.account_code][0].plan_brand)*100 : 0
			}
		},
		methods:{

			async getPlanFact(){
				this.$axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("authToken");

				try {

					let res = await this.$axios.$get('/plan-fact');

					this.reports = res.data;

					this.loaderStatus = false;

					// console.log(res.data);
				} catch(error){

					// console.log('error', error.response)
				}
			},


			async getHistory(){

				try {

					let res = await this.$axios.$get('/plan-fact/history');

					// console.log(res.data);

					this.history = res.data;
				} catch(error){

					// console.log('error', error.response)
				}
			}
		}
	}
</script>
<style lang="scss">
	#home.active, #menu.active{
		.form__label--selector{
			z-index: 1;
		}
	}
	.plan{	
		padding-bottom: 60px;	
		&-item{
			background: #FFFFFF;
			box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 4px 8px rgba(0, 0, 0, 0.04);
			border-radius: 8px;
			padding: 24px 16px 32px 16px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			&__circle{
				position: relative;
				text-align: center;
				.circle-text{
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
					height: 55px;
					max-width: 90px;
					// padding: 0 10px;
					span{
						display: block;
						&.name{
							font-weight: normal;
							font-size: 12px;
							line-height: 14px;
							text-align: center;							
							color: #969696;							
						}
						&.number{
							font-family: 'Open Sans';
							font-weight: bold;
							font-size: 18px;
							line-height: 25px;
							/* identical to box height */

							text-align: center;

							/* Secondary Green */

							color: #217461;
						}
					}
				}
			}
			&__main{
				margin-top: 24px;
				p{
					margin-bottom: 0;
				}
				.title{
					font-style: normal;
					font-weight: 500;
					font-size: 16px;
					line-height: 19px;
					color: #1F1F1F;
				}
				.amount{
					display: flex;
					justify-content: space-between;					
					span{
						&.name{
							font-style: normal;
							font-weight: 300;
							font-size: 16px;
							line-height: 19px;
							color: #969696;
						}
						&.number{
							font-weight: 500;
							font-size: 16px;
							line-height: 19px;
							color: #217461;
						}
					}
				}
			}			
		}
		&__selector{
			margin-top: 8px;
		}
		&__graphic{
			margin-top: 16px;
		}
		&__images{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 24px;
			.item{
				width: 31%;
				&:nth-child(2n){
					margin: 0 8px;
				}
				img{
					max-width: 100%;
				    width: 100%;
				}
			}
		}
	}
	.form{
		&-group{
			&--selector{
				position: relative;
				.multiselect{
					&__tags{
						padding: 22px 12px 14px 12px;
					}
					&__placeholder{
						color: #1F1F1F;
					}
				}
			}			
		}
		&__label{
			&--selector{
				top: 11px;
				font-size: 12px;
				line-height: 14px;
				z-index: -10;
				color: #969696;
			}
		}
	}


	.history{
		&__selector{
			margin-top: 8px;
		}
		&__table{
			margin-top: 16px;
		}
		.table{			
		}
		table{			
			width: 100%;
			border: 0 !important;
			border-radius: 8px 8px 8px 8px;
			overflow: hidden;
			font-family: 'Roboto';
		}
		th,td{
			&.bold{
				font-weight: 500 !important;
				text-align: left !important;
			}
		}
		// thead{
		// 	background: #217461;
		// 	th{
		// 		padding: 4px;
		// 		word-break: break-word;
		// 		font-weight: 300;
		// 		font-size: 16px;
		// 		line-height: 19px;				
		// 		color: #FFFFFF;
		// 		&:first-child,&:last-child{
		// 			padding: 4px 16px;
		// 		}
		// 	}						
		// }
		tbody{
			tr{
				&.head{
					background: #217461;
					td{
						font-weight: 300;
						font-size: 16px;
						line-height: 19px;						
						text-align: center;						
						color: #FFFFFF;						
					}
				}
				&.body{
					background: #C2EEE3;
					position: relative;
					td{
						font-weight: normal;
						font-size: 12px;
						line-height: 14px;
						color: #1F1F1F;
						text-align: center;
					}						
					&:nth-of-type(odd){
						td{
							position: relative;							
							&:before{
								content:'';
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								margin: 0 auto;
								height: 1px;
								width: 100%;
								background: #71B1A2;
							}
							&:first-child{
								&:before{
									// width: calc(100% - 16px)
									left: 16px;
								}
							}
							&:last-child{
								&:before{
									// width: calc(100% - 16px)
									left: auto;
									right: 16px;
								}
							}
						}						
						// border-top: 1px solid #71B1A2; 
					}
				}				
			}
			td{
				padding: 8px;
				word-break: break-word;
				font-weight: normal;
				font-size: 14px;
				line-height: 19px;				
				color: #1F1F1F;
				text-transform: capitalize;
				&:first-child,&:last-child{
					padding: 8px 16px;
				}
			}
		}
	}
</style>