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
							<a href="#">
								<img src="~/assets/img/icons/bell.svg" alt="">
							</a>
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
						<nuxt-link to="#" class="nav__link" disabled>
							Уведомления
						</nuxt-link>
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
	.header{
		padding: 12px 0;		
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
	    position: fixed;
	    z-index: 10;
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
	        		height: calc(100% - 130px);
	        		transform: translateY(128px);
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