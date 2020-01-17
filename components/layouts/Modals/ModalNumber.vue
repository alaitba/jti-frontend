<template>
	<!-- modal for auth error -->
        <!-- Отказано в доступе! -->
        <div class="modal fade modal-auth-denied" id="modal-auth-denied">
          <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content">                          
              <!-- Modal body -->
              <div class="modal-body">
                  <div class="head">
                    <div class="head__img">
                      <img src="~/assets/img/icons/error.svg" alt="">
                    </div>                    
                    <div class="head__content">
                      <h4>
                        Отказано в доступе!
                      </h4>
                      <p>
                        Номер телефона введен неверно или не внесен в базу данных!
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
              </div>              
            </div>
          </div>
        </div>
</template>