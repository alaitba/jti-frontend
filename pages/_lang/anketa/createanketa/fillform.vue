<template>
	<main class="page page--flex page--grey">
		<div class="fill-section">
			<div class="fill-section__menu navigation-menu">
				<ul class="nav nav-pills">
					<li class="nav-item">
						<a class="nav-link active" data-toggle="pill" href="#home">
							{{$t('Заполнить анкету')}}
						</a>
					</li>
				  	<li class="nav-item">
						<a class="nav-link" data-toggle="pill" href="#menu">
							{{$t('Отправить ссылку')}}
						</a>
					</li>
				</ul>
			</div>
			<div class="fill-section__content navigation-content tab-content">				
				<div class="tab-pane container active" id="home">
					<div class="head">
						<p class="head__title">
							{{$t('Номер телефона покупателя')}} <br>
							<span v-if="anketaNumber">
								+{{anketaNumber | formatNumber}}
							</span>
						</p>
					</div>
					<div class="body">
						<div class="fill-section__form">
							<form @submit.prevent="validateBeforeSubmit">
					            <label for="" class="title__label">
					              {{$t('Данные покупателя')}}
					            </label>
					            <div class="form-group">             
					              	<div class="form-group__wrapper">
					                	<!-- <input type="text" :class="{'form__input': true, 'error' : false }" placeholder=" " v-model="fields.firstName" > -->
						                <input 
						                	:class="{'form__input': true, 'error' : errors.has('firstName') }" 
						                	v-validate="'required'" 
						                	type="text" 
						                	placeholder=" " 
						                	v-model="field.firstName" 
						                	name="firstName"
						                	autocomplete="off"
						                	:disabled="getFilledAnketa"
						                >
						                <label for="input" class="form__label">
						                	{{$t('Имя')}}
						                </label>  					                
					              	</div>
					              	<span v-show="errors.has('firstName')" class="help is-danger">{{ errors.first('firstName') }}</span>
					            </div>
					            <div class="form-group">             
					              	<div class="form-group__wrapper">
						                <input 
						                	type="text" :class="{'form__input': true, 'error' : errors.has('secondName') }" 
						                	v-validate="'required'" 
						                	placeholder=" " 
						                	v-model="field.secondName" 
						                	name="secondName"
						                	autocomplete="off"
						                	:disabled="getFilledAnketa"
						                >
						                <label for="input" class="form__label">
						                	{{$t('Фамилия')}}
						                </label>  
						            </div>
					              	<span v-show="errors.has('secondName')" class="help is-danger">	{{ errors.first('secondName') }}</span>
					            </div>
					            <div class="form-group">             
					              <div class="form-group__wrapper">
					                <the-mask 
					                	type="tel" 
					                	placeholder=" " 
					                	name="birthData" 
					                	:mask="['##.##.####']" 
					                	:class="{'form__input': true, 'error' : errors.has('birthData') || !ageValidate}"
					                	v-model="field.birthData" 
					                	v-validate="'required|date_format:DD.MM.YYYY|after:01.01.1899'"
					                	:masked="true"
					                	autocomplete="off"
					                	:disabled="getFilledAnketa"
					                	/>					                	
					                <label for="input" class="form__label">
					                	{{$t('Дата рождения')}}
					                </label>  
					              </div>
					              <span  class="help is-danger">
					              	<template v-show="errors.has('birthData')">
					              		{{ errors.first('birthData') }}
					              	</template>	
					              	<template v-if="errors.has('birthData') && (!ageValidate)">. </template>					              	
					              	<template v-if="!ageValidate">
					              		{{$t('Потребитель должен быть старше 21 года')}}
					              	</template>						              	
					              </span>

					            </div>

								<div class="form-group" v-if="brands">
					            	<multiselect 
					            		v-model="field.selectedBrand" 
					            		name="brands"
					            		:options="brands" 
					            		:searchable="false" 
					            		:close-on-select="true" 
					            		:show-labels="false" 
					            		:placeholder="$t('Выбери марку сигарет')"
					            		v-validate="'required'"	
					            		:disabled="getFilledAnketa"
					            	>					            		
					            	</multiselect>
					            	<span v-show="errors.has('brands')" class="help is-danger">
					            		{{ errors.first('brands') }}
					            	</span>
					            </div>
																

					            <!-- <div class="form-group" v-if="options[field.selectedBrand]">					            	
					            		<multiselect 
					            			v-model="field.cigaretteBrand" 
					            			track-by="sku"
					            			label="sku" 							
					            			placeholder="Марка сигарет" 
					            			:options="options[field.selectedBrand]" 
					            			:searchable="false" 
					            			:allow-empty="false"
					            			selectLabel=""
					            			tagPlaceholder=""
					            			selectGroupLabel=""
					            			deselectLabel=""
					            			selectedLabel=""
					            			>
					            		</multiselect>
					            	
					            </div> -->
					            <!-- <label for="" class="title__label" v-if="!getFilledAnketa">
					            	{{$t('Подпись покупателя')}}
					            </label>
					            <div class="form-group" v-if="!getFilledAnketa"> 
					              	<div class="form-group__wrapper form-group__wrapper--grey" @click="showModal('modal-agreement')" v-if="!field.img">
						                <input type="text" :class="{'form__input': true, 'error' : false }" placeholder=" " v-model="field.firstName" >
						                <label for="input" class="form__label">
						                  Имя
						                </label>  
						              </div>
					              	<div class="form-group__wrapper form-group__wrapper--grey" :style="{'background-image' : 'url(' +field.img+ ')'}" v-if="field.img">
					              	
					              	</div>
					            </div>


					            <div class="form-group mb-32" v-if="getFilledAnketa">
					            	<p class="content">
					            		{{$t('В случае несоответствия данных потребителя, он может изменить данные самостоятельно на сайте realday.kz')}}
					            	</p>
					            </div> -->
								
								<!-- <template v-if="!getFilledAnketa">
									<button class="button button--green" type="submit" :disabled="errors.any() || !anketaNumber || !field.img.length || !field.selectedBrand.length || !ageValidate || anketaBtnStatus">
						              {{$t('Сохранить анкету')}}
						            </button>
								</template>	 -->


								<!-- discleimer -->

								<!-- <div class="form-group mb-32">
					            	<p class="content">
					            		{{$t('discleimer')}}
					            	</p>
					            </div> -->
								<!-- <template v-else> -->
									<button class="button button--green" type="submit" :disabled="errors.any() || !anketaNumber || !field.selectedBrand.length || !ageValidate || anketaBtnStatus">
						              {{$t('Сохранить анкету')}}
						            </button>
								<!-- </template>				             -->
					            <!-- <button class="button button--green"  @click="showModal()">
					              Далее
					            </button> -->
				          	</form>
				        </div>
					</div>
				</div>
				<div class="tab-pane container fade" id="menu">
					<div class="fill-section__form">
						<div class="head">
							<p class="head__title">
								{{$t('Номер телефона покупателя')}} <br>
								<span v-if="anketaNumber">
									+{{anketaNumber | formatNumber}}
								</span>
							</p>
						</div>
						<div class="body">
							<p class="text" v-html="$t('fill')">
								
							</p>

							<!-- <button class="button button--green" type="button" @click="showModal('modal-error')">
					        	Отправить ссылку
					        </button> -->
					        <button class="button button--green" type="button" :disabled="!anketaNumber || smsBtnStatus || getFilledAnketa" @click="sendLinkSms()">
				        		{{$t('Отправить ссылку')}}
					        </button>
						</div>
					</div>
				</div>				
			</div>
		</div>	

		<modal-agreement></modal-agreement>
		<!-- <modal-draw-sign></modal-draw-sign> -->
		<modal-anketa-error></modal-anketa-error>
		<modal-error></modal-error>
		<modal-main :title="title" :text="text" :img="img" :number="number" :btnText="btnText"></modal-main>

	</main>
</template>
<script>


	import {TheMask} from 'vue-the-mask'	
	import ModalSendLink from '~/components/layouts/Modals/ModalSendLink.vue'
	import ModalAgreement from '~/components/layouts/Modals/ModalAgreement.vue'
	import ModalDrawSign from '~/components/layouts/Modals/ModalDrawSign.vue'
	import ModalAnketaError from '~/components/layouts/Modals/ModalAnketaError.vue'
	import ModalExist from '~/components/layouts/Modals/ModalExist.vue'
	import ModalMain from '~/components/layouts/Modals/modal-main.vue'
	import ModalError from '~/components/layouts/Modals/ModalError.vue'
	import {mapState, mapMutations} from 'vuex'
	import { Validator } from 'vee-validate';

	import moment from 'moment'

	const dict = {
		ru:{
			messages: {				
	            date_format: "Введите правильные данные",	            
	            date_between: 'Потребитель должен быть старше 21 года',
	            required: 'Поле обязательно к заполнению',
	            after: 'Введите правильный год рождения'
	        }, 
	        custom: {
	        	birthData: "Потребитель должен быть старше 21 года",
	        }
		},
		kk:{
			messages: {
                date_format: "Дұрыс деректерді енгізіңіз",
                date_between: 'Тұтынушы 21 жастан асқан болуы керек',
                required: 'Міндетті өріс',
                after:'Дұрыс туған жылды енгізіңіз'
            },
            custom: {
	        	birthData: "Тұтынушы 21 жастан асқан болуы керек",
	        }
		}
	}
	export default{

		components: {
			TheMask,
			ModalSendLink,
			ModalAgreement,
			ModalDrawSign,	
			ModalAnketaError,
			ModalExist,	
			ModalError,
			ModalMain,	
			// Multiselect
		},
		filters: {
	      formatNumber (value){
	        return String(value).replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
	      }
	    },
		data() {
			return {
				// field: {
				// 	firstName: '',
				// 	secondName: '',
				// 	birthData: '',	
				// 	selectedBrand: '',	
				// 	cigaretteBrand: '',				
				// 	img: '',
				// 	self:'',
				// },
				field: {
					firstName: localStorage.getItem('client_data') ? JSON.parse(localStorage.getItem('client_data')).firstName : '',
					secondName: localStorage.getItem('client_data') ? JSON.parse(localStorage.getItem('client_data')).lastName : '',
					birthData: localStorage.getItem('client_data') ? JSON.parse(localStorage.getItem('client_data')).birthDate : '',	
					selectedBrand: localStorage.getItem('client_data') ? JSON.parse(localStorage.getItem('client_data')).brand : '',	
					cigaretteBrand: '',				
					img:  '',
					self:'',
				},
				options: {},
				brands: [],
				// selectedBrand:'',
				anketaNumber : localStorage.getItem("anketaNumber"),
				number:'',
				title:'',
				text:'',
				img:'',
				btnText: '',

				//btnStatus

				smsBtnStatus: false,
				anketaBtnStatus: false,
			}
		},
		computed: {
		    ...mapState({
		      authToken: state => state.authToken,     
		      // anketaNumber: state =>state.numberAnketa
		    }),

		    getFilledAnketa(){
		    	if(localStorage.getItem('client_data')){
		    		return  (localStorage.getItem('client_data')).length> 0 ? true : false;	
		    	}else{
		    		return false;
		    	}		    	
		    },

		    ageValidate(){
		    	if(this.field.birthData){
		    		let  chosenDate = moment(this.field.birthData, "DD-MM-YYYY");
			    	let age = moment().diff(chosenDate, 'years')	
			    	if(age>=21){
			    		return true
			    	} else {
			    		return false
			    	}
		    	} else {
		    		return true
		    	}		    			    
		    },

		},
		async mounted(){
			await this.getProducts();
			Validator.localize(this.$i18n.locale,dict[this.$i18n.locale])
			// this.$nuxt.$on('Save',(data) =>{
			// 	this.field.img = data;
			// 	// console.log('data',this.field.img)
			// })

			if(this.getFilledAnketa && !this.ageValidate){

				// alert('miko');

				this.title = this.$t('Отказано в доступе!');
         		this.text = this.$t('Потребителю нет 21 года. Согласно новому кодексу «О здоровье народа и системе здравоохранения», лицам младше 21 года продажа сигарет запрещена.');
         		this.img = 'error';
         		this.btnText = 'anketa-error';
         		$('#modal-main').modal('show')

			}
		},
		methods:{
			showModal(modal){
				// if(modal == 'modal-draw-sign'){
				// 	// var canvas = document.getElementById('signature-pad');
				// 	// var signaturePad = new SignaturePad(canvas,{
				// 	// 	penColor: "rgb(0, 0, 0)"
				// 	// });
				// }
				// this.text = 'Раздел будет доступен с 3 февраля'
				// console.log('modal', modal)
				$('#'+modal).modal('show')
			},

			saveToCache(){
				// console.log(this.field,'field');
                localStorage.setItem('anketaFields', JSON.stringify(this.field));
            },

			async getProducts() {

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

				await this.$axios.get('/dict/tobacco-products/')
		        .then(response =>{
		        	if(response.data.status =='ok'){
		         		// this.$router.push('/anketa/listanketa')		            	
		         		this.options = response.data.data;
		         		for(let i in response.data.data){
		         			// console.log(i,'i')
		         			this.brands.push(i)
		         		}		         		
		         		
		          	} 
		        }).catch(error => {
		            
		        });
			},

			validateBeforeSubmit(self) {
				
		      	this.$validator.validateAll().then((result) => {
			        if (result) {		        	
		        		this.anketaBtnStatus = true;
		        		// this.saveToCache();
			        	this.saveAnketa();			        				
			        	return;
			        } else {
			        	this.title= this.$t('Заполните все поля!')
		              	this.text= this.$t('Для сохранения анкеты заполните все поля!')
		              	this.img="error"
			            $('#modal-main').modal('show')
			        }		        
		      	});
		    },

		    async sendLinkSms(){
		    	let fields = {
		    		'mobile_phone': '+'+this.anketaNumber,
		    		'self': 1
		    	}

		    	this.smsBtnStatus = true;
		    	this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('authToken');

		    	await this.$axios.post('/client/create-lead/', fields)
		    		.then(response =>{
		    			this.number = this.anketaNumber;
		    			this.img = 'mail';
		    			this.text = this.$t('На указанный номер отправлена ссылка для заполнения анкеты');
		    			this.btnText = 'Готово'
		    			this.smsBtnStatus = false;
						$('#modal-main').modal('show');

		    		}).catch(error =>{
		    			this.smsBtnStatus = false;		    			
		    			if(error.response.data.message=='already_filled'){
			        		this.number = this.anketaNumber;
			        		this.text = this.$t('На указанный номер уже отправлен смс со ссылкой!');
			        		this.img = 'error';
				        	$('#modal-main').modal('show')				
						} else{						
				        	$('#modal-anketa-error').modal('show')				            
						}
		    		})
		    },

			async saveAnketa(){

				let fields = {
					'mobile_phone': '+'+this.anketaNumber,
					'firstname': this.field.firstName,
					'lastname': this.field.secondName,
					'birthdate': this.field.birthData,
					'product_code': this.options[this.field.selectedBrand][0].product_code,
					'signature': this.field.img,
					'self': ''
				}
			
				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('authToken');

				await this.$axios.post('/client/create-lead/', fields)
			        .then(response =>{
			        	this.anketaBtnStatus = false;
			         	if(response.data.status =='ok'){
			         		this.title = this.$t('Анкета сохранена');
			         		this.text = this.$t('Спасибо, Партнёр! Не забудьте напомнить потребителю отправить код с пачки LD');
			         		this.img = 'exist';
			         		this.btnText = 'anketa';
			         		$('#modal-main').modal('show')
			          	} 
			        }).catch(error => {
			        	this.anketaBtnStatus = false;
			        	console.log(error.response,'error')
			        	if(error.response.data.message=='already_filled'){
			        		this.number = this.anketaNumber;
			        		this.text = this.$t('На указанный телефон анкета уже заполнялась в данной торговой точке!');
			        		this.img = 'error';
				        	$('#modal-main').modal('show')				
						} else if((error.response.data.message=='validation_failed') || (error.response.data.message=='mobile_phone_not_verified')){
							// this.number = this.anketaNumber;
				            this.title= this.$t('Отказано в доступе!')
			              	this.text= this.$t('Номер телефона введен неверно или не внесен в базу данных!')
			              	this.img="error"
				            $('#modal-main').modal('show')				
						} else {
							this.title= this.$t('Отказано в доступе!')
			              	this.text= this.$t('Номер телефона введен неверно или не внесен в базу данных!')
			              	this.img="error"
			              	$('#modal-main').modal('show')
						}							
			        });
			}

		}
	}
</script>

<style lang="scss">	
	.mb-32{
		margin-bottom: 32px !important;
		.content{
			font-weight: 300;
			font-size: 16px;
			line-height: 19px;
			color: #000000;
			margin-bottom: 0;
		}
	}
	.help.is-danger{
		font-weight: normal;
		font-size: 12px;
		line-height: 14px;
		text-align: center;
		color: #F42626;
	}
	.fill-section{
		width: 100%;
		// &__menu{
		// 	position: fixed;
		// 	top: 56px;
		// 	left: 0;
		// 	background: #fff;
		// 	// height: 51px;
		// 	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
		// 	z-index: 11;
		// 	width: 100%;
		// 	.nav{
		// 		&-pills{
		// 			flex-wrap: nowrap;
		// 			width: 100%;
		// 		}
		// 		&-item{
		// 			width: 100%;
		// 		}
		// 		&-link{
		// 			font-weight: 500;
		// 			font-size: 16px;
		// 			line-height: 19px;					
		// 			text-align: center;
		// 			color: #969696;
		// 			background-color: transparent;
		// 			padding: 16px;
		// 			border-radius: 0;
		// 			&.active{
		// 				color: #05B186;
		// 				background-color: transparent;
		// 				border-bottom: 2px solid #05B186;
		// 			}
		// 		}
		// 	}
		// }
		&__content{
			margin-top: 84px;
			padding-bottom: 84px;
			.head{
				margin-bottom: 16px;
				&__title{
					font-weight: 300;
					font-size: 16px;
					line-height: 19px;				
					color: #1F1F1F;
					margin-bottom: 0;
					span{
						font-weight: bold;
						font-size: 18px;
						line-height: 25px;						
						color: #217461;
					}
				}
			}
			.body{
				.form-group{
					margin-bottom: 24px;
				}

				.text{
					font-weight: 300;
					font-size: 16px;
					line-height: 19px;
					color: #6E6E6E;
					margin-bottom: 40px;
				}
				// .multiselect{
				// 	&__tags{
				// 		min-height: 55px;
				// 		padding: 18px 12px;
				// 		border: 0;
				// 		background: #F0F0F0;
				// 		border-radius: 8px;
				// 		font-family: Roboto;
				// 		font-weight: 300;
				// 		font-size: 16px;
				// 		line-height: 19px;
				// 	}
				// 	&__placeholder{
				// 		color: #969696;
				// 		margin-bottom: 0;
				// 		padding: 0;
				// 	}
				// 	&__select{
				// 		height: 55px;
				// 		&:before{
				// 			top: 55%;
				// 		}
				// 	}
				// 	&__input,&__single{
				// 		background: transparent;
				// 		padding: 0;
				// 		font-size: 16px;
				// 		line-height: 19px;
				// 		color: #6E6E6E;
				// 		margin-bottom: 0;
				// 		min-height: auto;						
				// 	}
				// 	&__option{
				// 		font-family: Roboto;
				// 		font-weight: 300;
				// 		font-size: 16px;
				// 		line-height: 19px;	
				// 		&--highlight{
				// 			background: #C2EEE3;
				// 			color: #000;
				// 		}	
				// 		&--selected{
				// 			background: #05B186;
				// 			color: #fff;
				// 		}					
				// 	}
				// }
				// .multiselect__option--highlight.multiselect__option--selected{
				// 	background: #05B186;
				// }
			}
		}
	}
</style>