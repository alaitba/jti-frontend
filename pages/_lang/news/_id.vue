<template>
	<main class="page page--white page--df">
		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="container">
				<h3 class="section__title  section__title--link" @click="$router.go(-1)">
					{{$t('Назад')}}
				</h3>
				<div class="news-item" v-if="newsItem">
					<div class="news-item__banner" v-if="newsItem.media.length">
						<img :src="newsItem.media[0].url" alt="">
					</div>
					<div class="news-item__content">
                        <template v-if="newsItem.title[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]">
                            <h4 class="title" v-if="newsItem.title">
                                {{newsItem.title[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]}}
                            </h4>
                        </template>
                        <template v-else>
                            <h4 class="title" v-if="newsItem.title">
                                {{newsItem.title['ru']}}
                            </h4>
                        </template>
						<!-- <h4 class="title" v-if="newsItem.title">
							{{newsItem.title[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]}}
						</h4> -->
						<p class="data" v-if="newsItem.created_at">
							{{newsItem.title | formatData}}
						</p>
						<template v-if="newsItem.contents[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]">
                            <div class="text" v-if="newsItem.contents" v-html="newsItem.contents[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]">
                            </div>
                        </template>
                        <template v-else>
                            <div class="text" v-if="newsItem.contents" v-html="newsItem.contents['ru']">
                            </div>
                        </template>
					</div>
				</div>
				<div class="news-item" v-else>
					<!-- <div class="news-item__content">
						<h4 class="title">
							Такой новости не существует
						</h4>
					</div> -->
				</div>
			</div>
			<div class="section section--footer">
	    		<div class="footer">
	    			<div class="footer__head">
	    				<div class="container">
		    				<h4 class="title">
		    					JTI Partner 360
		    				</h4>

		    				<nuxt-link :to="$i18n.path('feedback')" class="button button--green">
		    					{{$t('section-footer-title')}}
		    				</nuxt-link>
		    			</div>
	    			</div>
	    			<div class="footer__bottom">
	    				<div class="container">
		    				<a href="https://ibecsystems.com/ru#/" target="_blank" class="copyright">
		    					<span>
		    						{{$t('section-footer-author')}}
		    					</span>
		    					<img src="~/assets/img/icons/ibec_systems_logo.svg" alt="">
		    				</a>
		    			</div>
	    			</div>
	    		</div>
	    	</div>
	    </template>
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
				loaderStatus: true,
				newsItem : ''
			}
		},
		mounted(){			
			this.getNewsItem(this.$route.params.id)
		},
		methods:{
			getNewsItem(id){
				console.log('id: ',id);
				let arr = localStorage.getItem("news") ? JSON.parse(localStorage.getItem("news")) : [];
				for(let i = 0 ; i < arr.length; i++){

					if(arr[i].id == id){

						this.newsItem = arr[i];
					}
				}				
				this.loaderStatus = false;
			}
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
				max-height: 100%;
				width: 100%;
				border-radius: 8px;
			}
		}
		&__content{
			margin-top: 8px;
			iframe{
				width: 100%;
			}
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
				img{
				    max-width: 100%;
				    height: auto;
				    display: flex;
				    margin: auto;
				    /* justify-content: center; */
				    /* align-items: center; */
				}
			}
		}
	}
</style>
