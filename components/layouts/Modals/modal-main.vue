<template>
	<!-- modal for auth error -->
    <!-- Отказано в доступе! -->
    <div class="modal fade modal-auth-denied" id="modal-main">
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">                          
          <!-- Modal body -->
          <div class="modal-body">
              <div class="head">
                <div class="head__img">
                  <img :src="`/icons/${img}.svg`" alt="">
                </div>                    
                <div class="head__content">
                  <h4 v-if="title">
                    {{title}}
                  </h4>
                  <h4 v-else-if="number">
                    +7 {{number | formatNumber}}
                  </h4>
                  <p>
                    {{text}}
                  </p>
                </div>                    
              </div>                   
              <div class="footer">
                
              </div>
          </div>              
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="button button--green" data-dismiss="modal" v-if="!status">
              Повторить попытку
            </button>
            <button type="button" class="button button--green" v-else @click="sendSms">
              Повторить попытку
            </button>
          </div>              
        </div>
      </div>
    </div>
</template>

<script>
  export default{
    props:['title','number','text','img', 'status'],
    filters: {
      formatNumber (value){
        return value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
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