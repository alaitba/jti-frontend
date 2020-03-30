<template>
  	<main class="page page--flex page--grey">
  		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="quiz">
				<div class="container">
					<div class="navigation-menu">
						<ul class="nav nav-pills">
							<li class="nav-item">
								<a class="nav-link active" data-toggle="pill" href="#home">
									{{$t('Текущие')}}
								</a>
							</li>
						  	<li class="nav-item">
								<a class="nav-link" data-toggle="pill" href="#menu">
									{{$t('Пройденные')}}
								</a>
							</li>
						</ul>
					</div>


					<div class="navigation-content tab-content">
						<div class="tab-pane fade active" id="home">
							<h3 class="section__title section__title--profile">
								{{$t('Викторины')}}
							</h3>
							<div class="quiz-wrapper" v-if="quizzes.length">
								<template v-for="(item, key) in quizzes">
									<div class="quiz-item">
										<nuxt-link :to="$i18n.path(`quiz/${item.id}`)">
											<div class="quiz-item__banner" v-if="item.photo">
												<img :src="item.photo" alt="">
											</div>
											<div :class="{'quiz-item__content' : true, 'no-banner' : !item.photo}">
												<h4 class="title" v-if="item.title">
													{{item.title[$i18n.locale ==='kk' ? 'kz' : 'ru']}}
												</h4>
												<p class="data" v-if="item.period">
													{{item.period}}
												</p>
												<p class="text" v-if="item.amount && item.amount!=0">
													Бонус: {{item.amount}}тг
												</p>
												<!-- <button class="button button--green quiz">
													Пройти викторину
												</button> -->
												<nuxt-link :to="$i18n.path(`quiz/${item.id}`)" class="button button--green quiz" v-if="item.type == 'poll'">
													{{$t('Пройти опрос')}}
												</nuxt-link>
												<nuxt-link :to="$i18n.path(`quiz/${item.id}`)" class="button button--green quiz" v-if="item.type == 'quiz'">
													{{$t('Пройти викторину')}}
												</nuxt-link>
											</div>
										</nuxt-link>
									</div>
								</template>
							</div>
							<div class="quiz-wrapper" v-else>
								<h4 class="error-subtitle">
									{{$t('Пока нет опубликованных викторин')}}
								</h4>
							</div>
						</div>
						<div class="tab-pane" id="menu">
							<h3 class="section__title section__title--profile">
								{{$t('Пройденные викторины ')}}
							</h3>
							<div class="quiz-wrapper" v-if="quizzesHistory.length">
								<template v-for="(item, key) in quizzesHistory">
									<div class="quiz-item">
										<!-- <nuxt-link :to="{name : 'quiz-id', params: {id : item.id}}"> -->
											<div class="quiz-item__banner" v-if="item.photo">
												<img :src="item.photo" alt="">
											</div>
											<div :class="{'quiz-item__content' : true, 'no-banner' : !item.photo}">
												<h4 class="title" v-if="item.title">
													{{item.title[$i18n.locale ==='kk' ? 'kz' : 'ru']}}
												</h4>
												<p class="data" v-if="item.completed_at">
													{{item.completed_at | formatData}}
												</p>
												<p class="text" v-if="item.amount && item.amount!=0">
													Бонус: {{item.amount}}тг {{$t('на баланс')}}
												</p>
												<!-- <button class="button button--green quiz">
													Пройти викторину
												</button> -->
												<!-- <nuxt-link :to="{name : 'quiz-id', params: {id : item.id}}" class="button button--green quiz">
													Пройти викторину
												</nuxt-link> -->
											</div>
										<!-- </nuxt-link> -->
									</div>
								</template>
							</div>
							<div class="quiz-wrapper" v-else>
								<h4 class="error-subtitle">
									{{$t('У вас пока нет пройденных викторин')}}
								</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
  	</main>
</template>

<script>
	export default {
		filters:{
			formatData(value){
				return moment(value).format('DD.MM.YYYY');
			}
		},
		data(){
			return {
				loaderStatus : true,
				quizzes: '',
				quizzesHistory: ''
			}
		},
		mounted(){

			this.getQuizzes();

			// this.getQuizzesHistory();
		},
		methods:{

			async getQuizzes(){

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

				try{

					let res = await this.$axios.$get('/quiz/all');

					this.quizzes = res.current;

					this.quizzesHistory = res.history;

					this.loaderStatus = false;


				}  catch(error){

					console.log('errorQuiz: ', error)
				}
			},

			// async getQuizzesHistory(){

			// 	this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

			// 	try{

			// 		let res = await this.$axios.$get('/quiz/history');

			// 		this.quizzesHistory = res.quizzes;

			// 		this.loaderStatus = false;


			// 	}  catch(error){

			// 		console.log('errorQuiz: ', error)
			// 	}
			// }
		}
	}
</script>


<style lang="scss">
	.quiz{
		padding: 0px 0 64px 0;
		width: 100%;
		// margin-top: 84px;
		&-wrapper{
			margin-top: 8px;
		}
		&-item{
			position: relative;
			margin-bottom: 16px;
			cursor: pointer;
			a{
				&:hover{
					text-decoration: none;
				}
			}
			&__banner{
				overflow: hidden;
				border-radius: 8px 8px 0 0;
				img{
					width: 100%;
					max-width: 100%;
				}
			}
			&__content{
				background-color: #fff;
				padding: 8px 16px 16px;
				box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 4px 8px rgba(0, 0, 0, 0.04);
				border-radius: 0 0 8px 8px;
				&.no-banner{
					border-radius: 8px;
					padding-top: 24px;
				}
				.title{
					margin-bottom: 1px;
					@media screen and (max-width: 345px) {
						font-size: 16px;
						line-height: 1.1;
					}
				}
				.data{
					font-weight: normal;
					font-size: 12px;
					line-height: 14px;
					color: #969696;
					margin-bottom: 4px;
				}
				.text{
					font-weight: 300;
					font-size: 16px;
					line-height: 19px;
					color: #1F1F1F;
					margin-bottom: 0px;
				}
				.button--green{
					margin-top: 16px;
				}
			}
		}
	}
</style>
