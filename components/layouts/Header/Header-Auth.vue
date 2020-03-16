<template>
	<header class="header">
		<div class="container">
			<div class="header__wrapper" v-if="!($route.name == 'selectstore')">
				<div class="header__logo">
					<nuxt-link to="/">
						<img src="~/assets/img/logo.svg" alt="">
					</nuxt-link>
					<h4>
						JTI Partner 360						
					</h4>
				</div>
				<div class="header__link">
					<a href="#" class="lang">
						<!-- Қазақша -->
					</a>
					<!-- <div class="burger-menu"></div> -->
				</div>
			</div>

			<div class="header__wrapper" v-else>
				<div class="header__logo">					
					<h4>
						Выбор торговой точки
					</h4>
				</div>
				<div class="header__link">
					<!-- <a href="#" class="lang">
						Қазақша
					</a> -->
					<!-- <button :class="{'burger': true, 'open': burgerStatus}" @click="burgerStatus = !burgerStatus">
						<span class="burger__item"></span>
						<span class="burger__item"></span>
						<span class="burger__item"></span>
					</button> -->
					<!-- <div class="burger-menu"></div> -->
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'

	export default {		
		data(){
			return {}
		},
		computed: {
			...mapState({
		      tradepoints: state => state.tradepoints,      
		    })
		}
	}
</script>
<style lang="scss">
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
	}
</style>