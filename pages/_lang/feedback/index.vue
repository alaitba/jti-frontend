<template>
	<main class="page page--flex page--grey">
  		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="feedback">
				<div class="container">
					<h3 class="section__title gifts__title">
						{{$t('Обратная связь')}}
					</h3>

					<div class="feedback-name">
						<div class="feedback__title">
							<p>
								{{$t('Выберите тему для обращения')}}
							</p>
						</div>
						<div class="feedback-name__wrapper" v-if="feedback.length">
							<div class="feedback-name__item" v-for="(item, key) in feedback">
								<!-- <nuxt-link
									:to="{name: 'feedback-id', params: {'id': item.id},query: {'title' : item.title}}"
								> -->
								<nuxt-link
	    							:to="$i18n.path(`feedback/${item.id}?title=${item.title[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]}`)"
	    						>
									<p class="title">
										{{item.title[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]}}
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

					<div class="feedback-answers" v-if="answers.length">
						<div class="feedback__title">
							<p>
								{{$t('Ответы')}}
							</p>
						</div>
						<div class="feedback-answers__wrapper">
							<div class="feedback-answers__item" v-for="(item, key) in answers">
								<template v-if="item.answer">
									<!-- <nuxt-link
										:to="{name: 'feedback-answer', params: {'answer': item.question},query: {'title' : item.topic_all.title, 'answer' : item.answer}}"
									> -->
									<nuxt-link
										:to="$i18n.path(`feedback/answer?title=${item.topic_all.title[$i18n.locale === 'kk' ? 'kz' : $i18n.locale]}&question=${item.question}&answer=${item.answer}`)"
									>
										<p class="title">
											{{$t('Ответ получен')}}
										</p>
										<p class="data">
											{{item.created_at | formatData}}
										</p>
										<p class="text" v-if="item.answer != null">
											{{item.answer | truncateText(40, '...')}}
										</p>
										<p class="link">
											{{$t('Посмотреть ответ')}}
										</p>
									</nuxt-link>
								</template>
								<template v-else>
									<p class="title">
										{{$t('Ожидает ответа')}}
									</p>
									<p class="data">
										{{item.created_at | formatData}}
									</p>
									<p class="text" v-if="item.question">
										{{item.question | truncateText(40, '...')}}
									</p>
									<!-- <p class="text" v-if="item.answer != null">
										{{item.answer | truncateText(40, '...')}}
									</p>
									<p class="text" v-else>
										ответ не получен
									</p> -->
								</template>
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
				a{
					&:hover{
						text-decoration: none;
					}
				}
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
				a{
					&:hover{
						text-decoration: none;
					}
				}
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
					&.link{
						font-weight: 500;
						font-size: 16px;
						line-height: 19px;
						text-decoration-line: underline;
						color: #05B186;
						margin-top: 16px;
						margin-bottom: 0px;
					}
				}
			}
		}
	}
</style>
