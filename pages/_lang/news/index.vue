<template>
  	<main class="page page--flex page--grey">
  		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
	    	<div class="section section--news">
	    		<div class="container">
	    			<h3 class="section__title">
	    				{{$t('Новости')}}
	    			</h3>
	    			<div class="news" v-if="news">
	    				<template v-if="news.length>0">
	    					<template v-for="(item, key) in news">

	    						<div :class="{'news__item' : true, 'news__item--noimg': item.media.length==0}">
		    						<nuxt-link :to="$i18n.path(`news/${item.id}`)">
			    						<div class="banner" v-if="item.media.length">
				    						<img :src="item.media[0].url" alt="">
				    					</div>
				    					<div class="content">
				    						<div class="content">
                                            <template v-if="item.title[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]">
                                                <h4 class="title" v-if="item.title">
                                                    {{item.title[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]}}
                                                </h4>
                                            </template>
                                            <template v-else>
                                                <h4 class="title" v-if="item.title">
                                                    {{item.title['ru']}}
                                                </h4>
                                            </template>
                                            <p class="data" v-if="item.created_at">
                                                {{ item.created_at | formatData}}
                                            </p>
                                            <template v-if="item.contents[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]">
                                                <div class="text" v-if="item.contents" v-html="item.contents[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]"></div>
                                            </template>
                                            <template v-else>
                                                <div class="text" v-if="item.contents" v-html="item.contents['ru']"></div>
                                            </template>
                                        </div>
				    					</div>
				    				</nuxt-link>
		    					</div>
	    					</template>
	    				</template>
	    				<!-- <div class="news__item news__item--noimg">
	    					<nuxt-link :to="{name: 'news-id', params: {id: 1}}">
		    					<div class="content">
		    						<h4 class="title">
			    						Встречайте новую уникальную программу специально для наших партнеров!
			    					</h4>
			    					<p class="data">
			    						03.01.2020
			    					</p>
			    					<div class="text">
			    						С 03 февраля 2020 года покупайте больше продукции LD с красной лентой, регистрируйте потребителей и получайте крутые призы от наших Торговых представителей!
			    					</div>
		    					</div>
		    				</nuxt-link>
	    				</div> -->
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
    	<modal-error/>
  	</main>
</template>

<script>
	import ModalError from '~/components/layouts/Modals/ModalError.vue'
	import {mapState, mapMutations} from 'vuex'
	import moment from 'moment'
	export default {
	  	components: {
	      ModalError,
	    },
	    filters:{
	    	truncateText(text,stop,clamp){
				return text.slice(0,stop) +  (stop < text.length ? clamp || '...' : '');
			},
			formatData(value){
	    		return moment(value).format('DD.MM.YYYY');
	    	},
	    },
	    data() {
	    	return {
	    		loaderStatus: true,
	    		text : "С 03 февраля 2020 года покупайте больше продукции LD с красной лентой, регистрируйте потребителей и получайте крутые призы от наших Торговых представителей! Вас ждут много интересных призов: термокружки, пледы, зонты, сертификаты, беспроводные наушники, мультиварки, футболки и другие. А еще специально для вас каждую неделю вас ждут еженедельные розыгрыши призов как смартфоны, телевизоры и стиральные машины. Для участия в них достаточно к моменту розыгрыша заработать минимум 100 баллов.Главный приз финального розыгрыша – автомобиль Camry 70!",
	    		news: [],
	    	}
	    },
	    mounted(){
	    	this.getNews();
	    },
	    computed: {

	    },
	    methods:{
	    	showModal(){
	    		// alert('asdasd')
	    		$('#modal-error').modal('show')
	    	},
	    	async getNews(){


	    		let data  = localStorage.getItem("news").length>2 ? JSON.parse(localStorage.getItem("news"))[0].created_at : 1;

	    		this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

	    		await this.$axios.get('/news?from_date=' + data)
	    			.then(response =>{
	    				console.log('get:',response.data.data);

	    				let arr = Object.values(response.data.data);

	    				// console.log('before:', Object.values(response.data.data))

	    				// arr = arr.sort((a,b) => {
	    				// 	return moment(b.created_at) - moment(a.created_at)
	    				// });


	    				if(localStorage.getItem("news")){
	    					localStorage.setItem("news", JSON.stringify(JSON.parse(localStorage.getItem("news")).concat(arr)));
	    				} else {
	    					localStorage.setItem("news", JSON.stringify(arr));
	    				}

	    				let newArr = JSON.parse(localStorage.getItem("news"));

	    				if(newArr){
	    					newArr = newArr.sort((a,b) => {
		    					return moment(b.created_at) - moment(a.created_at)
		    				});
	    				}	    				

	    				this.news = newArr;

	    				localStorage.setItem("news", JSON.stringify(newArr));

	    				this.loaderStatus = false;

	    			}).catch(error =>{
	    				console.log('error news')
	    			})
	    	}
	    }
	}
</script>

<style lang="scss">
	.page{
		&--flex{
		    flex-direction: column;
		    justify-content: space-between;
		}
	}
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
			padding-top: 16px !important;
			iframe{
				width: 100%;
			}
		}

	}
</style>
