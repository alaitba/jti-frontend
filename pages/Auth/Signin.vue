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
                />
              </div> 
              <span class="error-text" v-if="errorPermanenetPassword">
                Неверный пароль!
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

            <h3 v-if="auth" style="text-align:center; margin-top: 16px;">
              {{auth.sms_code}}
            </h3>


            <nuxt-link class="login-link" to="/selectstore">
              Не помню пароль
            </nuxt-link>
          </div>
        </div>


        



        
      <modal-number/>
      <modal-password/>
        
      </div>
    </div>
  </main>
</template>

<script>
import HeaderAuth from '~/components/layouts/Header/Header-Auth.vue'
import ModalNumber from '~/components/layouts/ModalNumber.vue'
import ModalPassword from '~/components/layouts/ModalPassword.vue'
import {TheMask} from 'vue-the-mask'
import {mapState, mapMutations} from 'vuex'

export default {
  // middleware: ['authenticated'],
  layout: 'auth',
  components: {
    // Logo
    TheMask,
    HeaderAuth,
    ModalNumber,
    ModalPassword,
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
      timer: '',
      time:'',
      repeatSms: false,
      counter: 0,
    }
  },
  computed: {
    ...mapState({
      auth: state => state.auth,      
    })
  },
  methods:{
    async authBtn() {

      let fields = {
          'mobile_phone': '7'+this.number,
      }
      // console.log(fields,'fields')
      await this.$axios.post('http://jti.ibec.systems/auth/phone/', fields)
        .then(response =>{
          localStorage.setItem("authUser", JSON.stringify(response.data));
          localStorage.setItem("authUserStatus", true);
          this.$store.commit('setUser',response.data);
          this.$store.commit('setNumber', this.number);
          // console.log(this.$store.state.auth,'data')
          this.loginStatus = !this.loginStatus;
          if(response.data.sms_code){
            this.smsEnterStatus = !this.smsEnterStatus;
            this.startTimerInterval();
          } else{
            this.passEnterStatus = !this.passEnterStatus;
          }

        }).catch(error => {
            $('#modal-auth-denied').modal('show')
            // this.$toast.error('Error');
        });

    },

    async sendSms() {

      let fields = {
        'mobile_phone': '7'+this.number,
        'sms_code': this.$store.state.auth.sms_code,
      }

      await this.$axios.post('http://jti.ibec.systems/auth/sms-code/', fields)
      .then(response =>{
        if(response.data.status = 'ok'){
          console.log(this.$router,'router');
          this.$router.push('/auth/createpassword')
        }
      }).catch(error => {
          // $('#modal-auth-denied').modal('show')
            // this.$toast.error('Error');
      });

      // console.log(fields,'fields')
    },

    async sendPassword(){
      // console.log(password);
      this.counter ++;
      let fields = {
        'mobile_phone': '7'+this.number,
        'password': this.password
      }

      await this.$axios.post('http://jti.ibec.systems/auth/login/', fields)
      .then(response =>{
        if(response.data.status = 'ok'){
          this.$router.push('/selectstore')          
        }
        if(response.data.tradepoints){
          this.$store.commit('setTradePoints', response.data.tradepoints)
        }
      }).catch(error => {          
          if(this.counter == 5){            
            $('#modal-auth-alert').modal('show')
          } else{
            this.errorPassword = true;
          }          
            // this.$toast.error('Error');
        });
      this.errorPassword = false;

    }, 

    async sendSmsAgain() {

      let fields = {
          'mobile_phone': '7'+this.number,
      }
      // console.log(fields,'fields')
      await this.$axios.post('http://jti.ibec.systems/auth/phone/', fields)
        .then(response =>{
          this.$store.commit('setUser',response.data);
          this.$store.commit('setNumber', this.number);
          // // console.log(this.$store.state.auth,'data')          
          if(response.data.sms_code){
            this.smsEnterStatus = true;
            this.startTimerInterval();
          } else{
            this.passEnterStatus = !this.passEnterStatus;
          }

        }).catch(error => {
            $('#modal-auth-denied').modal('show')
            // this.$toast.error('Error');
        });

    },

    checkNumber(number){
      this.loginStatus = !this.loginStatus;
      this.passEnterStatus = !this.passEnterStatus;
      this.smsEnterStatus = !this.smsEnterStatus;
      // console.log(number, "number");
      this.startTimerInterval();
    },       
    showTimer(){
      this.repeatSms = !this.repeatSms;
      clearInterval(this.time);
      this.timeLimit = 180;
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
        console.log('time')
        this.timeLimit = 180;        
        this.repeatSms = true;
      }
      
      // return  ;
    },
    stopTimer(){      
      // console.log('stopTimer');      
      // this.timeLimit = 180;      
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
  .auth-section{
    padding-top: 40px;
    width: 100%; 
    &__title{
      line-height: 33px;      
      text-align: center;
    }
    &__form{
      margin-top: 40px;
      &--sms{
        // display: flex;
        // flex-direction:column;
        // justify-content: center;
        form{
          text-align: center;
        }
        .form-group{
          &__wrapper{
            margin-top: 24px;
          }
          .error-text{
            text-align: center;
            width: 100%;
          }
        }
        ::-webkit-input-placeholder { /* Edge */
          color: #1F1F1F;
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
          color: #1F1F1F;
        }

        ::placeholder {
          color: #1F1F1F;
        }
      }
      .button--green{
        margin-top: 32px;
      }
    }
    &__recovery-link{
      display: flex;
      justify-content: center;
      margin-top: 32px;
      &.confirm{
        margin-top: 42px;
        flex-direction:column;
      }
    }
    .login-link{
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      text-decoration-line: underline;
      color: #217461;      
      // margin-top: 32px;
    }
  }
</style>
