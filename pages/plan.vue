<template>
	<main class="page page--flex page--grey">
		<div class="fill-section">
			<div class="fill-section__menu">
				<ul class="nav nav-pills">
					<li class="nav-item">
						<a class="nav-link active" data-toggle="pill" href="#home">
							Заполнить анкету
						</a>
					</li>
				  	<li class="nav-item">
						<a class="nav-link" data-toggle="pill" href="#menu">
							Отправить ссылку
						</a>
					</li>
				</ul>
			</div>
			<div class="fill-section__content tab-content">				
				<div class="tab-pane active container" id="home">
					<h3 class="section__title section__title--profile">
    					Текущий план закупок
    				</h3>

    				<div class="plan">
    					
    					<div class="plan__selector">
    						<div class="form-group--selector" v-if="brands">
	    						<label for="input" class="form__label form__label--selector"> 
				                  Фамилия
				                </label>  
				            	<multiselect 
				            		v-model="selectedBrand" 
				            		name="brands"
				            		:options="brands" 
				            		:searchable="false" 
				            		:close-on-select="true" 
				            		:show-labels="false" 
				            		placeholder="Торговая точка"
				            		v-validate="'required'"
				            	>					            		
				            	</multiselect>			            	
				            </div>
    					</div>  

    					<div class="plan__graphic graphic">
    						<div class="plan-item">
    							<div class="plan-item__circle">
    								<circle-counter 
	                                    width="188px" 
	                                    height="188px" 
	                                    stroke="#C2EEE3"
	                                    :dashCount=100
	                                    :activeCount=10
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
								    		{{amount | formatAmount}} тг
								    	</span>
								    </div>
    							</div>    			
    							.				
    						</div>
    					</div>  					
    				</div>
				</div>
				<div class="tab-pane container fade" id="menu">
					<h3 class="section__title section__title--profile">
    					История плана закупок
    				</h3>

    				<div class="history">
    					<div class="history__selector">
    						
    						<div class="form-group--selector" v-if="brands">
	    						<label for="input" class="form__label form__label--selector"> 
				                  Фамилия
				                </label>  
				            	<multiselect 
				            		v-model="selectedBrand" 
				            		name="brands"
				            		:options="brands" 
				            		:searchable="false" 
				            		:close-on-select="true" 
				            		:show-labels="false" 
				            		placeholder="Торговая точка"
				            		v-validate="'required'"
				            	>					            		
				            	</multiselect>			            	
				            </div>


    					</div>

    					<div class="history__table table">
    						<table >
    							<thead>
								    <tr class="thead">
								    	<th width="35%">Месяц</th>
								    	<th width="20%">План</th>
								    	<th width="20%">Факт</th>
								    	<th width="25%">Бонус</th>
								    </tr>
								</thead>
								<tbody>
								    <tr>
								    	<td width="30%">Январь</td>
								    	<td width="20%">2 000</td>
								    	<td width="20%">2 000</td>
								    	<td width="25%">2 000</td>
								    </tr>
								    <tr>
								    	<td width="30%">Lastname</td>
								    	<td width="20%">Lois</td>
								    	<td width="20%">Griffin</td>
								    	<td width="25%">2 000</td>
								    </tr>
								    <tr>
								    	<td width="30%">Январь</td>
								    	<td width="20%">2 000</td>
								    	<td width="20%">2 000</td>
								    	<td width="25%">2 000</td>
								    </tr>
							    </tbody>
							</table>
    					</div>
    				</div>

				</div>
			</div>
		</div>
	</main>
</template>
<script>
	import CircleCounter from 'vue-circle-counter';  
	export default{
		components: {
			CircleCounter
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
			}
		},
		data(){
			return {
				selectedBrand: '',
				brands: [
					'a',
					'b',
					'c'
				],
				amount: 200000,
				n: 0,
                m: 28,
                c: 28,                
			}
		},
		mounted(){
			console.log('route', this.$route)
		}
	}
</script>
<style lang="scss">
	.plan{
		&__selector{
			margin-top: 8px;
		}
		&__graphic{
			margin-top: 16px;
		}
		&-item{
			background: #FFFFFF;
			box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 4px 8px rgba(0, 0, 0, 0.04);
			border-radius: 8px;
			padding: 24px 16px 32px 16px;
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
				z-index: 1;
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

		}
		thead{
			background: #217461;
			th{
				padding: 4px;
				word-break: break-word;
				font-weight: 300;
				font-size: 14px;
				line-height: 19px;				
				color: #FFFFFF;
				&:first-child,&:last-child{
					padding: 4px 16px;
				}
			}			
			// border: 5px solid;
		}
		tbody{
			tr{
				&:nth-of-type(odd){
					background: #C2EEE3;
				}
			}
			td{
				padding: 4px;
				word-break: break-word;
				font-weight: 300;
				font-size: 14px;
				line-height: 19px;				
				color: #1F1F1F;
				&:first-child,&:last-child{
					padding: 4px 16px;
				}
			}
		}
	}
</style>