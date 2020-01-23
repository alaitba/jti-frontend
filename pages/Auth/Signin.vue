<template>
  <main>
    <Header-Auth />
    <div class="auth-section">
      <div class="container">
        <h3 class="auth-section__title">
          Вход        
        </h3>

        <!-- component login -->
        <div class="auth-section__form" v-if="loginStatus">          
          <form @submit.prevent="authBtn">
            <label for="" class="title__label">
              Введите номер телефона
            </label>
            <div class="form-group">             
              <div class="form-group__wrapper">
                <the-mask :mask="['+7(###)-###-##-##']" class="form__input" placeholder=" " v-model="number" :masked="false" type="tel"/>
                <label for="input" class="form__label">
                  Номер телефона
                </label>  
              </div>
            </div>
            <button class="button button--green" type="submit" :disabled="number.length<10">
              Далее
            </button>
            <!-- <button class="button button--green"  @click="showModal()">
              Далее
            </button> -->
          </form>
        </div>


        <!-- component enter password  if user signed before and has password-->
        <div class="auth-section__form" v-if="passEnterStatus">          
          <form @submit.prevent="sendPassword">
            <label for="" class="title__label">
              Введите пароль
            </label>
            <div class="form-group">
              <div class="form-group__wrapper">
                <button class="button button--show" type="button" @click="showPassword = !showPassword"></button>
                <input :type="showPassword ? 'text' : 'password'" :class="{'form__input': true, 'error' : errorPassword }" placeholder=" " v-model="password" >
                <label for="input" class="form__label">
                  Пароль
                </label>  
              </div>                           
              <span class="error-text" v-if="errorPassword">
                Неверный пароль!
              </span>
            </div>
            <button class="button button--green" type="submit" :disabled="password.length==0">
              Далее
            </button>
          </form>
          <div class="auth-section__recovery-link">            
            <nuxt-link class="login-link" to="/auth/recovery-login">
              Не помню пароль
            </nuxt-link>
          </div>
        </div>

        <!-- component enter password  if user has not signed before and has not password-->
        <div class="auth-section__form auth-section__form--sms" v-if="smsEnterStatus">
          <form @submit.prevent="sendSms">
            <label for="" class="title__label">
              Введите код подтверждения
            </label>
            <div class="form-group">
              <div class="form-group__wrapper">                
                <the-mask 
                  :class="{'form__input form__input--sms': true, 'permanent': permanent, 'error' : errorPermanenetPassword }" 
                  type="tel" 
                  mask="####" 
                  v-model="permanentPassword" 
                  placeholder="••••" 
                  :masked="false" 
                  maxlength="4" 
                  @input="sendSms()"                    
                />
              </div>                 
              <span class="error-text" v-if="errorPermanenetPassword">
                Неверный код подтверждения!
              </span>                                        
            </div>            
          </form>
          <div class="auth-section__recovery-link confirm">            
            <a class="login-link" href="#" v-if="repeatSms" @click="showTimer">
              Выслать код повторно
            </a>
            <p class="timer" v-if="!repeatSms">
              Выслать код повторно через
              <span>{{
                timer
              }}</span>
            </p>            

            <h3 v-if="sms_code" style="text-align:center; margin-top: 16px;">
              {{sms_code}}
            </h3>


            <!-- <nuxt-link class="login-link" to="/selectstore">
              Не помню пароль
            </nuxt-link> -->
          </div>
        </div>
    
      <modal-main :title="title" :text="text" :img="img"></modal-main>
      <modal-password ref="foo" />
        
      </div>
    </div>
  </main>
</template>

<script>
import HeaderAuth from '~/components/layouts/Header/Header-Auth.vue'
import ModalPassword from '~/components/layouts/Modals/ModalPassword.vue'
import ModalMain from '~/components/layouts/Modals/modal-main.vue'

import {TheMask} from 'vue-the-mask'
import {mapState, mapMutations} from 'vuex'

export default {
  layout: 'auth',
  components: {
    // Logo
    TheMask,
    HeaderAuth,
    ModalPassword,
    ModalMain
  },
  data() {
    return{
      loginStatus : true,
      passEnterStatus: false,
      smsEnterStatus: false,
      number:'',
      password: '', 
      showPassword: false,
      errorPassword: false,
      permanent: true,
      permanentPassword: '',
      errorPermanenetPassword: false,
      timeLimit: 180,
      sms_code: '',
      timer: '',
      time:'',
      repeatSms: false,
      counter: 0,


      // for modals
      title:'',
      text:'',
      img:'',
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,      
    }),
    // checkSms(){
    //   if(this.auth.sms_code == this.permanentPassword){
    //     this.errorPermanenetPassword = false;
    //   } else {
    //     this.errorPermanenetPassword = true;
    //   }

    //   return this.errorPermanenetPassword;
    // }
  },
  methods:{    
    async authBtn() {

      let fields = {
          'mobile_phone': '7'+this.number,
      }
      // console.log(fields,'fields')
      await this.$axios.post('/auth/phone/', fields)
        .then(response =>{
          localStorage.setItem("authUser", JSON.stringify(response.data));
          localStorage.setItem("authUserStatus", true);
          this.$store.commit('setUser',response.data);
          this.$store.commit('setNumber', this.number);          
          this.loginStatus = !this.loginStatus;

          if(response.data.sms_code){
            this.sms_code = response.data.sms_code;
          }

          if(response.data.message == 'need_password'){
            this.passEnterStatus = !this.passEnterStatus;
          } 
          if(response.data.message == 'need_otp'){
            this.startTimerInterval();
            this.smsEnterStatus = !this.smsEnterStatus;
          }

        }).catch(error => {
            if(error.response.data.message=='phone_does_not_exist' || error.response.data.message=='validation_failed'){
              this.title="Отказано в доступе!"
              this.text="Номер телефона введен неверно или не внесен в базу данных!"
              this.img="error"
              $('#modal-main').modal('show')       
            } else if(error.response.data.message=='sms_not_sent'){
              this.title="Cмс не был отправлен!"
              this.text="Попробуйте еще раз!"
              this.img="alert"
              $('#modal-main').modal('show')           
            } else if(error.response.data.message=='sms_send_limit'){
              this.title="Cмс не был отправлен!"
              this.text="Вы превысели лимит отправки смс!"
              this.img="alert"
              $('#modal-main').modal('show')           
            }
            else {
              this.title="Отказано в доступе!"
              this.text="Номер телефона введен неверно или не внесен в базу данных!"
              this.img="error"
              $('#modal-auth-denied').modal('show')              
            }
            // this.$toast.error('Error');
        });

    },

    async sendSms() {

      let fields = {
        'mobile_phone': '7'+this.number,
        'sms_code': this.permanentPassword,
      }
      // console.log('sendSms',this.permanentPassword.length)
      if(this.permanentPassword.length==4){
        this.errorPermanenetPassword = false;
        await this.$axios.post('/auth/sms-code/', fields)
        .then(response =>{
          if(response.data.status = 'ok'){
            this.$router.push('/auth/createpassword')
          }
        }).catch(error => {
            this.errorPermanenetPassword = true;
            if(error.response.data.message=='password_creation_expired_or_not_allowed' ){
              this.title="Отказано в доступе!"
              this.text="Введенный смс не правильный или просрочен!!"
              this.img="error"
              $('#modal-main').modal('show')       
            } else{
              this.title="Отказано в доступе!"
              this.text="Номер телефона введен неверно или не внесен в базу данных!"
              this.img="error"
              $('#modal-auth-denied').modal('show')   
            }
        });
      }

      // console.log(fields,'fields')
    },

    async sendPassword(){
      this.counter ++;
      let fields = {
        'mobile_phone': '7'+this.number,
        'password': this.password
      }      
      this.errorPassword = false;
      await this.$axios.post('/auth/login/', fields)
      .then(response =>{
        if(response.data.tradepoints){
          this.$store.commit('setTradePoints', response.data.tradepoints)          
          localStorage.setItem("tradePoints", JSON.stringify(response.data.tradepoints)); 
          console.log('tradepoints',response.data.tradepoints)         
        }        
        if(response.data.status == 'ok'){
          this.$store.commit('setUserStatus', true);          
          this.$store.commit('setAuthToken', response.data.token);          
          localStorage.setItem("authToken", response.data.token);
          if(response.data.message=='authorized'){
            localStorage.setItem("setTradePoint", 't');          
            this.$router.push('/');
          } else if(response.data.message=='need_tradepoint'){            
            localStorage.setItem("setTradePoint", 'f');          
            this.$router.push('/selectstore')          
          }
        }
        
      }).catch(error => {          
          if(this.counter == 5){            
            this.showModal();
          } else{
            this.errorPassword = true;
          }                      
        });
    }, 

    async sendSmsAgain() {

      let fields = {
          'mobile_phone': '7'+this.number,
      }
      // console.log(fields,'fields')
      await this.$axios.post('/auth/phone/', fields)
        .then(response =>{
          this.$store.commit('setUser',response.data);
          this.$store.commit('setNumber', this.number);
          this.smsEnterStatus = true;

          if(response.data.sms_code){
            this.sms_code = response.data.sms_code;
          }

          if(response.data.message == 'need_password'){
            this.passEnterStatus = !this.passEnterStatus;
          } 
          if(response.data.message == 'need_otp'){
            // this.startTimerInterval();
            this.smsEnterStatus = !this.smsEnterStatus;
          }

        }).catch(error => {
            if(error.response.data.message=='phone_does_not_exist' || error.response.data.message=='validation_failed'){
              this.title="Отказано в доступе!"
              this.text="Номер телефона введен неверно или не внесен в базу данных!"
              this.img="error"
              $('#modal-main').modal('show')       
            } else if(error.response.data.message=='sms_not_sent'){
              this.title="Cмс не был отправлен!"
              this.text="Попробуйте еще раз!"
              this.img="alert"
              $('#modal-main').modal('show')           
            } else if(error.response.data.message=='sms_send_limit'){
              this.title="Cмс не был отправлен!"
              this.text="Вы превысели лимит отправки смс!"
              this.img="alert"
              $('#modal-main').modal('show')           
            }
            else {
              this.title="Отказано в доступе!"
              this.text="Номер телефона введен неверно или не внесен в базу данных!"
              this.img="error"
              $('#modal-auth-denied').modal('show')              
            }
        });
    },


    showModal(){
      $('#modal-auth-alert').modal('show');
      this.$refs.foo.startTimerInterval();
    },

    checkNumber(number){
      this.loginStatus = !this.loginStatus;
      this.passEnterStatus = !this.passEnterStatus;
      this.smsEnterStatus = !this.smsEnterStatus;
      // console.log(number, "number");
      this.startTimerInterval();
    },   
        
    showTimer(){
      clearInterval(this.time);
      this.repeatSms = false;
      this.timeLimit = 180;
      this.permanentPassword = '';
      setTimeout(this.startTimerInterval(), 1000);   
      this.sendSmsAgain();   
    },

    startTimer() {
      if(this.timeLimit){
        this.timeLimit = this.timeLimit-1
        let min = Math.floor(this.timeLimit/60)
        let sec = this.timeLimit - min * 60;
        if(min < 10) min = '0'+min;
        if(sec < 10) sec = '0'+sec;
        this.timer = min+':'+ sec
      } else {        
        this.timeLimit = 180;        
        this.repeatSms = true;
        this.errorPermanenetPassword = false;
        this.sms_code = '';
        clearInterval(this.time);
      }
      
      // return  ;
    },

    startTimerInterval(){
      this.time = setInterval(() =>{        
        this.startTimer();
      },1000);
    } 
  }
}
</script>

<style lang="scss">
  
</style>
