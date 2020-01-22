<template>
	<main>
	 	<header-auth/>
	 	<div class="auth-section auth-section--recovery">
	 		<div class="container">
	 			<h3 class="auth-section__title">
		          Восстановление пароля        
		        </h3>

				<!-- compoenent for entering tel number-->
		        <!-- <div class="auth-section__form" v-if="recoveryNumberStatus">
		        	<form @submit.prevent="sendRecoveryNumber">
		        		<label for="" class="title__label">
			              Введите номер телефона
			            </label>
			            <div class="form-group">             
			              <div class="form-group__wrapper">
			                <the-mask :mask="['+7(###)-###-##-##']" class="form__input" placeholder=" " v-model="number" :masked="false" type="tel"/>
			                <label for="input" class="form__label">
			                  Номер телефона
			                </label>  
			              </div>
			            </div>
			            <button class="button button--green" type="submit" :disabled="number.length<10">
			              Далее
			            </button>
		        	</form>
		        </div> -->	        


		       	<!-- component enter password  if user has not signed before and has not password-->
		        <div class="auth-section__form auth-section__form--sms" v-if="recoverySmsEnterStatus">          
		          	<form @submit.prevent="sendRecoverySms">
			            <label for="" class="title__label">
			              Введите код подтверждения
			            </label>
			            <div class="form-group">
			              	<div class="form-group__wrapper">                
				                <the-mask 
				                  :class="{'form__input form__input--sms': true, 'permanent': permanent, 'error' : errorPermanenetPassword }" 
				                  type="tel" 
				                  mask="####" 
				                  v-model="recoveryPermanentPassword" 
				                  placeholder="••••" 
				                  :masked="false" 
				                  maxlength="4"                  
				                  @input="sendRecoverySms()"
				                />
			              	</div> 
				            <span class="error-text" v-if="errorPermanenetPassword">
				                Неверный код подтверждения!
				            </span>                                        
			            </div>            
			         </form>
		          	<div class="auth-section__recovery-link confirm">            
		            	<button class="login-link" v-if="repeatSms" @click="showTimer">
		              		Выслать код повторно
		            	</button>
		            	<p class="timer" v-if="!repeatSms">
		              		Выслать код повторно через
		              		<span>
		              			{{timer}}
		              		</span>
		            	</p>            
						

						<h3 v-if="sms_code" style="text-align:center; margin-top: 16px;">
			              {{sms_code}}
			            </h3>	            
		          	</div>
		        </div> 	        
	 		</div>
	 	</div>
	 	<modal-main :title="title" :text="text" :img="img" :status="status"></modal-main>
	</main>
</template>

<script>
	import HeaderAuth from '~/components/layouts/Header/Header-Auth.vue'
	import {TheMask} from 'vue-the-mask'
	import ModalMain from '~/components/layouts/Modals/modal-main.vue'
	import {mapState, mapMutations} from 'vuex'
	export default {
		layout: 'auth',
		components: {
			HeaderAuth,
			TheMask,
			ModalMain,		    
		},
		data(){
			return {
				number: '',
				recoveryPermanentPassword: '',	
				recoveryNumberStatus: true,
				recoverySmsEnterStatus: true,
				permanent: false,
				errorPermanenetPassword: false,	
				recoveryNewPasswordStatus: false,
				timeLimit: 180,
			    timer: '',
			    sms_code:'',
			    repeatSms: false,
			    counter: 0,	


			    passEnterStatus: true,
			    password: '', 
			    newPassword: '',
			    showPassword: false,
			    errorPassword: false,     
			    rules:[
		          { message:'Букв латинского алфавита, цифр или спецсимволов', regex:/^[\x20-\x7F]+/ },
		          { message:"Минимум 6 символов", regex:/.{6,}/ },          
		        ],
			    // for modals
		      	title:'',
		      	text:'',
		      	img:'',	
		      	status:'',	
			}
		},
		computed: {
		    ...mapState({
		      auth: state => state.auth,      
		    })
		},
		mounted(){
			this.sendRecoveryNumber();			

			this.$nuxt.$on('SendSmsAgain',this.sendRecoverySmsAgain)
		},
		methods: {

			async sendRecoveryNumber() {

				let fields = {
		        	'mobile_phone': this.$store.state.auth.mobile_phone,
		      	}
		      // console.log(fields,'fields')
		      	await this.$axios.post('/auth/reset/phone/', fields)
		        .then(response =>{
		        	localStorage.setItem("authUser", JSON.stringify(response.data));
		          	localStorage.setItem("authUserStatus", true);
		          	this.$store.commit('setUser',response.data);
		          	this.$store.commit('setNumber', this.number);
		          	// console.log(this.$store.state.auth,'data')
		          	this.recoveryNumberStatus = !this.recoveryNumberStatus;
	            	this.startTimerInterval();	            	
	              	if(response.data.sms_code){
		          		this.sms_code = response.data.sms_code; 
		            	// this.recoverySmsEnterStatus = !this.recoverySmsEnterStatus;
		          	} else{
		            	// this.passEnterStatus = !this.passEnterStatus;
		          	}

		        }).catch(error => {
		            if(error.response.data.message=='phone_does_not_exist' || error.response.data.message=='validation_failed'){
		              this.title="Отказано в доступе!"
		              this.text="Номер телефона введен неверно или не внесен в базу данных!"
		              this.img="error"
		              $('#modal-main').modal('show')       
		            } else if(error.response.data.message=='sms_not_sent'){
		              this.title="Cмс не был отправлен!"
		              this.text="Попробуйте еще раз!"
		              this.img="alert"
		              this.status="recovery";
		              $('#modal-main').modal('show');          
		            } else if(error.response.data.message=='sms_send_limit'){
		              this.title="Cмс не был отправлен!"
		              this.text="Вы превысели лимит отправки смс!"
		              this.img="alert"
		              $('#modal-main').modal('show')           
		            }
		            else {
		              this.title="Отказано в доступе!"
		              this.text="Номер телефона введен неверно или не внесен в базу данных!"
		              this.img="error"
		              $('#modal-auth-denied').modal('show')              
		            }
		        });
			},

			async sendRecoverySms() {
				// console.log('here')
				let fields = {
			        'mobile_phone': this.$store.state.auth.mobile_phone,
			        'sms_code': this.recoveryPermanentPassword,
		      	}
		      	if(this.recoveryPermanentPassword.length==4){
			      	this.errorPermanenetPassword = false;
			      	await this.$axios.post('/auth/reset/sms-code/', fields)
			      	.then(response =>{
			        	if(response.data.status = 'ok'){	
			          		this.$router.push({path: '/auth/resetpassword', params: { userId: '123' }})
			        	}
			      	}).catch(error => {
			      		this.errorPermanenetPassword = true;
			          	if(error.response.data.message=='password_creation_expired_or_not_allowed' ){
			              this.title="Отказано в доступе!"
			              this.text="Введенный смс не правильный или просрочен!!"
			              this.img="error"
			              $('#modal-main').modal('show')       
			            } else{
			              this.title="Отказано в доступе!"
			              this.text="Номер телефона введен неверно или не внесен в базу данных!"
			              this.img="error"
			              $('#modal-auth-denied').modal('show')   
			            }
			      	});
			     }

			},	

			async sendRecoverySmsAgain() {


			  let fields = {
		          'mobile_phone': this.$store.state.auth.mobile_phone,
		      }
		      // console.log(fields,'fields')
		      await this.$axios.post('/auth/reset/phone/', fields)
		        .then(response =>{
		          this.$store.commit('setUser',response.data);
		          this.$store.commit('setNumber', this.auth.mobile_phone);
		          // // console.log(this.$store.state.auth,'data')          
		          if(response.data.sms_code){
		            this.sms_code = response.data.sms_code;	            
		          } 
		          if(response.data.message == 'need_password'){
		            this.passEnterStatus = !this.passEnterStatus;
		          } 
		          if(response.data.message == 'need_otp'){
		            // this.startTimerInterval();
		            this.smsEnterStatus = true;
		          }

		        }).catch(error => {
		            if(error.response.data.message=='phone_does_not_exist' || error.response.data.message=='validation_failed'){
		              this.title="Отказано в доступе!"
		              this.text="Номер телефона введен неверно или не внесен в базу данных!"
		              this.img="error"
		              $('#modal-main').modal('show')       
		            } else if(error.response.data.message=='sms_not_sent'){
		              this.title="Cмс не был отправлен!"
		              this.text="Попробуйте еще раз!"
		              this.status="recovery";
		              this.img="alert"
		              $('#modal-main').modal('show')           
		            } else if(error.response.data.message=='sms_send_limit'){
		              this.title="Cмс не был отправлен!"
		              this.text="Вы превысели лимит отправки смс!"
		              this.img="alert"
		              $('#modal-main').modal('show')           
		            }
		            else {
		              this.title="Отказано в доступе!"
		              this.text="Номер телефона введен неверно или не внесен в базу данных!"
		              this.img="error"
		              $('#modal-auth-denied').modal('show')              
		            }
		        });

		    },

			async sendRecoveryPassword() {
		      let fields = {
		        'mobile_phone': this.$store.state.auth.mobile_phone,
		        'password': this.password,
		        'password_check': this.newPassword
		      }
		      
		      await this.$axios.post('/auth/reset/create-password',fields)
		        .then( response => {
		        	if(response.data.tradepoints){
			            this.$store.commit('setTradePoints', response.data.tradepoints);		
			        }
		          	if(response.data.status == 'ok'){
		          		localStorage.setItem("authToken", response.data.token);
		          		if(response.data.message=='authorized'){
			              this.$router.push('/')
			            } else {            
			              this.$router.push('/selectstore')          
			            }
		            	
		          	}
		        }).catch(error => {
		        	
		        })		      
		    },

			showTimer(){
		      clearInterval(this.time);
		      this.repeatSms = false;
		      this.timeLimit = 180;
		      this.recoveryPermanentPassword = '';
		      setTimeout(this.startTimerInterval(), 1000);   
		      this.sendRecoverySmsAgain();   
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
			        clearInterval(this.time);
			        this.timeLimit = 180;        
			        this.repeatSms = true;
			        this.sms_code = '';
			        this.errorPermanenetPassword = false;
		      	}
		    },

		    startTimerInterval(){
		    	console.log('hello');
		    	// clearInterval(this.time);
		      	this.time = setInterval(() =>{
		        	this.startTimer();
		      	},1000);
		    },

		    checkPassword() {
		  		if(this.passwordsFilled){
		  			return (this.password !== this.newPassword )
		  		} else {
		  			return false
		  		} 		
		  	},

		  	passwordsFilled () {
		  		return (this.password !== '' && this.newPassword !== '')
		  	},

		  	passwordValidation () {
		  		let errors = []
		  		for (let condition of this.rules) {
		  			if (!condition.regex.test(this.password)) {
		  				errors.push(condition.message)
		  			}
		  		}
		  		if (errors.length === 0) {
		  			return { valid:true, errors }
		  		} else {
		  			return { valid:false, errors }
		  		}
		  	} 

		}
	}
</script>