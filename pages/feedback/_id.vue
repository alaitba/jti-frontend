<template>
	<main class="page page--flex page--grey">
  		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="feedback-inside">
				<div class="container">
					<h3 class="section__title  section__title--link" @click="$router.go(-1)">
						{{$route.query.title}}
					</h3>

					<!-- <div class="feedback-inside_title">
						<p>
							
						</p>
					</div> -->

					<div class="feedback-inside__form">
						<form @submit.prevent="sendFeedback">
							<div class="form-group">
								<label for="" class="title__label">
					            	Введите ваше сообщение
					            </label>

					            <textarea 
					            	class="form__textarea" 
					            	name="" 
					            	id="" 
					            	cols="30" 
					            	rows="5"
					            	v-model="inputText"
					            >
								
								</textarea>

								<button class="button button--green" type="submit" :disabled="!inputText.length">
									Отправить
								</button>
							</div>														
						</form>
					</div>
				</div>
			</div>
		</template>
		<modal-main :title="title" :text="text" :img="img" :btnText="btnText" ></modal-main>
	</main>
</template>

<script>
	export default{
		data(){
			return {
				loaderStatus: true,
				inputText: '',
				title: '',
				text: '',
				img: '',
				btnText: ''
			}
		},
		mounted(){
			// console.log('params:', this.$route.params)
			// console.log('query:', this.$route.query)
			this.loaderStatus  = !this.loaderStatus;
		},
		methods:{

			sendFeedback(){

				this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');


				let field = {
					'feedback_topic_id': this.$route.params.id,
					'question': this.inputText,
				}
				try{

					let res = this.$axios.$post('/feedback/question', field);

					// console.log('res: ', res);


					this.title = 'Сообщение отправлено!'

					this.text = 'Спасибо за вашу обратную связь, как только администратор ответит на ваш вопрос, вы получите уведомление'

					this.img = 'exist'

					this.btnText = 'feedback'

					$('#modal-main').modal('show')

				} catch(error){

					console.log('error:', error)

					this.title = 'Сообщение нет отправлено!'

					this.text = 'Попробуйте позже'

					this.img = 'error'

					this.btnText = 'feedback';

					$('#modal-main').modal('show')
				}
			}
		}
	}
</script>

<style lang="scss">
	.feedback{
		&-inside{
			padding: 16px 0 64px 0;
			width: 100%;
			&__form{
				margin-top: 24px;
				.form{
					&-group{
						.title__label{
							margin-bottom: 16px;
						}
					}
					&__textarea{

					}
				}
				.button-green{
					margin-top: 32px;	
				}
			}
		}
	}
</style>