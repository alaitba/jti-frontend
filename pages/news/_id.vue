<template>
	<main class="page page--white page--df">
		<div class="container">
			<h3 class="section__title  section__title--link" @click="$router.go(-1)">
				Назад				
			</h3>
			<div class="news-item" v-if="newsItem.length && newsItem[$route.params.id]">
				<div class="news-item__banner" v-if="newsItem[$route.params.id].media.length">
					<img :src="newsItem[$route.params.id].media[0].url" alt="">
				</div>
				<div class="news-item__content">
					<h4 class="title" v-if="newsItem[$route.params.id].title">
						{{newsItem[$route.params.id].title.ru}}
					</h4>
					<p class="data" v-if="newsItem[$route.params.id].created_at">
						{{newsItem[$route.params.id].title | formatData}}
					</span>
					<div class="text" v-if="newsItem[$route.params.id].contents" v-html="newsItem[$route.params.id].contents.ru">			
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
	import moment from 'moment'
	export default{

		filters:{
	    	formatData(value){
	    		return moment(value).format('DD.MM.YYYY');
	    	},
	    	truncateText(text,stop,clamp){
				return text.slice(0,stop) +  (stop < text.length ? clamp || '...' : '');
			}
	    },
		data(){
			return {
				newsItem: JSON.parse(localStorage.getItem("news"))
			}
		},
		mounted(){
			console.log('route',this.$route.params.id)
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
		padding-bottom: 100px;
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