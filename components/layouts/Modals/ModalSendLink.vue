<template>
	<!-- modal for auth error -->
    <!-- Отказано в доступе! -->
    <div class="modal fade modal-auth-denied" id="modal-send-link">
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">                          
          <!-- Modal body -->
          <div class="modal-body">
              <div class="head">
                <div class="head__img">
                  <img src="~/assets/img/icons/mail.svg" alt="">
                </div>                    
                <div class="head__content">
                  <h4>
                    +7 {{number | formatNumber}}
                  </h4>
                  <p>
                    На указанный номер отправлена ссылка для заполнения анкеты
                  </p>
                </div>                    
              </div>                   
              <div class="footer">
                
              </div>
          </div>              
          <!-- Modal footer -->
          <div class="modal-footer">
            <nuxt-link class="button button--green" data-dismiss="modal" to="/anketa/listanketa">
              Готово
            </nuxt-link>
          </div>              
        </div>
      </div>
    </div>
</template>

<script>
  
  export default {
    props: ['number'],
    filters: {
      formatNumber (value){
        return value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
      }
    }
  }
</script>

<style lang="scss">
  .button--green{
    text-align: center;
    text-decoration: none;
    &:hover{
      text-decoration: none;
    }
  }
</style>