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
                    <template v-if="number.length==12">
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
            <button type="button" class="button button--green" data-dismiss="modal" v-if="btnText && !status">
              {{btnText}}
            </button>
            <button type="button" class="button button--green" data-dismiss="modal" v-if="!status && !btnText">
              Повторить попытку
            </button>            
            <button type="button" class="button button--green" v-if="status && !btnText " @click="sendSms">
              Повторить попытку
            </button>
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
          return String(value).replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
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
        console.log('asdasdas')
        $('#modal-main').modal('hide');
        this.$nuxt.$emit('SendSmsAgain', 'dadas');
      }
    }
  }
</script>