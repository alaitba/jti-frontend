<template>
	<!-- modal for auth error -->
    <!-- Отказано в доступе! -->
    <div class="modal fade modal-auth-denied" id="modal-error">
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">                          
          <!-- Modal body -->
          <div class="modal-body">
              <div class="head">
                <div class="head__img">
                  <img src="~/assets/img/icons/alert.svg" alt="">
                </div>                    
                <div class="head__content">                  
                  <h4>
                    Раздел будет доступен в ближайшее время
                  </h4>
                </div>                    
              </div>                   
              <div class="footer">
                
              </div>
          </div>              
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="button button--green" data-dismiss="modal">
              Готово
            </button>
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