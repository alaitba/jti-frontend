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
									Текущие
								</a>
							</li>
						  	<li class="nav-item">
								<a class="nav-link" data-toggle="pill" href="#menu">
									Пройденные
								</a>
							</li>
						</ul>
					</div>

					<h3 class="section__title section__title--profile">
						Викторины
					</h3>
					<div class="quiz-wrapper">
						<div class="quiz-item">
							<!-- <nuxt-link :to="{name : 'quiz-id', params: {id : 1}}"> -->
								<div class="quiz-item__banner">
									<img src="~/assets/img/news/1.png" alt="">
								</div>
								<div class="quiz-item__content">
									<h4 class="title">
										Викторина — новая линейка!
									</h4>
									<p class="data">
										30.12.2019 — 31.02.2019
									</p>
									<p class="text">
										Бонус: 200тг на баланс
									</p>
									<!-- <button class="button button--green quiz">
										Пройти викторину
									</button> -->
									<nuxt-link :to="{name : 'quiz-id', params: {id : 1}}" class="button button--green quiz">
										Пройти викторину
									</nuxt-link>
								</div>
							<!-- </nuxt-link> -->
						</div>
						<div class="quiz-item">
							<!-- <nuxt-link :to="{name : 'quiz-id', params: {id : 1}}"> -->
								<!-- <div class="quiz-item__banner">
									<img src="~/assets/img/news/1.png" alt="">
								</div> -->
								<div class="quiz-item__content no-banner">
									<h4 class="title">
										Викторина — новая линейка!
									</h4>
									<p class="data">
										30.12.2019 — 31.02.2019
									</p>
									<p class="text">
										Бонус: 200тг на баланс
									</p>
									<!-- <button class="button button--green quiz">
										Пройти викторину
									</button> -->
									<nuxt-link :to="{name : 'quiz-id', params: {id : 1}}" class="button button--green quiz">
										Пройти викторину
									</nuxt-link>
								</div>
							<!-- </nuxt-link> -->
						</div>
					</div>
				</div>
			</div>
		</template>
  	</main>
</template>

<script>
	export default {
		data(){
			return {
				loaderStatus : false
			}
		}
	}
</script>


<style lang="scss">
	.quiz{
		padding: 16px 0 64px 0;
		width: 100%;	
		&-wrapper{
			margin-top: 8px;
		}
		&-item{
			position: relative;			
			margin-bottom: 16px;
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