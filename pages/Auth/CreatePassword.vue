<template>
  <main>
    <header-auth/>
  	<div class="auth-section">
      	<div class="container">
	        <h3 class="auth-section__title">
	          Вход
	        </h3>

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
		        <button class="button button--green" type="submit" :disabled="!checkPassword && passwordValidation.errors.length>0">
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
      rules:[
      		{ message:'Букв в нижнем регистре латинских букв', regex:/[a-z]+/ },
      		{ message:"Букв в верхнем регистре латинских букв",  regex:/[A-Z]+/ },
      		{ message:"Минимум 8 символов", regex:/.{8,}/ },
      		{ message:"Цифр", regex:/[0-9]+/ },
      		{ message:"Специальных символов", regex:/[!@#$%^&*(),.?":{}|<>]/}

      ] 
    }
  },
  computed: {
    ...mapState({
      number: state => state.number,      
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
  methods:{        
    async sendPassword() {
      let fields = {
        'mobile_phone': '7'+this.number,
        'password': this.password,
        'password_check': this.newPassword
      }
      
      await this.$axios.post('http://jti.ibec.systems/api/v1/auth/create-password',fields)
        .then( response => {
          if(response.data.tradepoints){
            this.$store.commit('setTradePoints', response.data.tradepoints)
          }
          if(response.data.status == 'ok'){
            this.$store.commit('setUserStatus', true);
            this.$router.push('/selectstore')
          }
        }).catch(error => {

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
