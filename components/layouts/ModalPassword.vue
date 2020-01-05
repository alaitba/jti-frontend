<template>
  <!-- Превышение лимита! -->
        <div class="modal fade modal-auth-denied modal-auth-denied--limited" id="modal-auth-alert">
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
                        Превышение лимита!
                      </h4>
                      <p>
                        Вы ввели пароль болше 5 раз. Попробуйте еще раз через <span class="time">09:51</span>
                      </p>
                    </div>                    
                  </div>                   
                  <div class="footer">
                    
                  </div>
              </div>              
              <!-- Modal footer -->
              <div class="modal-footer">
                <button type="button" class="button button--green" data-dismiss="modal">
                  Повторить попытку
                </button>

                <button type="button" class="button button--bordered green" data-dismiss="modal">
                  Не помню пароль
                </button>
              </div>              
            </div>
          </div>
        </div>
</template>