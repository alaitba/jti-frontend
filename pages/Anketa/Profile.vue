<template>
	<main class="page">
		<header-auth/>		
		<div class="auth-section">
	    	<div class="container">
	        	<!-- <h3 class="auth-section__title">
	          		Вход        
	        	</h3> -->

	        	<!-- component login -->
		        <div class="auth-section__form" v-if="numberStatus">          
		        	<form @submit.prevent="">
			            <label for="" class="title__label">
			              Введите номер телефона покупателя, чтобы отправить код подтверждения
			            </label>
		            	<div class="form-group">             
		              		<div class="form-group__wrapper">
		                		<the-mask :mask="['+7(###)-###-##-##']" class="form__input" placeholder=" " v-model="number" :masked="false" type="tel"/>
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
		            	<button class="button button--green" type="submit" :disabled="!checkBox">
		              		Далее
		            	</button>
		            <!-- <button class="button button--green"  @click="showModal()">
		              Далее
		            </button> -->
			          </form>
		        </div>
	        </div>
	    </div>		
	</main>
</template>
<script>
	import HeaderAuth from '~/components/layouts/Header/Header-Auth.vue'
	import {TheMask} from 'vue-the-mask'
	export default{
		components : {
			HeaderAuth,
			TheMask,
		},
		data() {
			return {
				numberStatus: true,
				number: '',
				checkBox: '',
			}
		}
	}
</script>
<style lang="scss">
	.auth-section{
	    padding-top: 32px;
	    width: 100%; 
	    &__title{
	    	line-height: 33px;      
	      	text-align: center;
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