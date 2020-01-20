<template>
	<main class="page">
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
				<div class="tab-pane container active" id="home">
					<div class="head">
						<p class="head__title">
							Номер телефона покупателя <br>
							<span>
								{{anketaNumber | formatNumber}}
							</span>
						</p>
					</div>
					<div class="body">
						<div class="fill-section__form">
							<form @submit.prevent="validateBeforeSubmit">
					            <label for="" class="title__label">
					              Данные покупателя
					            </label>
					            <div class="form-group">             
					              <div class="form-group__wrapper">
					                <!-- <input type="text" :class="{'form__input': true, 'error' : false }" placeholder=" " v-model="fields.firstName" > -->
					                <input :class="{'form__input': true, 'error' : errors.has('firstName') }" v-validate="'required'" type="text" placeholder=" " v-model="field.firstName" name="firstName">
					                <label for="input" class="form__label">
					                  Имя
					                </label>  					                
					              </div>
					              <span v-show="errors.has('firstName')" class="help is-danger">{{ errors.first('firstName') }}</span>
					            </div>
					            <div class="form-group">             
					              <div class="form-group__wrapper">
					                <input type="text" :class="{'form__input': true, 'error' : errors.has('secondName') }" v-validate="'required'" placeholder=" " v-model="field.secondName" name="secondName">
					                <label for="input" class="form__label">
					                  Фамилия
					                </label>  
					              </div>
					              <span v-show="errors.has('secondName')" class="help is-danger">{{ errors.first('secondName') }}</span>
					            </div>
					            <div class="form-group">             
					              <div class="form-group__wrapper">
					                <the-mask 
					                	type="tel" 
					                	placeholder=" " 
					                	name="birthData" 
					                	:mask="['##/##/####']" 
					                	:class="{'form__input': true, 'error' : errors.has('birthData') }"
					                	v-model="field.birthData" 
					                	v-validate="'date_format:DD/MM/YYYY|date_between:01/01/1960,20/09/2000'"
					                	:masked="true"
					                	/>					                	
					                <label for="input" class="form__label">
					                  Дата рождения
					                </label>  
					              </div>
					              <span v-show="errors.has('birthData')" class="help is-danger">{{ errors.first('birthData') }}</span>
					            </div>

								<div class="form-group" v-if="brands">
					            	<multiselect v-model="selectedBrand" :options="brands" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Выбери марку сигарет"></multiselect>
					            </div>

					            <div class="form-group" v-if="options[selectedBrand]">					            	
					            		<multiselect 
					            			v-model="field.cigaretteBrand" 
					            			track-by="sku"
					            			label="sku" 							
					            			placeholder="Марка сигарет" 
					            			:options="options[selectedBrand]" 
					            			:searchable="false" 
					            			:allow-empty="false"
					            			selectLabel=""
					            			tagPlaceholder=""
					            			selectGroupLabel=""
					            			deselectLabel=""
					            			selectedLabel=""
					            			>
					            		</multiselect>
					            	
					            </div>
					            <label for="" class="title__label">
					              Подпись покупателя
					            </label>
					            <div class="form-group">             
					              	<div class="form-group__wrapper form-group__wrapper--grey" @click="showModal('modal-draw-sign')" v-if="!field.img">
						                <!-- <input type="text" :class="{'form__input': true, 'error' : false }" placeholder=" " v-model="field.firstName" >
						                <label for="input" class="form__label">
						                  Имя
						                </label>   -->
						              </div>
					              	<div class="form-group__wrapper form-group__wrapper--grey" :style="{'background-image' : 'url(' +field.img+ ')'}" v-if="field.img">
					              	
					              	</div>
					            </div>

					            <button class="button button--green" type="submit" :disabled="errors.any() || !anketaNumber || !field.img.length">
					              Сохранить анкету
					            </button>
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
								Номер телефона покупателя <br>
								<span>
									{{anketaNumber | formatNumber}}
								</span>
							</p>
						</div>
						<div class="body">
							<p class="text">
								Покупателю на номер телефона  будет отправлена ссылка на самостоятельное заполнение анкеты. За самостоятельно заполненную анкету вам будет начислено 50 баллов
							</p>

							<button class="button button--green" type="button" @click="showModal('modal-send-link')">
					        	Отправить ссылку
					        </button>
						</div>
					</div>
				</div>				
			</div>
		</div>	

		<modal-send-link :number="number"></modal-send-link>	
		<modal-agreement></modal-agreement>
		<modal-draw-sign></modal-draw-sign>
		<modal-anketa-error></modal-anketa-error>

	</main>
</template>
<script>


	import {TheMask} from 'vue-the-mask'	
	import ModalSendLink from '~/components/layouts/Modals/ModalSendLink.vue'
	import ModalAgreement from '~/components/layouts/Modals/ModalAgreement.vue'
	import ModalDrawSign from '~/components/layouts/Modals/ModalDrawSign.vue'
	import ModalAnketaError from '~/components/layouts/Modals/ModalAnketaError.vue'
	import {mapState, mapMutations} from 'vuex'
	import { Validator } from 'vee-validate';

	const dict = {
		ru:{
			messages: {				
	            date_format: "Введите правильные данные",	            
	            required: 'Поле обязательно к заполнению'
	        }, 
	        custom: {
	        	birthData: "Введите правильные данные",
	        }
		},
		kk:{
			messages: {
                date_format: "Дұрыс деректерді енгізіңіз",
                required: 'Міндетті өріс'
            },
            custom: {
	        	birthData: "Дұрыс деректерді енгізіңіз",
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
			// Multiselect
		},
		filters: {
	      formatNumber (value){
	        return '+' + String(value).replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
	      }
	    },
		data() {
			return {
				field: {
					firstName: '',
					secondName: '',
					birthData: '',	
					cigaretteBrand:'',				
					img:'',
				},
				options: {},
				brands: [],
				selectedBrand:'',
				number:'7776665544'
			}
		},
		computed: {
		    ...mapState({
		      authToken: state => state.authToken,     
		      anketaNumber: state =>state.numberAnketa
		    }),
		},
		mounted(){
			this.getProducts();
			Validator.localize('ru',dict['ru'])
			this.$nuxt.$on('Save',(data) =>{
				this.field.img = data;
				// console.log('data',this.field.img)
			})
		},
		methods:{
			showModal(modal){
				if(modal == 'modal-draw-sign'){
					// var canvas = document.getElementById('signature-pad');
					// var signaturePad = new SignaturePad(canvas,{
					// 	penColor: "rgb(0, 0, 0)"
					// });
				}
				$('#'+modal).modal('show')
			},

			async getProducts() {

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+this.authToken;

				await this.$axios.get('http://jti.ibec.systems/api/v1/dict/tobacco-products/')
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

			validateBeforeSubmit() {
		      this.$validator.validateAll().then((result) => {
		        if (result) {
		        	this.saveAnketa();
		        	return;
		        } else {
		        	alert('Correct them errors!');
		        }		        
		      });
		    },

			async saveAnketa(){

				let fields = {
					'mobile_phone': this.anketaNumber,
					'firstname': this.field.firstName,
					'lastname': this.field.secondName,
					'birthdate': this.field.birthData,
					'product_code': this.field.cigaretteBrand.product_code,
					'signature': this.field.img
				}

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+this.authToken;

				await this.$axios.post('http://jti.ibec.systems/api/v1/client/create-lead/', fields)
		        .then(response =>{
		         	if(response.data.status =='ok'){
		         		this.$router.push('/anketa/listanketa')		            	
		          	} 
		        }).catch(error => {
		            $('#modal-anketa-error').modal('show')				            
		        });


			}

		}
	}
</script>
<style lang="scss">
	main.page{
		display: flex !important;
	}
	.fill-section{
		width: 100%;
		&__menu{
			position: fixed;
			top: 56px;
			left: 0;
			background: #fff;
			// height: 51px;
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
			z-index: 11;
			width: 100%;
			.nav{
				&-pills{
					flex-wrap: nowrap;
					width: 100%;
				}
				&-item{
					width: 100%;
				}
				&-link{
					font-weight: 500;
					font-size: 16px;
					line-height: 19px;					
					text-align: center;
					color: #969696;
					background-color: transparent;
					padding: 16px;
					border-radius: 0;
					&.active{
						color: #05B186;
						background-color: transparent;
						border-bottom: 2px solid #05B186;
					}
				}
			}
		}
		&__content{
			margin-top: 84px;
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
				.multiselect{
					&__tags{
						min-height: 55px;
						padding: 18px 12px;
						border: 0;
						background: #F0F0F0;
						border-radius: 8px;
						font-family: Roboto;
						font-weight: 300;
						font-size: 16px;
						line-height: 19px;
					}
					&__placeholder{
						color: #969696;
						margin-bottom: 0;
						padding: 0;
					}
					&__select{
						height: 55px;
						&:before{
							top: 55%;
						}
					}
					&__input,&__single{
						background: transparent;
						padding: 0;
						font-size: 16px;
						line-height: 19px;
						color: #6E6E6E;
						margin-bottom: 0;
						min-height: auto;						
					}
					&__option{
						font-family: Roboto;
						font-weight: 300;
						font-size: 16px;
						line-height: 19px;	
						&--highlight{
							background: #C2EEE3;
							color: #000;
						}	
						&--selected{
							background: #05B186;
							color: #fff;
						}					
					}
				}
				.multiselect__option--highlight.multiselect__option--selected{
					background: #05B186;
				}
			}
		}
	}
</style>