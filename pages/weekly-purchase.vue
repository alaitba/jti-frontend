<template>
	<main class="page page--flex page--grey">
		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="purchase">
				<div class="container">
					<h3 class="section__title section__title--profile">
						Еженедельный закуп
					</h3>

					<div class="purchase__selector">
						<div class="form-group form-group--selector" v-if="brands">
    						<label for="input" class="form__label form__label--selector"> 
			                  Торговая точка
			                </label>  			                
			                <multiselect 
			            		v-model="selectedStore" 
			            		name="brands"
			            		track-by="account_name"
				            	label="account_name" 				
			            		:options="brands" 
			            		:searchable="false" 
			            		:close-on-select="true" 
			            		:show-labels="false" 
			            		placeholder="Торговая точка"
			            		v-validate="'required'"
			            		:disabled="brands.length<2"
			            		async @input=checkDisabledDays(selectedStore)
			            	>					            		
			            	</multiselect>					            	
			            </div>
					</div>
					<div class="purchase__plan" v-if="planData">
						<div class="item" v-if="planData.plan">
							<div class="title">
								План, блоки
							</div>
							<div class="amount">
								{{planData.plan}}
							</div>
						</div>
						<div class="item" v-if="planData.fact">
							<div class="title">
								Факт, блоки
							</div>
							<div class="amount">
								{{planData.fact}}
							</div>
						</div>
					</div>

					<div class="purchase__recommendations" >
						<div class="title">
							Рекомендуемый закуп за один визит
						</div>
						<template v-if="selectedDays && amountDays && planData">
							<div class="amount">
								{{
									Math.round(((planData.plan - planData.fact)/amountDays).toFixed(2))
								}}								
							</div>
						</template>
						<template v-else>
							<div class="amount amount--text">
								Заполните график визитов для расчета
							</div>
						</template>
					</div>

					<div class="purchase__select">
						<button class="button button--bordered green" type="button" @click="clearData">
							Изменить график визитов
						</button>
					</div>

					<div class="purchase__calendar" v-if="selectedDays">
						<FunctionalCalendar 
							ref="Calendar"
							:configs="calendarConfigs"
						>
						</FunctionalCalendar>
					</div>
					<div 
						class="purchase__calendar" 
						v-else 
						style="min-height: 300px; position: relative;">
						<loader/>
					</div>
					<div class="purchase__update-date">
						<p>							
							Последняя дата обновления: {{selectedStore.lastUpdated |  formatData}}
						</p>
					</div>

					<!-- <button class="button button--green" @click="resetDays"> 
						adasdas
					</button>

					setBrands: {{brands}} -->
				</div>				
			</div>			
		</template>
		<modal-select/>
	</main>

</template>

<script>	
	import { FunctionalCalendar } from 'vue-functional-calendar';
	// import moment from 'moment'		
	export default{
		components: {
	        FunctionalCalendar
	    },
	    filters:{
	    	formatData(value){
	    		return moment(value).format('DD.MM.YYYY');
	    	},
	    },
		data(){
			return{
				loaderStatus: true,
				selectedStore: '',
				brands : [],
				selectedDays: false,
				planData:'',
				amountDays:'',
				weekEnds: '',
				currentData: localStorage.getItem('lastUpdated') ? localStorage.getItem('lastUpdated') : '',
				calendarConfigs: {
	                sundayStart: false,
	                isDatePicker: false,
	                dateFormat: 'dd/mm/yyyy',
	                isDatePicker: false,
	                isDateRange: false,
	                markedDates: [{date: '16/3/2020', class: 'marked-class'}],
	                disabledDayNames: [],
	                dayNames: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
	                monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июнь", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
	                hiddenElements: ['leftAndRightDays','navigationArrows'], 
	            },
			   // disabledDayNames:[]
			}
		},
		async mounted(){			

            
            
            this.$nuxt.$on('setDays',this.setDays)
            this.$nuxt.$on('setDefault', this.setDefault);


            let interval1= setInterval(
                () => {                    
                    if($('.vfc-span-day').length > 0) {
                        clearInterval(interval1);
                        // this.getWeekends();
                    }                    
                },
                1000
            );


            await this.setBrands();
            await this.getHolidays();
            await this.getWeekends();
            await this.getDates();
            
        	
		},
		computed:{
			getCurrentData(){
				return moment().format('DD.MM.YYYY');
			},		
			getCheckedDays(){	
				// console.log('days',this.calendarConfigs.disabledDayNames)
				// this.disabledDayNames = this.$store.state.checkedDays;
				if(!this.calendarConfigs.disabledDayNames.length) return;
				let arr = this.calendarConfigs.disabledDayNames,
					weekdays = [];	
				for(let i = 0; i<arr.length; i++){
					switch (arr[i]){
						case 'Пн':
							weekdays.push(1)
							break;
						case 'Вт':
							weekdays.push(2)
							break;
						case 'Ср':
							weekdays.push(3)
							break;
						case 'Чт':
							weekdays.push(4)
							break;
						case 'Пт':
							weekdays.push(5)
							break;
						case 'Сб':
							weekdays.push(6)
							break;
						case 'Вс':
							weekdays.push(7)
							break;
					}
				}
				return weekdays;
			}			
		},
		methods:{
			
			async setBrands(){
				
				let arr = []

				if(!JSON.parse(localStorage.getItem('tradePoints')).length){
					arr.push(JSON.parse(localStorage.getItem('tradePoints')))
					this.selectedStore = arr[0];
					this.brands = arr;
				} else {
					this.selectedStore = JSON.parse(localStorage.getItem('tradePoints'))[0];
					this.brands = JSON.parse(localStorage.getItem('tradePoints'))
				}				
				await this.getStoreData(this.selectedStore, 'first');
			},	

			// выясняет количество выбранных дней в текущем месяце
			getDates(){
			    let start = moment(),
					end = moment().endOf('month'),
					days = ['Monday'];
					
				this.amountDays = moment().weekdayCalc({  
				  	rangeStart: start,  
				  	rangeEnd: end,  
				  	weekdays: this.getCheckedDays,  
				  	exclusions: this.weekEnds,
				  	inclusions: []
				}) //260	

				// console.log('this.amountDays: ', this.amountDays)	
				// console.log("2: ")	
			},		

			// очищает выбранные дни в календаре и открывает модалку для выбора дней
			clearData(){
				this.calendarConfigs.disabledDayNames = [];
				this.selectedDays = false;
				$('#modal-select').modal('show');
			},

			setDefault(){
				this.calendarConfigs.disabledDayNames = this.selectedStore.purchase_days.length ? this.selectedStore.purchase_days : [];
				this.selectedDays = !this.selectedDays;				
			},

			// вставляет выбранные дни в календарь
			async setDays(){
				this.calendarConfigs.disabledDayNames = this.$store.state.checkedDays;		
				this.selectedDays = true;
				await this.sendDays();				
				await this.resetDays();
				await this.getWeekends();
				await this.getDates();
			},

			// выходные и праздничные дни
			async getHolidays(){

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

				try{

					let res = await this.$axios.$get('/dict/holidays')

					let obj = [],arr = res.holidays;


					for(let i =0; i< arr.length; i++){
						let item = {
							'date': arr[i],
							'class': 'marked-class'
						}

						obj.push(item)
					}

					this.calendarConfigs.markedDates = obj;	
					this.calendarConfigs.disabledDayNames = this.brands[0].purchase_days;			
					console.log('selectedDaysB:', this.selectedDays)		
					this.selectedDays= true;
					console.log('selectedDaysA:', this.selectedDays)		
		        } catch(error){

		          console.log('errorPush', error)
		        }
			},

			// отправляет выбранные дни торговой точки
			async sendDays(){



				let fileds = {
					'tradepoint': this.selectedStore.account_code,
					'weekdays': this.calendarConfigs.disabledDayNames
				}

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

				try{

					let res = await this.$axios.$post('/purchase/save-days',fileds)	
					console.log("4: ")				

		        } catch(error){

		          console.log('errorPush', error)
		        }				
			},

			// получает план торговой точки
			async getStoreData(value, status){

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');								

				try{

					let res = await this.$axios.$get('/purchase/plan-fact?tradepoint=' + value.account_code);

					this.planData = res;

					this.loaderStatus = false;

					if(status == 'true'){
						this.selectedDays = true;
					}

				} catch(error){
					if(status == 'true'){
						this.selectedDays = true;
					}
					console.log(error)
				}
			},


			// меняет и записывает выбранные дни торговой точки 
			resetDays(){
				let obj = this.brands;
				// console.log('obj:', obj);

				for(let i =0; i< obj.length; i++){
					if(obj[i].account_code == this.selectedStore.account_code){
						obj[i].purchase_days = this.calendarConfigs.disabledDayNames;
					}
				}
								
				localStorage.setItem("tradePoints",JSON.stringify(obj));
				this.brands = obj;
				// console.log("3: ")
			},

			async checkDisabledDays(){

				this.selectedDays = false;

				
				if(this.selectedStore.purchase_days.length){
					this.calendarConfigs.disabledDayNames = this.selectedStore.purchase_days;
					await this.getStoreData(this.selectedStore, 'true');
					await this.getWeekends();
					await this.getDates();
					// this.selectedDays = true;
				} else {
					// this.selectedDays = true;
					this.calendarConfigs.disabledDayNames = [];
					await this.getStoreData(this.selectedStore, 'true');
					await this.getWeekends();
					await this.getDates();
				}
			},
			
			getWeekends(){
				
				let arr = [], a = $('.vfc-span-day.vfc-cursor-not-allowed.vfc-hide.marked-class');
				for(let i =0; i < a.length; i++){
					let day = Number(a[i].innerText)  >= 10 ? a[i].innerText : '0' + a[i].innerText
					let item = moment().format('YYYY') + '-' +moment().format('MM') + '-' + day;
					arr.push(item);
				}
				this.weekEnds = arr;
			}
		}
	}
</script>

<style lang="scss">
	.purchase{
		width: 100%;
		padding: 16px 0 20px 0;
		&__selector{
			.form{
				&-group{
					&--selector{
						margin-top: 8px;
					}
				}
				&__label{
					&--selector{
						z-index: 1;
					}
				}
			}
		}
		&__plan{
			margin-top: 16px;
			display: flex;
			justify-content: space-between;
			.item{
				.title{
					font-family: 'Roboto';
					font-style: normal;
					font-weight: 300;
					font-size: 16px;
					line-height: 19px;									
					color: #969696;
				}
				.amount{
				    font-family: 'Open Sans';
					font-style: normal;
					font-weight: bold;
					font-size: 18px;
					line-height: 25px;					
					color: #217461;
				}
			}
		}
		&__recommendations{
			margin-top: 8px;
			.title{
				font-family: 'Roboto';
				font-style: normal;
				font-weight: 300;
				font-size: 16px;
				line-height: 19px;				
				color: #969696;
				margin-bottom: 8px;
			}
			.amount{
				font-family: 'Open Sans';
				font-style: normal;
				font-weight: bold;
				font-size: 18px;
				line-height: 25px;				
				color: #217461;
				&--text{
					font-family: 'Roboto';
					font-style: normal;
					font-weight: 500;
					font-size: 16px;
					line-height: 19px;					
					color: #969696;
				}
			}
		}
		&__select{
			margin-top: 24px;
		}
		&__update-date{
			margin-top: 24px;
			p{
				margin-bottom: 0;
				font-weight: 300;
				font-size: 16px;
				line-height: 19px;				
				color: #969696;
			}
			@media screen and (max-width: 330px) {
				p{
					font-size: 14px;
					line-height: 16px;
				}
			}
		}
		&__calendar{
			margin-top: 24px; 
			.ring{
				width: 40px;
				height: 40px;
				top: 0;
				bottom: 0;
				margin: auto;
			}
			.vfc{
				&-content{
					z-index: 9 !important;
				}
				&-main-container{
					background-color: transparent;
					box-shadow: none;
				}
				&-arrow{
					&-left,&-right{
						// display: none !important;
					}
				}
				&-dayNames{
					span{
						margin-right: 0px !important;
						font-style: normal;
						font-weight: 500;
						font-size: 16px;
						line-height: 19px;
						text-align: center;
						color: rgba(0, 0, 0, 0.543337) !important;
					}
				}
				&-day{

				}
				&-span-day{
					font-size: 16px !important;
					line-height: 19px;
					text-align: center;
					&.vfc-today{
						color:#212529 !important;
						background-color: transparent !important; 
					}
					&.vfc-hide{
						color: #05B186 !important;
						font-weight: 500;
						&.marked-class{
							color: #969696 !important;
							font-weight: 300;							
						}
					}					
					&.vfc-hover{
						background-color: transparent !important; 
						&.marked-class{
							color: #969696 !important;
							font-weight: 300;							
						}
					}
					&.vfc-marked{
						background-color: transparent !important;
						
					}
				}
				&-top-date{
					margin: 0;
					margin-bottom: 8px !important;
					a{
						font-family: 'Open Sans';
						font-style: normal;
						font-weight: bold;
						font-size: 18px;
						line-height: 25px;						
						text-align: center;
						color: #217461 !important;
						margin: 0;
						&:last-child{
							display: none;
						}
					}
				}
			}	
		}
	}
</style>