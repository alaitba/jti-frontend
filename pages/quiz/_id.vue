<template>
	<main class="page page--flex page--grey">
  		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="quiz-inside">
				<div class="container">
					<h3 class="section__title  section__title--link black" @click="$router.go(-1)">
						Викторина — новая линейка!		
					</h3>
					<div class="questions" v-if="questions">						
						<div v-for="(item, index) in questions" v-show="questionIndex == index">
							<!-- <div class="questions__banner">
								<img src="~/assets/img/quiz/1.png" alt="">
							</div> -->
							<!-- <div class="questions__index">
								Вопрос {{index + 1}} из {{questions.length}}
							</div> -->
							<div class="questions__title">
								{{
									item.title
								}}
							</div>
							<div class="options" v-if="item.responses">
								<template v-for="(response, key) in item.responses">
									<div :class="{'options__item options__item--radio': true, 'active': userResponses[index] == response.correct}">
		                                <label class="radiobutton-container">
		                                    <input 
		                                    	type="radio" 
		                                    	:value="response.correct"
		                                    	v-model="userResponses[index]" 		                                    	
		                                    >
		                                    <span class="checkmark"></span>
		                                    <p class="title">						
												{{
													response.text													
												}}												
											</p>									
		                                </label>
		                            </div>		
	                            </template>					
							</div>
							<div class="questions__сontrols">
								<button class="button button--green" :disabled="userResponses[index] ==''" @click="next">
									Следующий вопрос
								</button>
							</div>
						</div>
						<div class="questions__result" v-if="questionIndex == questions.length">
							Результат:  {{score()}} из {{userResponses.length}}
						</div>
					</div>
				</div>
			</div>
		</template>		
	</main>
</template>
<script>
	export default{
		data(){
			return {
				loaderStatus: false,
				selected: '',
				questionIndex:0,
				userResponses: [],
				questions: [
				  	{
				      	title: "Вопрос для викторины может быть любой длинны, потому что это вопрос для викторины 1?",
				      	responses: [
				        	{text: 'Вариант ответа 1.', correct: 'one', key: 1}, 
				        	{text: 'Right!', correct: 'two', key:'2'}, 
				        	{text: 'Вариант ответа 3, где вариант может достигать нескольних строк', correct: 'three', key: 3}, 
				        	{text: 'Вариант ответа 4, где вариант может достигать нескольних строк, а может и больше !',correct: 'four',  key: 4}, 
				      	]
				    }, 
				    {
				      	title: "Вопрос для викторины может быть любой длинны, потому что это вопрос для викторины 2?",
				      	responses: [
				        	{text: 'Вариант ответа 1.', correct: 'one', key: 1}, 
				        	{text: 'Right!', correct: 'two', key:'2'}, 
				        	{text: 'Вариант ответа 3, где вариант может достигать нескольних строк', correct: 'three', key: 3}, 
				        	{text: 'Вариант ответа 4, где вариант может достигать нескольних строк, а может и больше !',correct: 'four',  key: 4}, 
				      	]
				    }, 
				    {
				      	title: "Вопрос для викторины может быть любой длинны, потому что это вопрос для викторины 3?",
				      	responses: [
				        	{text: 'Вариант ответа 1.', correct: 'one', key: 1}, 
				        	{text: 'Right!', correct: 'two', key:'2'}, 
				        	{text: 'Вариант ответа 3, где вариант может достигать нескольних строк', correct: 'three', key: 3}, 
				        	{text: 'Вариант ответа 4, где вариант может достигать нескольних строк, а может и больше !',correct: 'four',  key: 4}, 
				      	]
				    }, 
				    {
				      	title: "Вопрос для викторины может быть любой длинны, потому что это вопрос для викторины 4?",
				      	responses: [
				        	{text: 'Вариант ответа 1.', correct: 'one', key: 1}, 
				        	{text: 'Right!', correct: 'two', key:'2'}, 
				        	{text: 'Вариант ответа 3, где вариант может достигать нескольних строк', correct: 'three', key: 3}, 
				        	{text: 'Вариант ответа 4, где вариант может достигать нескольних строк, а может и больше !',correct: 'four',  key: 4}, 
				      	]
				    } 
				]
			}
		},
		mounted(){
			console.log('name: ', this.$route.name);
			this.userResponsesLength();
		},
		methods:{
			next(){
				this.questionIndex ++;
			},
			userResponsesLength(){
				this.userResponses = Array(this.questions.length).fill(false);				
			},
			score(){

		      return this.userResponses.filter(function(val) { return val=='two' }).length;
		    }
		},
		computed:{
			
		}
	}
</script>
<style lang="scss">
	.quiz-inside{
		padding: 16px 0 64px 0;
		.questions{
			margin-top: 16px;
			&__banner{
				margin: 0 -16px;
				img{
					width: 100%;
					max-width: 100%;
				}
			}
			&__index{
				margin-top: 8px;
				font-weight: normal;
				font-size: 12px;
				line-height: 14px;				
				color: #969696;
			}
			&__title{
				font-weight: 500;
				font-size: 16px;
				line-height: 19px;
				color: #000000;
				margin-top: 10px;
				margin-bottom:16px;
			}
			&__сontrols{
				margin-top: 24px;
				.button--green{
					margin-top: 0;
				}
			}
		}
	}
</style>