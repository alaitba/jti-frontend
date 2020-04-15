<template>
  <!-- Превышение лимита! -->
  <div class="modal fade modal-auth-denied modal-auth-denied--limited" id="modal-auth-alert" data-backdrop="static"
        data-keyboard="false">
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
                        {{$t('Превышение лимита!')}}
                    </h4>
                    <p v-if="$i18n.locale === 'ru'">
                        {{$t('Вы ввели пароль больше 5 раз. Попробуйте еще раз через')}} <span class="time">{{passwordTimerText}}</span>
                    </p>
                    <p v-if="$i18n.locale === 'kk'">
                        {{$t('Вы ввели пароль больше 5 раз. Попробуйте еще раз через')}} <span class="time">{{passwordTimerText}}</span> минуттан кейін қайта теріп көріңіз
                    </p>
                </div>
            </div>
            <div class="footer">

            </div>
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
            <!-- <button type="button" class="button button--green" data-dismiss="modal" :disabled="disabledByTimer" @click="stopTimer()">
                {{$t('Повторить попытку')}}
            </button> -->


            <!-- <template v-if="disabledByTimer"> -->
                <button type="button" class="button button--green" :to="$i18n.path('auth/sigin')" :disabled="disabledByTimer" data-dismiss="modal">
                    {{$t('Повторить попытку')}}
                </button>
            <!-- </template>
            <template v-else> -->
                <nuxt-link class="button button--bordered green" :to="$i18n.path('auth/recovery-login')" data-dismiss="modal">
                    {{$t('Не помню пароль')}}
                </nuxt-link>
            <!-- </template> -->
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
                console.log('timer password: ', this.passwordTimer);
                if(this.passwordTimer){
                    this.passwordTimer = this.passwordTimer-1
                    let min = Math.floor(this.passwordTimer/60)
                    let sec = this.passwordTimer - min * 60;
                    if(min < 10) min = '0'+min;
                    if(sec < 10) sec = '0'+sec;
                    this.passwordTimerText = min+':'+ sec
                } else {
                    clearInterval(this.time);
                    // console.log('time');
                    this.passwordTimer = 600;
                    // this.repeatSms = true;
                    this.disabledByTimer= false;
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
