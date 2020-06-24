<template>
    <main class="page">
        <Header-Auth />
        <div class="auth-section">
            <div class="container">
                <h3 class="auth-section__title">
                    {{$t('Вход')}}
                </h3>

                <!-- component login -->
                <div class="auth-section__form" v-if="loginStatus">
                    <form @submit.prevent="authBtn">
                        <label for="" class="title__label">
                            {{$t('Введите номер телефона')}}
                        </label>
                        <div class="form-group">
                            <div class="form-group__wrapper">
                                <the-mask
                                    :mask="['+7(###)-###-##-##']"
                                    class="form__input"
                                    placeholder=" "
                                    v-model.trim="number"
                                    :masked="false"
                                    type="tel"
                                    autocomplete="off"
                                />
                                <label for="input" class="form__label">
                                    {{$t('Номер телефона')}}
                                </label>
                            </div>
                        </div>
                        <!-- <div class="form-group">
                            
                        </div> -->
                        <button class="button button--green" type="submit" :disabled="number.length<10 || btnSignStatus">
                            {{$t('Далее')}}
                        </button>
                        <!-- <vue-recaptcha                             
                            @verify="onVerify" 
                            @expired="onExpired" 
                            ref="invisibleRecaptcha" 
                            size="invisible" 
                            :sitekey="sitekey"
                        >                                
                        </vue-recaptcha> -->
                        <!-- <button class="button button--green"  @click="showModal()">
                            Далее
                        </button> -->
                    </form>
                </div>

                <!-- component enter password  if user signed before and has password-->
                <div class="auth-section__form" v-if="passEnterStatus">
                    <form @submit.prevent="sendPassword">
                        <label for="" class="title__label">
                            {{$t('Введите пароль')}}
                        </label>
                        <div class="form-group">
                            <div class="form-group__wrapper">
                                <button class="button button--show" type="button" @click="showPassword = !showPassword"></button>
                                <input
                                    :type="showPassword ? 'text' : 'password'"
                                    :class="{'form__input': true, 'error' : errorPassword }"
                                    placeholder=" "
                                    v-model="password"
                                    autocomplete="off"
                                >
                                <label for="input" class="form__label">
                                    {{$t('Пароль')}}
                                </label>
                            </div>
                            <span class="error-text" v-if="errorPassword">
                                {{$t('Неверный пароль!')}}
                            </span>
                        </div>
                        <button class="button button--green" type="submit" :disabled="password.length==0 || btnPasswordStatus">
                            {{$t('Далее')}}
                        </button>
                    </form>
                    <div class="auth-section__recovery-link">
                        <nuxt-link class="login-link" :to="$i18n.path('auth/recovery-login')">
                            {{$t('Не помню пароль')}}
                        </nuxt-link>
                    </div>
                </div>

                <!-- component enter password  if user has not signed before and has not password-->
                <div class="auth-section__form auth-section__form--sms" v-if="smsEnterStatus">
                    <form @submit.prevent="sendSms">
                        <label for="" class="title__label">
                            {{$t('Введите код подтверждения')}}
                        </label>
                        <div class="form-group">
                            <div class="form-group__wrapper">
                                <the-mask
                                    :class="{'form__input form__input--sms ': true, 'permanent': permanent, 'error' : errorPermanenetPassword }"
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
                                {{$t('Неверный код подтверждения!')}}
                            </span>
                        </div>
                    </form>
                    <div class="auth-section__recovery-link confirm">
                        <a class="login-link" href="#" v-if="repeatSms" @click="showTimer">
                            {{$t('Выслать код повторно')}}
                        </a>
                        <p class="timer" v-if="!repeatSms">
                            {{$t('Выслать код повторно через')}}
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

    import VueRecaptcha from 'vue-recaptcha';

    export default {
        layout: 'auth',
        components: {
            // Logo
            TheMask,
            HeaderAuth,
            ModalPassword,
            ModalMain,
            VueRecaptcha
        },
        data() {
            return{
                // loginStatus : true,
                // passEnterStatus: false,
                sitekey: '6Lde8vkUAAAAAPbi_7yFommRwz2frkaSlYoiKbRm',
                response: '',
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
                //btnStatus
                btnSignStatus: false,
                btnPasswordStatus: false,
            }
        },
        computed: {
            ...mapState({
                auth: state => state.auth,
                loginStatus: state => state.loginStatus,
                passEnterStatus: state => state.passEnterStatus,
                phoneNumber: state => state.number
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
            submit(){
                // console.log(this.$refs.invisibleRecaptcha)
                // this.$refs.invisibleRecaptcha.reset();
                this.$refs.invisibleRecaptcha.execute();
            },
            async onVerify(response) {
                // console.log('response', response)
                // this.response = response;
                if (response) {
                    this.response = response;
                    await this.authBtn();
                }
            },
            onExpired: function () {
                console.log('Expired')
            },
            async authBtn() {

                let fields = {
                    'mobile_phone': '7'+this.number,
                    // 'captcha': this.response,
                }

                this.btnSignStatus = true;
                // console.log(fields,'fields')

                await this.$axios.post('/auth/phone/', fields)
                    .then(response =>{
                        // sessionStorage.setItem("authUser", JSON.stringify(response.data));
                        sessionStorage.setItem("mobile_phone", this.number);
                        // localStorage.setItem("authUserStatus", true);
                        this.$store.commit('setUser',response.data);
                        this.$store.commit('setNumber', this.number);
                        this.$store.commit('changeLoginStatus',false);
                        // this.loginStatus = !this.loginStatus;                        
                        this.btnSignStatus = false;

                        if(response.data.sms_code){
                            this.sms_code = response.data.sms_code;
                        }

                        if(response.data.message == 'need_password'){
                            // this.passEnterStatus = !this.passEnterStatus;
                            this.$store.commit('changePassStatus', true);                            
                        }

                        if(response.data.message == 'need_otp'){
                            this.startTimerInterval();
                            this.smsEnterStatus = !this.smsEnterStatus;
                        }

                    }).catch(error => {

                        this.btnSignStatus = false;
                        console.log(error.response)

                        if(error.response.data.message=='phone_does_not_exist' || error.response.data.message=='validation_failed'){
                            this.title= this.$t('Отказано в доступе!')
                            this.text= this.$t('Номер телефона введен неверно или не внесен в базу данных!')
                            this.img="error"
                            $('#modal-main').modal('show')
                        } else if(error.response.data.message=='sms_not_sent'){
                            this.title= this.$t('Cмс не был отправлен!')
                            this.text= this.$t('Попробуйте еще раз!')
                            this.img="alert"
                            $('#modal-main').modal('show')
                        } else if(error.response.data.message=='sms_send_limit'){
                            this.title= this.$t('Cмс не был отправлен!')
                            this.text= this.$t('Вы превысили лимит отправки смс!')
                            this.img="alert"
                            $('#modal-main').modal('show')
                        }
                        else if(error.response.data.message=='no_tradepoint'){
                            this.title= this.$t('Отказано в доступе!')
                            this.text= this.$t('У вас нет доступных торговых точек!')
                            this.img="error"
                            $('#modal-main').modal('show')
                        }
                        else if(error.response.data.message=='auth_blocked'){
                            this.title = this.$t('Превышение лимита!');
                            this.text = this.$t('Вы ввели пароль больше 5 раз. Попробуйте еще раз через 10 минут')
                            this.img="error"
                            $('#modal-main').modal('show')
                        }
                        else {
                            this.title = this.$t('Отказано в доступе!')
                            this.text = this.$t('Номер телефона введен неверно или не внесен в базу данных!')
                            this.img="error"
                            // $('#modal-auth-denied').modal('show')
                            $('#modal-main').modal('show')
                        }
                    });

            },

            async sendSms() {

                let fields = {
                    'mobile_phone': '7'+this.phoneNumber,
                    'sms_code': this.permanentPassword,
                }
                // console.log('sendSms',this.permanentPassword.length)
                if(this.permanentPassword.length==4){

                    this.errorPermanenetPassword = false;

                    await this.$axios.post('/auth/sms-code/', fields)
                        .then(response =>{
                            if(response.data.status = 'ok'){
                                this.$router.push(this.$i18n.path('auth/createpassword'))
                            }
                        }).catch(error => {
                            this.errorPermanenetPassword = true;
                            if(error.response.data.message=='password_creation_expired_or_not_allowed' ){
                                this.title= this.$t('Отказано в доступе!')
                                this.text= this.$t('Введенный смс не правильный или просрочен!')
                                this.img="error"
                                $('#modal-main').modal('show')
                            } else{
                                this.title= this.$t('Отказано в доступе!')
                                this.text= this.$t('Номер телефона введен неверно или не внесен в базу данных!')
                                this.img="error"
                                $('#modal-main').modal('show');
                            }
                        });
                }

                // console.log(fields,'fields')
            },

            async sendPassword(){

                this.counter ++;

                this.btnPasswordStatus = true;

                this.errorPassword = false;

                let fields = {
                    'mobile_phone': '7'+this.phoneNumber,
                    'password': this.password,
                    'locale': this.$i18n.locale
                }

                await this.$axios.post('/auth/login/', fields)
                    .then(response =>{
                        this.btnPasswordStatus = false;
                        this.number = '';
                        this.password = '';
                        if(response.data.tradepoints){
                            this.$store.commit('setTradePoints', response.data.tradepoints)
                            localStorage.setItem("tradePoints", JSON.stringify(response.data.tradepoints));
                            // console.log('tradepoints',response.data.tradepoints)
                        }

                        if(response.data.status == 'ok'){
                            this.$store.commit('setUserStatus', 'token');
                            this.$store.commit('setAuthToken', response.data.token);
                            this.$store.commit('setTokenStatus', true);
                            localStorage.setItem("authUserStatus", 'token');
                            sessionStorage.setItem("authToken", response.data.token);
                            localStorage.setItem("authToken", 'token');
                            if(response.data.message=='authorized'){
                                localStorage.setItem("setTradePoint", 't');
                                localStorage.setItem("tradepoint", JSON.stringify(response.data.tradepoint));
                                localStorage.setItem("tradePoints", JSON.stringify(response.data.tradepoint));
                                sessionStorage.setItem('account',JSON.stringify(response.data.account));
                                sessionStorage.setItem('tradeagent',JSON.stringify(response.data.tradeagent));
                                this.$router.push(this.$i18n.path(''));
                            } else if(response.data.message=='need_tradepoint'){
                                localStorage.setItem("setTradePoint", 'f');
                                this.$router.push(this.$i18n.path('selectstore'))
                            }
                        }


                    }).catch(error => {                        
                        // console.log(error.response.data.auth_fail_count)
                        if(error.response.data.auth_fail_count && error.response.data.auth_fail_count < 5){
                            this.btnPasswordStatus = false;
                            this.errorPassword = true;
                            // this.showModal();
                            // this.btnPasswordStatus = true;
                        }else{
                            this.number = '';
                            this.password = '';
                            this.showModal();
                            this.btnPasswordStatus = false;
                        }
                        // if(this.counter == 5){
                        //     this.showModal();
                        //     this.btnPasswordStatus = true;
                        // } else if (){
                        //     this.btnPasswordStatus = false;
                        //     this.errorPassword = true;
                        // }
                    });
            },

            async sendSmsAgain() {

                let fields = {
                    'mobile_phone': '7'+this.phoneNumber,
                }
                // console.log(fields,'fields')
                await this.$axios.post('/auth/phone/', fields)
                    .then(response =>{
                        this.$store.commit('setUser',response.data);
                        // this.$store.commit('setNumber', this.number);
                        this.smsEnterStatus = true;

                        if(response.data.sms_code){
                            this.sms_code = response.data.sms_code;
                        }

                        if(response.data.message == 'need_password'){
                            // this.passEnterStatus = !this.passEnterStatus;
                            this.$store.commit('changePassStatus', false);
                        }

                        if(response.data.message == 'need_otp'){
                            // this.startTimerInterval();
                            this.smsEnterStatus = !this.smsEnterStatus;
                        }

                    }).catch(error => {

                        if(error.response.data.message=='phone_does_not_exist' || error.response.data.message=='validation_failed'){
                            this.title= this.$t('Отказано в доступе!')
                            this.text= this.$t('Номер телефона введен неверно или не внесен в базу данных!')
                            this.img="error"
                            $('#modal-main').modal('show')
                        } else if(error.response.data.message=='sms_not_sent'){
                            this.title= this.$t('Cмс не был отправлен!')
                            this.text= this.$t('Попробуйте еще раз!')
                            this.img="alert"
                            $('#modal-main').modal('show')
                        } else if(error.response.data.message=='sms_send_limit'){
                            this.title= this.$t('Cмс не был отправлен!')
                            this.text= this.$t('Вы превысили лимит отправки смс!')
                            this.img="alert"
                            $('#modal-main').modal('show')
                        }
                        else {
                            this.title= this.$t('Отказано в доступе!')
                            this.text= this.$t('Номер телефона введен неверно или не внесен в базу данных!')
                            this.img="error"
                            $('#modal-main').modal('show')
                        }
                    });
            },

            showModal(){
                $('#modal-auth-alert').modal('show');
                this.$refs.foo.startTimerInterval();
            },

            checkNumber(number){
                this.$store.commit('changeLoginStatus',false);
                // this.loginStatus = !this.loginStatus;
                // this.passEnterStatus = !this.passEnterStatus;
                this.$store.commit('changePassStatus', true);
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
