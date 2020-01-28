<template>
	<main class="page page--white page--df">
		<div class="container">
			<h3 class="section__title  section__title--link">
				<nuxt-link to="/news">
					Новости
				</nuxt-link>	
			</h3>
			<div class="news-item">
				<div class="news-item__banner">
					<img src="~/assets/img/news/12.png" alt="">
				</div>
				<div class="news-item__content">
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
	</main>
</template>
<script>
	export default{
		mounted(){
			console.log('route',this.$route)
		}
	}
</script>
<style lang="scss">
	.page--white{
		flex-direction: column;
	}
	.page--df{
		display: flex;
	    flex-direction: column;
	    justify-content: space-between;
	}
	.section{
		&__title{
			margin-top: 16px;
		}
	}
	.news-item{
		margin-top: 16px;
		&__banner{
			img{
				max-width: 100%;
				border-radius: 8px;
			}
		}
		&__content{
			margin-top: 8px;
			.title{
				color: #217461;
				line-height: 1.05;
			}
			.data{
				font-weight: normal;
				font-size: 12px;
				line-height: 14px;
				color: #969696;
				margin-bottom: 0;
				margin-top: 4px;
			}
			.text{
				font-weight: 300;
				font-size: 16px;
				line-height: 19px;
				color: #000000;
				margin-top: 8px;
			}
		}
	}
</style>