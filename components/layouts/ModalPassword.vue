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
                  Вы ввели пароль болше 5 раз. Попробуйте еще раз через <span class="time">{{passwordTimerText}}</span>
                </p>
              </div>                    
            </div>                   
            <div class="footer">
              
            </div>
        </div>              
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="button button--green" data-dismiss="modal" :disabled="disabledByTimer" @click="stopTimer()">
            Повторить попытку
          </button>

          <nuxt-link class="button button--bordered green" to="/auth/recovery-login" data-dismiss="modal">
            Не помню пароль
          </nuxt-link>
        </div>              
      </div>
    </div>
  </div>
</template>


<script>
  export default{
    data(){
      return {
        passwordTimer:600,
        passwordTimerText:'',
        passwordTime:'',
        disabledByTimer: true,
      }
    },
    mounted(){
      // this.startTimerInterval();
    },
    methods:{
      startTimer() {
        // console.log('timer password');
        if(this.passwordTimer){
          this.passwordTimer = this.passwordTimer-1
          let min = Math.floor(this.passwordTimer/60)
          let sec = this.passwordTimer - min * 60;
          if(min < 10) min = '0'+min;
          if(sec < 10) sec = '0'+sec;
          this.passwordTimerText = min+':'+ sec
        } else {
          // console.log('time');
          this.passwordTimer = 600;        
          // this.repeatSms = true;
          this.disabledByTimer= false;
          clearInterval(this.time);
        }
        
        // return  ;
      },
      stopTimer(){
          clearInterval(this.time);
          this.passwordTimer = 600;        
          $('#modal-auth-alert').modal('show');
      },
      startTimerInterval(){
        this.time = setInterval(() =>{
          // console.log('startTimerInterval')
          this.startTimer();
        },1000);
      } 
    }
  }
</script>