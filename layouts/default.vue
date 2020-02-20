<template>
  <div>
    <Header-Store/>
    <nuxt />
  </div>
</template>

<script>
  import HeaderStore from '~/components/layouts/Header/Header-store.vue'
  import {mapState, mapMutations} from 'vuex'

  export default {
    middleware: ['authenticated'],
    components: {
      HeaderStore,      
    },
    mounted(){ 
      this.getSubscribedId();
      this.userTappedProvideConsentButton(); 
      this.getUserDevice();          
    },
    computed: {
      ...mapState({
        user: state => state.user,        
      })
    },
    methods:{  

      getSubscribedId(){
        let _this = this;
        OneSignal.push(function() {
          OneSignal.on('subscriptionChange', function(isSubscribed) {
            if (isSubscribed) {
              console.log('isSubscribed:', isSubscribed)
              // The user is subscribed
              //   Either the user subscribed for the first time
              //   Or the user was subscribed -> unsubscribed -> subscribed
              OneSignal.getUserId( function(userId) {
                console.log('userId:', userId)

                console.log('this:', this)
                // Make a POST call to your server with the user ID

                _this.setUserId(userId);
                
              });
            }
          });
          OneSignal.isPushNotificationsEnabled(function(isEnabled) {
            if (isEnabled)
              console.log("Push notifications are enabled!");
            else
              console.log("Push notifications are not enabled yet.");    
          });
        });
      },

      userTappedProvideConsentButton(){
        OneSignal.push(function() {
          OneSignal.showNativePrompt();
          // OneSignal.showSlidedownPrompt();



        });
      },

      getUserDevice(){

        let ua = navigator.userAgent;

        let checker = {

          ios: ua.match(/(iPhone|iPod|iPad)/),
          android: ua.match(/(Android)/)

        }

        if(checker.ios){
          alert('ios:' + navigator.userAgent)
        } else if(checker.android){
          alert('android:' + navigator.userAgent)
        } else{
          alert('userAgent' + navigator.userAgent)
        }

      },

      // showWelcomeMessage(){
      //   OneSignal.push(function() {
      //     // OneSignal.showNativePrompt();          
      //   });
      // }

      async setUserId(userId){

        // console.log('here')

        let fields = {
          'push_token': userId
        }

        this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

        try{

          let res = await this.$axios.$post('/auth/set-push-token', fields)

          console.log('res:', res);
        } catch(error){

          console.log('errorPush', error)
        }
      },    
    }

  }
</script>
<style>

</style>
