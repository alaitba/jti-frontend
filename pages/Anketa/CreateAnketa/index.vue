<template>
	<main class="page">
		<!-- <header-auth/>		 -->
		<div class="auth-section">
	    	<div class="container">
	        	

	        	<!-- component number -->
		        <div class="auth-section__form" v-if="numberStatus">          
		        	<form @submit.prevent="sendNumber">
			            <label for="" class="title__label">
			              Введите номер телефона покупателя, чтобы отправить код подтверждения
			            </label>
		            	<div class="form-group">             
		              		<div class="form-group__wrapper">
		                		<the-mask :mask="['+7(777)-###-##-##']" class="form__input" placeholder=" " v-model="number" :masked="false" type="tel"/>
		                		<label for="input" class="form__label">
		                  			Номер телефона
		                		</label>  
		              		</div>
		            	</div>

		            	<div class="form-group mt-16">
		            		<label class="checkbox-container">
			            		Покупателю есть 18 лет
							  	<input type="checkbox" v-model="checkBox">
							  	<span class="checkmark"></span>
							</label>
		            	</div>		 
		            	<button class="button button--green" type="submit" :disabled="!checkBox || number.length!=7">
		              		Далее
		            	</button>
		            <!-- <button class="button button--green"  @click="showModal()">
		              Далее
		            </button> -->
			          </form>
		        </div>
				
				<h3 class="auth-section__title" v-if="smsEnterStatus">
	          		Подтверждение номера        
	        	</h3>

				<div class="auth-section__form auth-section__form--sms" v-if="smsEnterStatus">          
		          <form @submit.prevent="">
		            <label for="" class="title__label" >
		              Введите код, оправленный покупателю по СМС на номер: <strong v-if="number">
		              	+7 {{number | formatNumber}} 
		              </strong>
		            </label>
		            <div class="form-group">
		              <div class="form-group__wrapper">                
		                <the-mask 
		                  :class="{'form__input form__input--sms form__input--grey': true, 'permanent': permanent, 'error' : errorPermanenetPassword }" 
		                  type="tel" 
		                  mask="####" 
		                  v-model="permanentPassword" 
		                  placeholder="••••" 
		                  :masked="false" 
		                  maxlength="4" 
		                  @input="sendSms()"                    
		                />
		              </div>                 
		              <span class="error-text" v-if="errorPermanenetPassword">
		                Неверный код подтверждения!
		              </span>                                        
		            </div>            
		          </form>
		          <div class="auth-section__recovery-link confirm">            
		            <a class="login-link" href="#" v-if="repeatSms" @click="showTimer">
		              Выслать код повторно
		            </a>
		            <p class="timer" v-if="!repeatSms">
		              Выслать код повторно через
		              <span>{{
		                timer
		              }}</span>
		            </p>            

		            <h3 v-if="sms_code" style="text-align:center; margin-top: 16px;">
		              {{sms_code}}
		            </h3>


		            <!-- <nuxt-link class="login-link" to="/selectstore">
		              Не помню пароль
		            </nuxt-link> -->
		          </div>
		        </div>

	        </div>
	    </div>		
		
		<footer-anketa v-if="footerStatus"/>
		<modal-main :title="title" :text="text" :img="img" :number="number"></modal-main>
		<!-- <modal-sms-error></modal-sms-error>
		<modal-number-error></modal-number-error> -->
	</main>
</template>
<script>
	import FooterAnketa from '~/components/layouts/Footer/Footer.vue'
	// import ModalExist from '~/components/layouts/Modals/ModalExist.vue'
	// import ModalSmsError from '~/components/layouts/Modals/ModalSmsError.vue'
	// import ModalNumberError from '~/components/layouts/Modals/ModalNumberError.vue'
	import ModalMain from '~/components/layouts/Modals/modal-main.vue'
	import {TheMask} from 'vue-the-mask'
	import {mapState, mapMutations} from 'vuex'
	export default{
		components : {
			TheMask,
			// ModalExist,
			// ModalSmsError,
			// ModalNumberError,
			ModalMain,
			FooterAnketa,
		},
		
		data() {
			return {
				numberStatus: true,
				smsEnterStatus: false,
				errorPermanenetPassword: false,
				permanent: false,
				number: '',
				permanentPassword: '',
				checkBox: '',
				repeatSms: false,
				timer: '',
				timeLimit: 180,
				footerStatus: true,
				sms_code:'',

				// for modals
			    title:'',
			    text:'',
			    img:'',
			    tel:'',
			}
		},
		computed: {
		    ...mapState({
		      auth: state => state.auth, 
		      authToken: state => state.authToken,     
		    }),
		},
		filters:{
			formatNumber(value) {
				return value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
			}
		},
		methods:{
			async sendNumber(){
				let fields = {
					'mobile_phone': '+7777'+this.number,
					'legal_age': this.checkBox
				}
				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+this.authToken;

				await this.$axios.post('/client/send-sms/', fields)
					.then(response =>{
						this.numberStatus = !this.numberStatus;
						this.footerStatus = !this.footerStatus;		
						this.smsEnterStatus = !this.smsEnterStatus;
						this.sms_code = response.data.sms_code;

						this.$store.commit('setNumberAnketa', response.data.mobile_phone);
						localStorage.setItem("anketaNumber", response.data.mobile_phone);
						this.startTimerInterval();
					}).catch((error, e) =>{
						if(error.response.data.message=='sms_not_sent'){
			              this.title="Cмс не был отправлен!"
			              this.text="Попробуйте еще раз!"
			              this.img="alert"
			              $('#modal-main').modal('show')           
			            } else if(error.response.data.message=='sms_send_limit'){
			              this.title="Cмс не был отправлен!"
			              this.text="Вы превысели лимит отправки смс!"
			              this.img="alert"
			              $('#modal-main').modal('show')           
			            } else if(error.response.data.message=='already_filled'){
							this.tel=this.number;
				            this.text="На указанный телефон анкета уже заполнялась в данной торговой точке!"
				            this.img="alert"
				            $('#modal-main').modal('show')				
						} else {
							this.title="Отказано в доступе!"
			              	this.text="Номер телефона введен неверно или не внесен в базу данных!"
			              	this.img="error"
			              	$('#modal-main').modal('show')
						}					
					})				
			},

			async sendSms() {

				let fields = {
			        'mobile_phone': '+7777'+this.number,
			        'sms_code': this.permanentPassword,
			    }

			    this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+this.authToken;
			    if(this.permanentPassword.length==4){
		        	this.errorPermanenetPassword = false;
		        	// this.$router.push('/anketa/createanketa/fillform')
		        	await this.$axios.post('/client/check-sms/', fields)
		        	.then(response =>{
		          		if(response.data.status = 'ok'){
		          			this.$router.push('/anketa/createanketa/fillform')
		          		}
		        	}).catch(error => {
		            	this.errorPermanenetPassword = true;
		            	// $('#modal-auth-denied').modal('show')		              	
		        	});
		      	}
			},

			async sendSmsAgain() {

		      	let fields = {
					'mobile_phone': '+7777'+this.number,
					'legal_age': this.checkBox
				}
				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+this.authToken;
		      
		      	await this.$axios.post('/client/send-sms/', fields)
		        .then(response =>{
		         	if(response.data.sms_code){
		            	this.sms_code = response.data.sms_code;
		            	this.startTimerInterval();
		          	} 
		        }).catch(error => {
		            if(error.response.data.message=='sms_send_limit'){
						this.title="Cмс не был отправлен!"
		              	this.text="Вы превысели лимит отправки смс!"
		              	this.img="alert"
		              	$('#modal-main').modal('show')      				
					} else if(error.response.data.message=='already_filled'){
						this.tel=this.number;
			            this.text="На указанный телефон анкета уже заполнялась в данной торговой точке!"
			            this.img="alert"
			            $('#modal-main').modal('show')			
					} else {
						this.title="Отказано в доступе!"
		              	this.text="Номер телефона введен неверно или не внесен в базу данных!"
		              	this.img="error"
		              	$('#modal-main').modal('show')						
					}			            
		        });

		    },


			showTimer(){
		    	this.repeatSms = !this.repeatSms;		    	
		      	clearInterval(this.time);
		      	this.timeLimit = 180;
		      	this.permanentPassword = '';
		      	setTimeout(this.startTimerInterval(), 1000);   
		      	this.sendSmsAgain();   
		    },
		    startTimer() {
		      	if(this.timeLimit){
			        this.timeLimit = this.timeLimit-1
			        let min = Math.floor(this.timeLimit/60)
			        let sec = this.timeLimit - min * 60;
			        if(min < 10) min = '0'+min;
			        if(sec < 10) sec = '0'+sec;
			        this.timer = min+':'+ sec
		      	} else {        
			        this.timeLimit = 180;        
			        this.repeatSms = true;
			        this.sms_code = '';
			        this.errorPermanenetPassword = false;			        
			        clearInterval(this.time);
			    }
		      
		      // return  ;
		    },
		    startTimerInterval(){		    	
		      this.time = setInterval(() =>{        
		        this.startTimer();
		      },1000);
		    } 
		}
	}
</script>
<style lang="scss">
	main{
		display: block;
	}
	.auth-section{
	    padding-top: 32px;
	    width: 100%; 
	    &__title{
	    	line-height: 33px;      
	      	text-align: center;
	      	margin-bottom: 40px;
	    }
	    &__form{
	      	// margin-top: 40px;
	      	&--sms{
		        // display: flex;
		        // flex-direction:column;
		        // justify-content: center;
	        	form{
	          		text-align: center;
	        	}
		        .form-group{
			        &__wrapper{
			            margin-top: 24px;
			        }
			        .error-text{
			            text-align: center;
			            width: 100%;
			        }
		        }
		        ::-webkit-input-placeholder { /* Edge */
		          color: #1F1F1F;
		        }

		        :-ms-input-placeholder { /* Internet Explorer 10-11 */
		          color: #1F1F1F;
		        }

		        ::placeholder {
		          color: #1F1F1F;
		        }
		   	}
		    .button--green{
		        margin-top: 32px;
		    }
		}
	    &__recovery-link{
	      	display: flex;
	      	justify-content: center;
	      	margin-top: 32px;
	      	&.confirm{
	        	margin-top: 42px;
	        	flex-direction:column;
	      	}
	    }
	    .login-link{
	      	font-weight: 500;
	      	font-size: 16px;
	      	line-height: 19px;
	      	text-align: center;
	      	text-decoration-line: underline;
	      	color: #217461;      
	      	// margin-top: 32px;
	   	}
	}
</style>