<template>
  <main class="page">
    <!-- <div class="container"> -->
    	<div class="section section--main">
    		<!-- <div class="main-slider">
    			<div class="main-slider__item">
    				<swiper :options="swiperOption" ref="mySwiper">
    					<swiper-slide></swiper-slide>
					    <swiper-slide></swiper-slide>
					    <swiper-slide></swiper-slide>
					    <swiper-slide></swiper-slide>
					    <div class="swiper-pagination" slot="pagination"></div>
    				</swiper>
    			</div>
    		</div> -->
    	</div>
    	<div class="section section--news">
    		<div class="container">
    			<h3 class="section__title">
    				Новости
    			</h3>
    			<div class="news">
    				<div class="news__item news__item--noimg">
    					<!-- <div class="banner">
    						<img src="~/assets/img/news/1.png" alt="">
    					</div> -->
    					<div class="content">
    						<h4 class="title">
	    						С Новым годом дорогие друзья...
	    					</h4>
	    					<p class="data">
	    						30.12.2019
	    					</span>
	    					<div class="text">
	    						марка сигарет, выпускаемая компаниями R.J. Reynolds Tobacco Company
	    					</div>
    					</div>    					
    				</div>
    				<div class="news__item news__item--noimg">
    					<div class="banner">
    						<img src="~/assets/img/news/1.png" alt="">
    					</div>
    					<div class="content">
    						<h4 class="title">
	    						С Новым годом дорогие друзья...
	    					</h4>
	    					<p class="data">
	    						30.12.2019
	    					</span>
	    					<div class="text">
	    						марка сигарет, выпускаемая компаниями R.J. Reynolds Tobacco Company
	    					</div>
    					</div>    					
    				</div>
    				<div class="news__item news__item--noimg">
    					<div class="banner">
    						<img src="~/assets/img/news/2.png" alt="">
    					</div>
    					<div class="content">
    						<h4 class="title">
	    						С Новым годом дорогие друзья...
	    					</h4>
	    					<p class="data">
	    						30.12.2019
	    					</p>
	    					<div class="text">
	    						марка сигарет, выпускаемая компаниями R.J. Reynolds Tobacco Company
	    					</div>
    					</div>    					
    				</div>

    				<div class="news__all">
    					<nuxt-link class="news__link" to="/news">
    						Все новости
    					</nuxt-link>
    				</div>
    			</div>
    		</div>
    	</div>
    	<div class="section section--footer">
    		<div class="footer">
    			<div class="footer__head">
    				<h4 class="title">
    					JTI Partner 360
    				</h4>
    				<nuxt-link class="button button--green" to="/faq">
    					Обратная связь
    				</nuxt-link>
    			</div>
    			<div class="footer__bottom">
    				<a href="https://ibecsystems.com/ru#/" target="_blank" class="copyright">
    					<span>
    						Разработано в
    					</span>
    					<img src="~/assets/img/icons/ibec_systems_logo.svg" alt="">
    				</a>
    			</div>
    		</div>
    		<!-- <div class="container">
    			
    		</div> -->
    	</div>
     	<!-- <h4>
     		tradepoint:{{ tradepoint }}
     		<nuxt-link to="/anketa/createanketa">
     			asdsadasdasd
     		</nuxt-link>
     	</h4> -->
    <!-- </div> -->
  </main>
</template>

<script>
	// import HeaderStore from '~/components/layouts/Header/HeaderStore.vue'
	import {mapState, mapMutations} from 'vuex'
	export default {
	  	components: {
	      // HeaderStore,      
	    },
	    data() {
	    	return {
	    		swiperOption: {	    	
	    			pagination:{
	    				el: '.swiper-pagination',
		    			dynamicBullets: true
	    			}			    			
	    		}
	    	}
	    },
	    computed: {
	      ...mapState({
	        tradepoint: state => state.tradepoint,      
	      })
	    },
	}
</script>

<style lang="scss">
	main.page{
		background: #F9F9F9;
		height: 100vh;
		display: block;
	}
	.section{
		&__title{
			line-height: 33px;			
			color: #969696;
		}
		&--news{
			padding-top: 32px;
			.news{
				margin-top: 4px;
				&__item{
					background: #fff;
					box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 4px 8px rgba(0, 0, 0, 0.04);
					border-radius: 8px;
					margin-bottom: 16px;
					&--noimg{
						.content{
							padding: 16px;
						}
					}
					.banner{
						img{
							max-width: 100%;
							width: 100%;
						}
					}
					.content{
						padding: 8px 16px 16px;
						.title{
							line-height: 20px;							
							color: #217461;	
							margin-bottom: 8px;						
						}
						.data{
							font-weight: normal;
							font-size: 12px;
							line-height: 14px;
							color: #969696;
							margin-bottom: 8px;						
						}
						.text{
							font-weight: 300;
							font-size: 16px;
							line-height: 19px;							
							color: #1F1F1F;
						}
					}
				}
				&__link{
					font-weight: 500;
					font-size: 16px;
					line-height: 19px;
					text-decoration-line: underline;
					color: #217461;
				}
			}
		}
		&--footer{
			margin-top: 32px;
			.footer{
				&__head{
					background: #217461;
					padding: 16px 16px 23px 16px;
					.title{
						line-height: 25px;
						color:#fff;
					}
					.button--green{
						margin-top: 24px;
						display: block;
					}
				}
				&__bottom{
					padding: 16px;
					background: #262626;
					.copyright{
						display: flex;
						span{
							font-weight: 300;
							font-size: 16px;
							line-height: 16px;
							text-align: right;
							color: #FFFFFF;
						}
						img{
							margin-left: 8px;
							margin-top: 1px;
						}
						&:hover{
							text-decoration: none;
						}
					}
				}
			}
		}
	}
</style>
