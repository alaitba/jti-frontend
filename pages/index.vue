<template>
  <main class="page page--block page--grey">
    <!-- <div class="container"> -->
    	<div class="section section--main">
    		<div class="main-slider">
    			<!-- <div class="container"> -->
    				<!-- <swiper :options="swiperOption" ref="mySwiper">
    					<swiper-slide>
    						<img src="~assets/img/gifts/inside/1.png" alt="">
    					</swiper-slide>
					    <swiper-slide>
					    	<img src="~assets/img/gifts/inside/1.png" alt="">
					    </swiper-slide>
					    <swiper-slide>
					    	<img src="~assets/img/gifts/inside/1.png" alt="">
					    </swiper-slide>
					    <swiper-slide>
					    	<img src="~assets/img/gifts/inside/1.png" alt="">
					    </swiper-slide>
					    <div class="swiper-pagination" slot="pagination"></div>
    				</swiper> -->
    			<!-- </div> -->
    		</div>
    	</div>
    	<div class="section section--icons">
    		<div class="container">
    			<div class="icons">
    				<div class="icons__item" @click="showModal()">
    					<div class="img">
    						<img src="~/assets/img/icons/links/plan.svg" alt="">
    					</div>
    					<div class="title">
    						План закупок
    					</div>
    				</div>
    				<div class="icons__item">
    					<nuxt-link to="/anketa/createanketa">
	    					<div class="img">
	    						<img src="~/assets/img/icons/links/new.svg" alt="">
	    					</div>
	    					<div class="title">
	    						Анкеты
	    					</div>
	    				</nuxt-link>
    				</div>
    				<div class="icons__item">
    					<nuxt-link to="/anketa/gifts">
	    					<div class="img">
	    						<img src="~/assets/img/icons/links/gift.svg" alt="">
	    					</div>
	    					<div class="title">
	    						Призы
	    					</div>
	    				</nuxt-link>
    				</div>
    				<div class="icons__item" @click="showModal()">
    					<div class="img">
    						<img src="~/assets/img/icons/links/agent.svg" alt="">
    					</div>
    					<div class="title">
    						Агент+
    					</div>
    				</div>
    				<div class="icons__item" @click="showModal()">
    					<div class="img">
    						<img src="~/assets/img/icons/links/quiz.svg" alt="">
    					</div>
    					<div class="title">
    						Викторины
    					</div>
    				</div>
    				<div class="icons__item" @click="showModal()">
    					<div class="img">
    						<img src="~/assets/img/icons/links/profile.svg" alt="">
    					</div>
    					<div class="title">
    						Профиль
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    	<div class="section section--news">
    		<div class="container">
    			<h3 class="section__title">
    				Новости
    			</h3>
    			<div class="news">
    				<!-- div class="news__item news__item--noimg">    					
    					<div class="content">
    						<h4 class="title">
	    						Встречайте новую уникальную программу специально для наших партнеров!
	    					</h4>
	    					<p class="data">
	    						03.01.2020
	    					</span>
	    					<div class="text">
	    						С 03 февраля 2020 года покупайте больше продукции LD с красной лентой, регистрируйте потребителей и получайте крутые призы от наших Торговых представителей!
	    					</div>
    					</div>    					
    				</div> -->
    				<div class="news__item news__item--noimg">
    					<nuxt-link :to="{name: 'news-id', params:{id: '1'}}">
	    					<div class="banner">
	    						<img src="~/assets/img/news/12.png" alt="">
	    					</div>
	    					<div class="content">
	    						<h4 class="title">
		    						Призы можно заказывать только через веб-приложение «Partner 360».  
		    					</h4>
		    					<p class="data">
		    						10.01.2020
		    					</span>
		    					<div class="text">
		    						С 03 февраля 2020 года покупайте больше продукции LD с красной лентой, регистрируйте потребителей и получайте крутые призы от наших Торговых представителей!
	 
									Вас ждут много интересных призов: термокружки, пледы, зонты, сертификаты, беспроводные наушники, мультиварки, футболки и другие. 
									 
									А еще специально для вас каждую неделю вас ждут еженедельные розыгрыши призов как смартфоны, телевизоры и стиральные машины. 
									Для участия в них достаточно к моменту розыгрыша заработать минимум 100 баллов.
									 
									Главный приз финального розыгрыша – автомобиль Camry 70!							

		    					</div>
	    					</div>    
	    				</nuxt-link>					
    				</div>
    				<!-- <div class="news__item news__item--noimg">
    					<div class="banner">
    						<img src="~/assets/img/news/2.png" alt="">
    					</div>
    					<div class="content">
    						<h4 class="title">
	    						Главный приз финального розыгрыша – автомобиль Camry 70!
	    					</h4>
	    					<p class="data">
	    						30.12.2019
	    					</p>
	    					<div class="text">
	    						марка сигарет, выпускаемая компаниями R.J. Reynolds Tobacco Company
	    					</div>
    					</div>    					
    				</div> -->

    				<div class="news__all">
    					<!-- <nuxt-link class="news__link" to="/news">
    						Все новости
    					</nuxt-link> -->
    					<nuxt-link to="/news" class="news__link">
    						Все новости
    					</nuxt-link>
    				</div>
    			</div>
    		</div>
    	</div>
    	<div class="section section--footer">
    		<div class="footer">    			
    			<div class="footer__head">
    				<div class="container">
	    				<h4 class="title">
	    					JTI Partner 360
	    				</h4>
	    			</div>
    				<!-- <nuxt-link class="button button--green" to="/faq">
    					Обратная связь
    				</nuxt-link> -->
    			</div>
    			<div class="footer__bottom">
    				<div class="container">
	    				<a href="https://ibecsystems.com/ru#/" target="_blank" class="copyright">
	    					<span>
	    						Разработано в
	    					</span>
	    					<img src="~/assets/img/icons/ibec_systems_logo.svg" alt="">
	    				</a>
	    			</div>
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
    	<modal-error/>
  </main>
</template>

<script>
	import ModalError from '~/components/layouts/Modals/ModalError.vue'
	import {mapState, mapMutations} from 'vuex'
	export default {
	  	components: {
	      ModalError,      
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
	    methods:{
	    	showModal(){
	    		// alert('asdasd')
	    		$('#modal-error').modal('show')
	    	}	
	    }
	}
</script>

<style lang="scss">	
	.section{
		&__title{
			line-height: 33px;			
			color: #969696;
		}
		&--icons{
			padding-top: 16px;
			.icons{
				display: flex;
				flex-wrap:wrap;
				&__item{
					cursor: pointer;
					background: #FFFFFF;
					border: 1px solid #217461;
					box-sizing: border-box;
					border-radius: 8px;
					padding: 16px 11px;
					text-align: center;
					width: calc((100% - 16px)/3);
					height: 100%;
					margin-bottom: 8px;
					&>a{
						&:hover{
							text-decoration: none;
						}
					}
					&:nth-child(2),&:nth-child(5){
						margin: 0 8px 8px 8px;
					}
					.img{
						max-width: 100%;
						margin-bottom: 4px;
					}
					.title{
						font-weight: normal;
						font-size: 12px;
						line-height: 14px;
						text-align: center;
						color: #217461;							
						@media screen and (max-width: 359px) {
							font-size: 10px;
							line-height: 12px;		
						}				
						@media screen and (max-width: 320px) {
							font-size: 9px;
							line-height: 11px;		
						}						
					}
				}
			}
		}
		&--news{
			// padding-top: 32px;	
		}		
	}
</style>
