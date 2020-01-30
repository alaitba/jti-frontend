<template>
  <main class="page">
    <header-auth/>
  	<div class="auth-section">
    	<div class="container">
        <template v-if="$route.query.title">          
          <h3 class="auth-section__title">
            {{$route.query.title}}
          </h3>
        </template>
        <template v-else>          
          <h3 class="auth-section__title">
            Восстановление пароля
          </h3>
        </template>

	  	<div class="auth-section__form">          
	      <form @submit.prevent = "sendPassword">
	        <label for="" class="title__label">
	          Придумайте новый пароль
	        </label>
	        <div class="form-group">
	          <div class="form-group__wrapper">
	            <input type="password" :class="{'form__input': true, 'error' : checkPassword }" placeholder=" " v-model="password" >
	            <label for="input" class="form__label">
	              Новый пароль
	            </label>  
	          </div>                           		          
	        </div>

	        <div class="form-group mt-8">
	          <div class="form-group__wrapper">
	            <input type="password" :class="{'form__input': true, 'error' : checkPassword }" placeholder=" " v-model="newPassword" >
	            <label for="input" class="form__label">
	              Подтверждения пароля
	            </label>  
	          </div>                           
	          <span class="error-text" v-if="checkPassword">
	            Пароли не совпадают!
	          </span>
	          <span class="error-text" v-if="checkPassword">
	          	Пароль не соответствует требованиям!
	          </span>
	        </div>
          <button class="button button--green" type="submit" :disabled="(checkPassword || passwordValidation.errors.length>0 || btnStatus)">
	          Войти
	        </button>
	      </form>		     
	    </div>
			
			<transition name="hint" appear>
			    <div class="password-info"  v-if="passwordValidation.errors.length >0">
			    	<p class="password-info__title">
			    		Пароль должен состоять из:
			    	</p>
			    	<ul class="password-info__list">
			    		<li class="item" v-for="item in passwordValidation.errors">
			    			{{item}}
			    		</li>			    		
			    	</ul>
			    </div>
			</transition>
		</div>
	</div>
  </main>
</template>



<script>
  import HeaderAuth from '~/components/layouts/Header/Header-Auth.vue'
  import {TheMask} from 'vue-the-mask'
  import {mapState, mapMutations} from 'vuex'

  export default {
    layout: 'auth',
    components: {
      HeaderAuth,
      TheMask,
    },
    data() {
      return{
        passEnterStatus: true,
        password: '', 
        newPassword: '',
        showPassword: false,
        errorPassword: false,     
        title: '',
        rules:[
          { message:'Букв латинского алфавита, цифр или спецсимволов', regex:/^[\x20-\x7F]+/ },
          { message:"Минимум 6 символов", regex:/.{6,}/ },          
        ],
        // btnstatus
        btnStatus: false,
      }
    },
    mounted(){
      console.log(this.$route);
    },
    computed: {
      ...mapState({
        auth: state => state.auth,      
      }),
      
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
    },
    // mounted(){
    //   console.log(this.$router.params,'params');
    // },
    methods:{        
      async sendPassword() {

        let fields = {
          'mobile_phone': JSON.parse(localStorage.getItem("authUser")).mobile_phone,
          'password': this.password,
          'password_check': this.newPassword
        }
        this.btnStatus = true;
        await this.$axios.post('/auth/reset/create-password',fields)
          .then( response => {
            this.btnStatus = false;
            if(response.data.tradepoints){
              this.$store.commit('setTradePoints', response.data.tradepoints)          
              localStorage.setItem("tradePoints", JSON.stringify(response.data.tradepoints)); 
              // console.log('tradepoints',response.data.tradepoints)         
            }

            if(response.data.status == 'ok'){
              this.$store.commit('setAuthToken', response.data.token);  
              this.$store.commit('setTokenStatus', true);
              localStorage.setItem("authToken", response.data.token);       
              this.$store.commit('setUserStatus', true);
              if(response.data.message=='authorized'){
                localStorage.setItem("setTradePoint", 't');          
                localStorage.setItem("tradepoint", JSON.stringify(response.data.tradepoint));
                localStorage.setItem('account',JSON.stringify(response.data.account));
                localStorage.setItem('tradeagent',JSON.stringify(response.data.tradeagent));
                this.$router.push('/')
              } else if(response.data.message=='need_tradepoint'){            
                localStorage.setItem("setTradePoint", 'f');          
                this.$router.push('/selectstore')          
              }
            }
          }).catch(error => {
              this.btnStatus = false;
          })
      }  
      
    }
  } 

</script>

<style lang="scss">
  .auth-section{
    padding-top: 40px;
    &__title{
      line-height: 33px;      
      text-align: center;
    }
    &__form{
      margin-top: 40px;
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
      &.confirm{
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
      margin-top: 32px;
    }
	.password-info{
		margin-top: 26px;
		&__title{
			font-weight: bold;
			font-size: 14px;
			line-height: 16px;			
			color: #217461;
			margin-bottom: 4px;
		}
		&__list{
			padding-left: 18px;
			margin-bottom: 0;
			.item{
				font-weight: normal;
				font-size: 12px;
				line-height: 14px;				
				color: #1F1F1F;
			}
		}
	}
    .mt{
    	&-8{
    		margin-top: 8px;
    	}
    }
  }
</style>
