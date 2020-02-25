<template>
	<div>
		<header class="header">
			<div class="container">
				<div class="header__wrapper" >
					<div class="header__logo">					
						<nuxt-link to="/" @click.native = "closeMenu">
							<img src="~/assets/img/logo.svg" alt="" >
						</nuxt-link>
					</div>
					<div class="header__link">
						<div class="notification">
							<nuxt-link to="/notifications" @click.native = "closeMenu">
								<!-- <img src="~/assets/img/icons/bell.svg" alt=""> -->
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path  class="green" d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#969696" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									<path  class="green" d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#969696" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>								
							</nuxt-link>
						</div>
						<button :class="{'burger': true, 'open': burgerStatus}" @click="showBurger()">
							<span class="burger__item"></span>
							<span class="burger__item"></span>
							<span class="burger__item"></span>
						</button>
						<!-- <div class="burger-menu"></div> -->
					</div>
				</div>
			</div>		
		</header>
		<!-- header menu -->
		<div :class="{'header-mobile': true, 'show': burgerStatus, 'show--fillform' : burgerStatus && ($route.name == 'Anketa-CreateAnketa-Fillform' || $route.name == 'plan')}">
			<div class="container">
				<ul class="nav">
					
					<li class="nav__item">
						<nuxt-link to="/" class="nav__link nav__link--green"  @click.native="showBurger()">
							Главная
						</nuxt-link>
					</li>
					<li class="nav__item">
						<nuxt-link to="/anketa/createanketa" class="nav__link nav__link--green" @click.native="showBurger()">
							Анкеты
						</nuxt-link>
					</li>
					<li class="nav__item">
						<nuxt-link to="/anketa/gifts" class="nav__link nav__link--green" @click.native="showBurger()">
							Призы
						</nuxt-link>
					</li>					
					<li class="nav__item">
						<!-- <nuxt-link to="/plan" class="nav__link nav__link--green" @click.native="showBurger()"> -->
						<nuxt-link to="#" class="nav__link" disabled>
							План закупок
						</nuxt-link>
					</li>
					<li class="nav__item">
						<!-- <template v-if="getNumber"> -->
							<nuxt-link to="/notifications" class="nav__link nav__link--green" @click.native="showBurger()">
								Уведомления
							</nuxt-link>
						<!-- </template>		
						<template v-else>
							<nuxt-link to="#" class="nav__link" disabled>
								Уведомления
							</nuxt-link>
						</template>				 -->
					</li>
					<li class="nav__item">
						<nuxt-link to="/profile" class="nav__link nav__link--green" @click.native="showBurger()">
							Профиль
						</nuxt-link>
					</li>
					<li class="nav__item">
						<nuxt-link to="#" class="nav__link" disabled>
							Викторины
						</nuxt-link>
					</li>
					<li class="nav__item">
						<nuxt-link to="/news" class="nav__link nav__link--green" @click.native="showBurger()">
							Новости
						</nuxt-link>
					</li>
					<li class="nav__item">
						<nuxt-link to="#" class="nav__link" disabled>
							Агент +
						</nuxt-link>
					</li>
					<li class="nav__item">
						<nuxt-link to="#" class="nav__link" disabled>
							Обратная связь
						</nuxt-link>
					</li>
				</ul>
			</div>
		</div>
	</div>	
</template>

<script>
	export default{
		data() {
			return {
				burgerStatus: false
			}
		},
		computed:{
			getNumber(){
				return localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")).mobile_phone == '77059521623' : false;
			}
		},
		methods:{
			showBurger(){
				this.burgerStatus = !this.burgerStatus

				$('body').toggleClass('overflow_hidden')
			},
			closeMenu(){
				this.burgerStatus = false;
				$('body').removeClass('overflow_hidden')
			}
		}
	}
</script>

<style lang="scss">
	.nuxt-link-exact-active,.nuxt-link-active{
		.green{
			stroke: #217461;
			fill:#217461;
		}
	}
	.header{
		padding: 12px 0;		
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
	    position: fixed;
	    z-index: 11;
	    background-color: #fff;
	    width: 100%;
	    top: 0;
	    left: 0;
		&__wrapper{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
		}
		&__logo{
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			h4{
				line-height: 25px;				
				margin-left: 8px;
			}
			// justify-content: space-between;	
		}
		&__link{
			display: flex;
		    align-items: center;
		    .notification{
		    	margin-right: 16px;
		    }
			.lang{
				font-weight: 500;
				font-size: 16px;
				line-height: 19px;
				/* identical to box height */

				text-align: center;

				/* Secondary Green */

				color: #217461;
			}
		}
		&-mobile{
			background: #fff;
			position: fixed;
		    width: 100%;
		    top: 0;
		    bottom: 0;
		    left: 0;
		    transform: translateY(-100%);
	        transition: .5s;
	        z-index: 10;
	        overflow: auto;
	        height: calc(100% - 56px);
	        &.show{
	        	transform: translateY(56px);
	        	&--fillform{
	        		height: calc(100% - 110px);
	        		transform: translateY(110px);
	        		@media screen and (max-width: 335px) {
	        			height: calc(100% - 130px);
		        		transform: translateY(128px);
	        		}
	        	}
	        }
			.nav{
				margin: 0 -16px;
				&__item{
					width: 100%;
				}
				&__link{
					font-weight: 300;
					font-size: 16px;
					line-height: 19px;					
					color: #1F1F1F;
					padding: 18px 16px;
					display: block;
					&--green{
						color: #05B186;
						font-weight: bold;
					}
					&:hover{
						background: #F9F9F9;
						font-weight: 500;
						color: #217461;
						text-decoration: none;
					}
				}
			}
		}
	}
</style>