<template>
	<!-- modal for auth error -->
    <!-- Отказано в доступе! -->
    <div class="modal fade modal-auth-denied" id="modal-main">
      	<div class="modal-dialog modal-sm modal-dialog-centered">
        	<div class="modal-content">
          	<!-- Modal body -->
          		<div class="modal-body">
              		<div class="head">
                		<div class="head__img" v-if="img">
                  			<img :src="`/icons/${img}.svg`" alt="">
                		</div>
	                	<div class="head__content">
	                  		<h4 v-if="title">
	                    		{{title}}
	                  		</h4>
	                  		<h4 v-else-if="number">
	                    		<template v-if="number.length>=11">
	                      			{{number | formatNumber}}
	                    		</template>
	                    		<template v-else>
	                      			+7 {{number | formatNumber}}
	                    		</template>
	                  		</h4>
	                  		<p v-if="text">
	                    		{{text}}
	                  		</p>
	                	</div>
              		</div>
          		</div>

          <!-- Modal footer -->
	          	<div class="modal-footer">

	            	<template v-if="btnText == 'anketa'">
	              		<nuxt-link :to="$i18n.path('anketa/listanketa')" class="button button--green" data-dismiss="modal">
	                		{{$t('Готово')}}
	              		</nuxt-link>
	        		</template>
	        		<template v-else-if="btnText == 'anketa-error'">
	              		<nuxt-link :to="$i18n.path('anketa/createanketa')" class="button button--green" data-dismiss="modal">
	                		{{$t('Вернуться в Анкету')}}
	              		</nuxt-link>
	        		</template>

	            	<template v-else-if="btnText == 'agent' || btnText == 'feedback' || btnText == 'full'"  >
	              		<nuxt-link :to="$i18n.path('')" class="button button--green" data-dismiss="modal">
	                		{{$t('Вернуться на Главную')}}
	              		</nuxt-link>
	            	</template>

	            	<template v-else-if="btnText == 'logout'">
	              		<button type="button" class="button button--bordered red" @click="logOut">
	                		{{$t('Выйти')}}
	              		</button>
	              		<button class="button button--bordered green" data-dismiss="modal">
	              			{{$t('Вернуться в Профиль')}}
	              		</button>
	            	</template>

	            	<template v-else-if="btnText == 'again'">
	              		<button type="button" class="button button button--green" data-dismiss="modal" @click="tryAgain">
	                		{{$t('Попробовать еще раз')}}
	              		</button>
	              		<nuxt-link :to="$i18n.path('')" class="button button--bordered green" data-dismiss="modal">
	              			{{$t('Вернуться на Главную')}}
	              		</nuxt-link>
	            	</template>

	            	<template v-else-if="btnText == 'notifications'">
	              		<button type="button" class="button button--green" @click="subscribe">
	                		{{$t('Разрешить')}}
	              		</button>
	              		<button class="button button--bordered green" data-dismiss="modal">
	              			{{$t('Вернуться на Главную')}}
	              		</button>
	            	</template>

	            	<template v-else-if="btnText == 'gifts'">
	              		<nuxt-link :to="$i18n.path('anketa/gifts')" class="button button--green" data-dismiss="modal" v-if="btnText && !status">
	                		{{$t('Вернуться в Призы')}}
	              		</nuxt-link>
	              		<button type="button" class="button button--green" data-dismiss="modal" v-if="!status && !btnText">
	                		{{$t('Повторить попытку')}}
	              		</button>
	            	</template>

	            	<template v-else>
	              		<nuxt-link :to="$i18n.path('anketa/gifts')" class="button button--green" data-dismiss="modal" v-if="btnText && !status">
	                		{{$t('Вернуться в Призы')}}
	              		</nuxt-link>
	              		<button type="button" class="button button--green" data-dismiss="modal" v-if="!status && !btnText">
	                		{{$t('Повторить попытку')}}
	              		</button>
	              		<button type="button" class="button button--green" v-if="status && !btnText " @click="sendSms">
	                		{{$t('Повторить попытку')}}
	              		</button>
	            	</template>

	          	</div>
        	</div>
      	</div>
    </div>
</template>

<script>
  	export default{
    	props:['title','number','text','img', 'status', 'btnText'],
    	filters: {
      		formatNumber (value){
        		if(value.length==11){
          			return '+' + String(value).replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
        		}else if(value.length==12){
          			value = String(value).replace('+','')
          			return '+'+ String(value).replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
        		} else{
          			return value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
        		}
		    }
    	},
    	methods:{

      		sendSms(){
        		$('#modal-main').modal('hide');
        		this.$nuxt.$emit('SendSmsAgain', 'dadas');
      		},

      		logOut(){
        		// console.log('logout')
        		this.$nuxt.$emit('logOut', 'dadas');
      		},

      		tryAgain(){
      			// console.log('try again');
      			this.$nuxt.$emit('tryAgain', 'again')
      		},

      		subscribe(){
        		// console.log('subscribe');
        		this.$nuxt.$emit('onManageWebPushSubscriptionButtonClicked','dsds')
      		}

    	}
  	}
</script>
