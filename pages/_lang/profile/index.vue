<template>
	<main class="page page--flex page--grey page--pd">
		<div class="section section--profile">
			<div class="container">
    			<h3 class="section__title section__title--profile">
    				<span>
    					{{$t('Профиль')}}
    				</span>
    				<!-- <button class="button button--transparent" @click="logOut">
    					Выйти
    				</button> -->

    			</h3>

    			<div class="profile">
    				<div class="profile__item" v-if="profile.name">
    					<p class="title">
    						{{$t('ФИО')}}
    					</p>
    					<p class="name">
    						{{profile.name}}
    					</p>
    				</div>
    				<div class="profile__item" v-if="profile.tel">
    					<p class="title">
    						{{$t('Номер телефона')}}
    					</p>
    					<p class="tel">
    						+{{profile.tel | formatNumber}}
    					</p>
    				</div>
    				<div class="profile__item" v-if="profile.tradepoint">
    					<p class="title">
    						{{$t('Торговая точка')}}
    					</p>
    					<p class="name">
    						{{profile.tradepoint}}
    					</p>
    				</div>
    				<div class="profile__item" v-if="tradeagent">
    					<p class="title">
    						{{$t('Специалист по поддержке сбыта JTI')}}
    					</p>
    					<p class="name" v-if="tradeagent.name">
    						{{tradeagent.name}}
    					</p>
    					<p class="tel tel--green" v-if="tradeagent.tel">
    						<a :href="'tel:+'+tradeagent.tel">
    							+{{tradeagent.tel | formatNumber}}
    						</a>
    					</p>
    				</div>
    			</div>

    			<div class="profile-links">
    				<div class="profile-links__item">
    					<nuxt-link :to="$i18n.path('feedback')">
	    					<p class="title">
	    						{{$t('Обратная связь')}}
	    					</p>
	    				</nuxt-link>
    				</div>
    				<div class="profile-links__item">
	    				<!-- <nuxt-link :to="{name: 'auth-resetpassword', query: { title : 'Изменение пароля'}}"> -->
	    				<nuxt-link :to="$i18n.path(`auth/resetpassword?title=${$t('Изменение пароля')}`)">
	    					<p class="title">
	    						{{$t('Сменить пароль')}}
	    					</p>
	    				</nuxt-link>
    				</div>
    				<div class="profile-links__item">
    					<p class="title" v-if="$i18n.locale === 'ru'" @click ="changeLang('kk')">
    						Қазақша нұсқасы
    					</p>
    					<p class="title" v-if="$i18n.locale === 'kk'" @click ="changeLang('')">
    						Русская версия
    					</p>
    				</div>
    				<!-- <nuxt-link class="button button--green" to="#">
    					Обратная связь
    				</nuxt-link> -->

    				<!-- <nuxt-link class="button button--bordered red" :to="{name: 'Auth-ResetPassword', query: { title : 'Изменение пароля'}}">
    					Изменить пароль
    				</nuxt-link> -->

    				<!-- <nuxt-link class="button button--transparent green" to="#">
    					Қазақша нұсқасы
    				</nuxt-link> -->
    			</div>
    			<div class="profile-logout">
    				<button class="button button--bordered red" @click="showModal('modal-main')">
    					{{$t('Выйти из аккаунта')}}
    				</button>
    			</div>
    		</div>
		</div>

		<modal-main :title="title" :text="text" :img="img" :number="number" :btnText="btnText"></modal-main>
	</main>
</template>
<script>
	import ModalMain from '~/components/layouts/Modals/modal-main.vue'
	export default{
		filters:{
			formatNumber(value) {
				return value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
			}
		},
		components: {
			ModalMain,
		},
		data(){
			return{
				profile: {
					name: localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')).last_name + ' ' + JSON.parse(localStorage.getItem('account')).first_name + ' ' + JSON.parse(localStorage.getItem('account')).middle_name : '',
					tel: localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')).mobile_phone : '',
					tradepoint: localStorage.getItem('tradepoint') ? 'Магазин "' + JSON.parse(localStorage.getItem('tradepoint')).account_name + '" ' + ' г.' + JSON.parse(localStorage.getItem('tradepoint')).city + ', ' + JSON.parse(localStorage.getItem('tradepoint')).street_address: '',
				},
				tradeagent:{
					name: localStorage.getItem('tradeagent') ? JSON.parse(localStorage.getItem('tradeagent')).employee_name : '',
					tel: localStorage.getItem('tradeagent') ? JSON.parse(localStorage.getItem('tradeagent')).phone : '',
				},
				title: '',
				text: '',
				number:'',
				img: 'logout',
				btnText: 'logout',
			}
		},
		mounted(){
			this.$nuxt.$on('logOut',this.logOut);			
		},
		methods:{
			showModal(modal){
				// console.log('modal', modal);
				this.title = this.$t('Выход');
				this.text = this.$t('Вы действительно хотите выйти из аккаунта?');
				$('#'+modal).modal('show')
			},

			changeLang(lang){
	            // console.log(lang);
	            if (lang == '') {
	                //this.$router.push(this.$route.fullPath.replace(/(\/kk)+/, '') == '' || this.$route.fullPath.replace(/(\/en)+/, '') == ''  ? '/' : this.$route.fullPath.replace(/(\/kk)+/, '') this.$route.fullPath.replace(/(\/en)+/, ''))
	                this.$router.push(this.$route.fullPath.replace(new RegExp('(\/'+this.$route.params.lang+')'), ''));
	            }else if (lang == 'kk') {
	                this.$router.push('/kk' + this.$route.fullPath.replace(new RegExp('(\/'+this.$route.params.lang+')'), ''))
	            }

                this.changeLocale(lang);
	            // this.changeLanguageWrap = false
	            // this.opened=false
	        },

            async changeLocale(locale){

                this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

                let fields = {
                    'locale': locale.length ? locale : 'ru'
                }
                try {

                    let res  = await this.$axios.$post('/auth/set-locale', fields);

                    // console.log("localeRes", res)
                } catch(error){
                    console.log('error', error)
                }

            },
			async logOut(){				
				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');
				await this.$axios.get('/auth/logout')
					.then(response =>{
						$('#modal-main').modal('hide');
						this.$store.commit('resetState');
						localStorage.clear();
						sessionStorage.clear();						
						this.$router.push('/')
					}).catch(error =>{
						console.log(error);
					})
			}
		}
	}
</script>


<style lang="scss">
	.page{
		&--pd{
			padding-top: 16px;
			padding-bottom: 120px;
		}
	}
	.section{
		&--profile{
			width: 100%;
		}
		&__title{
			&--profile{
				display: flex;
				justify-content: space-between;
				.button{
					width: auto;
					margin-top: 0;
				}
			}
		}
	}
	.profile{
		margin-top: 8px;
		border-radius: 8px;
		background: #fff;
		padding: 16px 16px 20px 16px;
		&__item{
			padding-bottom: 16px;
			position: relative;
			margin-bottom: 16px;
			&:last-child{
				margin-bottom: 0px;
				padding-bottom: 0;
				&:after{
					display: none;
				}
			}
			&:after{
				content: '';
				position: absolute;
				width: 100%;
				height: 1px;
				background: #F0F0F0;
				bottom: 0;
			}
			p{
				margin-bottom: 0;
			}
			.title{
				font-weight: normal;
				font-size: 12px;
				line-height: 14px;
				color: #969696;
				margin-bottom: 4px;
			}
			.name{
				font-weight: 500;
				font-size: 16px;
				line-height: 19px;
				color: #1F1F1F;
			}
			.tel{
				font-weight: 500;
				font-size: 16px;
				line-height: 19px;
				color: #1F1F1F;
				&--green{
					margin-top: 8px;
					a{
						text-decoration: none;
						color: #05B186;
					}

				}
			}
		}
		// links

		&-links{
			margin-top: 8px;
			border-radius: 8px;
			background: #fff;
			// padding: 0px 16px 0px 16px;
			padding: 0;
			.button{
				&--green{
					display: block;
					margin-bottom: 8px;
				}
				&--transparent{
					text-align: center;
					margin-top: 32px;
					display: block;
				}
			}

			&__item{
				position: relative;
				// margin-bottom: 16px;
				// padding: 18px 0;
				&:last-child{
					margin-bottom: 0px;
					// padding-bottom: 0;
					&:after{
						display: none;
					}
				}
				&>a{
					&:hover{
						text-decoration: none;
					}
				}
				&:after{
					content: '';
				    position: absolute;
				    width: calc(100% - 32px);
				    height: 1px;
				    background: #F0F0F0;
				    bottom: 0;
				}
				p{
					margin-bottom: 0;
					&.title{
						padding: 18px 16px;
						font-weight: 500;
						font-size: 16px;
						line-height: 19px;
						color: #1F1F1F;
						position: relative;
						cursor: pointer;
						&:after{
							content: '';
							position: absolute;
							top: 0;
							bottom: 0;
							right: 16px;
							margin: auto;
							transform: rotate(180deg);
							background: url('~assets/img/icons/backlink.svg');
							width: 12px;
							height: 20px;
						}
					}
				}
			}
		}

		&-logout{
			margin-top: 24px;
		}

	}
</style>
