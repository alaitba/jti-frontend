<template>
	<main>
	 	<header-auth/>
	 	<div class="auth-section auth-section--recovery">
	 		<div class="container">
	 			<h3 class="auth-section__title">
		          Восстановление пароля        
		        </h3>

				<!-- compoenent for entering tel number-->
		        <div class="auth-section__form" v-if="recoveryNumberStatus">
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
		        </div>	        


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
				                />
			              	</div> 
				            <span class="error-text" v-if="errorPermanenetPassword">
				                Неверный пароль!
				            </span>                                        
			            </div>            
			         </form>
		          	<div class="auth-section__recovery-link confirm">            
		            	<a class="login-link" href="#" v-if="repeatSms" @click="showTimer">
		              		Выслать код повторно
		            	</a>
		            	<p class="timer" v-if="!repeatSms">
		              		Выслать код повторно через
		              		<span>
		              			{{timer}}
		              		</span>
		            	</p>            
			            <h3 v-if="auth" style="text-align:center; margin-top: 16px;">
			              {{auth.sms_code}}
			            </h3>	            
		          	</div>
		        </div> 	        
	 		</div>
	 	</div>
	 	<modal-number/>	    
	</main>
</template>

<script>
	import HeaderAuth from '~/components/layouts/Header/Header-Auth.vue'
	import {TheMask} from 'vue-the-mask'
	import ModalNumber from '~/components/layouts/ModalNumber.vue'
	import {mapState, mapMutations} from 'vuex'
	export default {
		components: {
			HeaderAuth,
			TheMask,
			ModalNumber,		    
		},
		data(){
			return {
				number: '',
				recoveryPermanentPassword: '',	
				recoveryNumberStatus: true,
				recoverySmsEnterStatus: false,
				permanent: false,
				errorPermanenetPassword: false,	
				recoveryNewPasswordStatus: false,
				timeLimit: 180,
			    timer: '',
			    time:'',
			    repeatSms: false,
			    counter: 0,	


			    passEnterStatus: true,
			    password: '', 
			    newPassword: '',
			    showPassword: false,
			    errorPassword: false,     
			    rules:[
			      	{ message:'Букв в нижнем регистре', regex:/[a-z]+/ },
			      	{ message:"Букв в верхнем регистре",  regex:/[A-Z]+/ },
			      	{ message:"Минимум 8 символов", regex:/.{8,}/ },
			      	{ message:"Цифр", regex:/[0-9]+/ },
			      	{ message:"Специальных символов", regex:/[!@#$%^&*(),.?":{}|<>]/}
			      ]		
			}
		},
		computed: {
		    ...mapState({
		      auth: state => state.auth,      
		    })
		},
		methods: {

			async sendRecoveryNumber() {

				let fields = {
		        	'mobile_phone': '7'+this.number,
		      	}
		      // console.log(fields,'fields')
		      	await this.$axios.post('http://jti.ibec.systems/api/v1/auth/reset/phone/', fields)
		        .then(response =>{
		        	localStorage.setItem("authUser", JSON.stringify(response.data));
		          	localStorage.setItem("authUserStatus", true);
		          	this.$store.commit('setUser',response.data);
		          	this.$store.commit('setNumber', this.number);
		          	// console.log(this.$store.state.auth,'data')
		          	this.recoveryNumberStatus = !this.recoveryNumberStatus;
		          	if(response.data.sms_code){
		            	this.recoverySmsEnterStatus = !this.recoverySmsEnterStatus;
		            	this.startTimerInterval();
		          	} else{
		            	// this.passEnterStatus = !this.passEnterStatus;
		          	}

		        }).catch(error => {
		            // $('#modal-auth-denied').modal('show')
		            // this.$toast.error('Error');
		        });
			},

			async sendRecoverySms() {
				console.log('here')
				let fields = {
			        'mobile_phone': '7'+this.number,
			        'sms_code': this.recoveryPermanentPassword,
		      	}
		      	this.errorPermanenetPassword = false;
		      	await this.$axios.post('http://jti.ibec.systems/api/v1/auth/reset/sms-code/', fields)
		      	.then(response =>{
		        	if(response.data.status = 'ok'){		          		
		          		this.$router.push({path: '/auth/resetpassword', params: { userId: '123' }})
		        	}
		      	}).catch(error => {
		      		this.errorPermanenetPassword = true;
		          // $('#modal-auth-denied').modal('show')
		            // this.$toast.error('Error');
		      	});

			},	

			async sendRecoverySmsAgain() {

		      let fields = {
		          'mobile_phone': '7'+this.number,
		      }
		      // console.log(fields,'fields')
		      await this.$axios.post('http://jti.ibec.systems/api/v1/auth/reset/phone/', fields)
		        .then(response =>{
		          this.$store.commit('setUser',response.data);
		          this.$store.commit('setNumber', this.number);
		          // // console.log(this.$store.state.auth,'data')          
		          if(response.data.sms_code){
		            this.smsEnterStatus = true;
		            this.startTimerInterval();
		          } else{
		            this.passEnterStatus = !this.passEnterStatus;
		          }

		        }).catch(error => {
		            $('#modal-auth-denied').modal('show')
		            // this.$toast.error('Error');
		        });

		    },

			async sendRecoveryPassword() {
		      let fields = {
		        'mobile_phone': '7'+this.number,
		        'password': this.password,
		        'password_check': this.newPassword
		      }
		      
		      await this.$axios.post('http://jti.ibec.systems/api/v1/auth/create-password',fields)
		        .then( response => {
		          if(response.data.status == 'ok'){
		            this.$router.push('/selectstore')
		          }
		        }).catch(error => {
		        	
		        })		      
		    },

			showTimer(){
		      this.repeatSms = !this.repeatSms;
		      clearInterval(this.time);
		      this.timeLimit = 180;
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
			        console.log('time')
			        this.timeLimit = 180;        
			        this.repeatSms = true;
		      	}
		    },
		    startTimerInterval(){
		    	console.log('hello')
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