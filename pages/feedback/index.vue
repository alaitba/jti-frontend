<template>
	<main class="page page--flex page--grey">
  		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="feedback">
				<div class="container">
					<h3 class="section__title gifts__title">
						Обратная связь
					</h3>					

					<div class="feedback-name">
						<div class="feedback__title">
							<p>
								Выберите тему для обращения
							</p>
						</div>	
						<div class="feedback-name__wrapper" v-if="feedback.length">
							<div class="feedback-name__item" v-for="(item, key) in feedback">
								<nuxt-link 
									:to="{name: 'feedback-id', params: {'id': item.id},query: {'title' : item.title}}"
									>
									<p class="title">
										{{item.title}}
									</p>
								</nuxt-link>
							</div>
							
							<!-- <div class="feedback-name__item">
								<nuxt-link>
									<p class="title">
										Предложения
									</p>
								</nuxt-link>
							</div> -->
						</div>
					</div>	

					<div class="feedback-answers" v-if="answers">
						<div class="feedback__title">
							<p>
								Ответы
							</p>
						</div>	
						<div class="feedback-answers__wrapper">
							<div class="feedback-answers__item" v-for="(item, key) in answers">
								<nuxt-link :to="{name: 'feedback-answer', params: {'answer': item.question},query: {'title' : item.topic_all.title, 'answer' : item.answer}}">
									<p class="title">
										{{item.question}}
									</p>
									<p class="data">
										{{item.created_at | formatData}}
									</p>
									<p class="text" v-if="item.answer != null">
										{{item.answer | truncateText(40, '...')}}
									</p>
									<p class="text" v-else>
										ответ не получен
									</p>
								</nuxt-link>
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
		filters: {
			formatData(value) {
		    	return moment(value).format('DD.MM.YYYY');
		    },
		    truncateText(text,stop,clamp){
				return text.slice(0,stop) +  (stop < text.length ? clamp || '...' : '');
			}
		},
		data() {
			return {
				loaderStatus: true,
				title: 'example',
				feedback: [],
				answers: [],
				text : 'Мы отправим к вам нашего специалиста в ближайшее время для устранения данной неполадкиМы отправим к вам нашего специалиста в ближайшее время для устранения данной неполадкиМы отправим к вам нашего специалиста в ближайшее время для устранения данной неполадкиМы отправим к вам нашего специалиста в ближайшее время для устранения данной неполадки'
			}
		},
		mounted(){

			this.getFeedback();

			this.getFeedbackAnswers();
		},
		methods:{
			async getFeedback(){

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

				try {

					let res = await this.$axios.$get('/feedback/topics');

					this.feedback = res.data;

					this.loaderStatus = !this.loaderStatus;

					// console.log('res: ', res)

				} catch(error){
					console.log(error)
				}

			},

			async getFeedbackAnswers(){

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

				try {

					let res = await this.$axios.$get('/feedback/list');

					this.answers  = res.data;

					// console.log('res: ', this.answers)

				} catch(error) {

					console.log(error)
				}

			}


		}
	}
</script>

<style lang="scss">
	.feedback{
		width: 100%;
		padding: 16px 0 84px 0;
		&__title{
			margin-top: 24px;
			margin-bottom: 16px;
			p{
				font-weight: 300;
				font-size: 16px;
				line-height: 19px;
				color: #1F1F1F;
				margin-bottom: 0;				
			}
		}
		&-name{
			&__item{
				padding: 16px;
				background-color: #fff;
				border-radius: 8px;
				margin-bottom: 8px;
				cursor: pointer;
				.title{
					font-weight: 500;
					font-size: 16px;
					line-height: 19px;
					color: #217461;
					margin-bottom: 0;
					position: relative;
					&:after{
						content: '';
						position: absolute;
						top: 0;
						bottom: 0;
						right: 0;
						left: auto;
						width: 12px;
						height: 20px;
						background: url('~assets/img/icons/backlink.svg');
						margin: auto;
						transform: rotate(180deg)
					}
				}
			}
		}
		&-answers{
			margin-top: 32px;
			.feedback__title{
				margin-top: 0px;
			}
			&__item{
				background-color: #fff;
				border-radius: 8px;
				margin-bottom: 8px;
				padding: 16px;
				cursor: pointer;
				p{
					margin-bottom: 4px;
					&.title{
						font-weight: 500;
						font-size: 16px;
						line-height: 19px;						
						color: #217461;
					}
					&.data{
						font-weight: normal;
						font-size: 12px;
						line-height: 14px;
						color: #969696;
					}
					&.text{
						font-weight: 300;
						font-size: 16px;
						line-height: 19px;
						color: #1F1F1F;
						margin-bottom: 0;
					}
				}
			}
		}
	}
</style>