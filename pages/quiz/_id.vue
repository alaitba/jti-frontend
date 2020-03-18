<template>
	<main class="page page--flex page--grey">
  		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="quiz-inside">
				<div class="container" v-if="questions">
					<h3 class="section__title  section__title--link black" @click="$router.go(-1)" v-if="questions.title">
						{{questions.title.ru}}
					</h3>
					<div class="questions" v-if="questions.questions.length">						
						<div v-for="(item, index) in questions.questions" v-show="questionIndex == index">
							<div class="questions__banner" v-if="item.photo != null ">
								<img :src="item.photo" alt="">
							</div>
							<div class="questions__index">
								Вопрос {{index + 1}} из {{questions.questions.length}}
							</div>
							<div class="questions__title" v-if="item.question">
								{{
									item.question.ru
								}}
							</div>
							<template v-if="questions.type == 'poll' && item.type == 'choice'">
								<div class="options" v-if="item.answers">
									{{item.selected}}
									<template v-for="(response, key) in item.answers">
										<div :class="{'options__item options__item--radio': true, 'active': checkArrayData(response.id, item.selected)}">
			                                <label class="radiobutton-container">
			                                    <input 
			                                    	type="checkbox" 
			                                    	:value="response.id"
			                                    	v-model="item.selected" 		                                    	
			                                    >
			                                    <span class="checkmark"></span>
			                                    <p class="title">						
													{{
														response.answer.ru													
													}}											
												</p>									
			                                </label>
			                            </div>		
		                            </template>					
								</div>
							</template>							
							<template v-else-if="questions.type == 'poll' && item.type == 'text'">
								{{item.selected}}
								<div class="form">
									<label for="" class="title__label">
						              	Введите номер телефона
						            </label>
						            <div class="form-group">									
										<input type="text" class="form__input" placeholder=" " v-model="item.selected">
										<label for="input" class="form__label">
						                	Введите ответ
						                </label>
									</div>
								</div>															
							</template>
							

							<template v-else-if="questions.type == 'quiz'">
								{{item.selected}}
								<div class="options" v-if="item.answers">
									<template v-for="(response, key) in item.answers">
										<div :class="{'options__item options__item--radio': true, 'active': item.selected == response.id}">
			                                <label class="radiobutton-container">
			                                    <input 
			                                    	type="radio" 
			                                    	:value="response.id"
			                                    	v-model="item.selected" 		                                    	
			                                    >
			                                    <span class="checkmark"></span>
			                                    <p class="title">						
													{{
														response.answer.ru																	
													}}											
												</p>									
			                                </label>
			                            </div>		
		                            </template>					
								</div>
							</template>

							<div class="questions__сontrols">
								<button class="button button--green" :disabled="item.selected.length < 1" @click="next(item.id,item.selected)" v-if="(questionIndex + 1)  != questions.questions.length">
									Следующий вопрос
								</button>
								<button class="button button--green" :disabled="item.selected.length < 1" @click="next(item.id, item.selected, 'finish')" v-if="(questionIndex + 1)  == questions.questions.length">
									Завершить викторину
								</button>
							</div>
						</div>						
						<!-- <div class="questions__result" v-if="questionIndex == questions.questions.length">
							Результат:  {{score()}} из {{userResponses.length}}
						</div> -->
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
				selected: [],
				questionIndex:0,
				userResponses: [],
				quiz:{
					id: '',
					answers: [],
				},	
				questions: '',
				title:'',
				text:'',
				img:'',
				btnText:''			
				// quiz: [
				//   	{
				//       	title: "Вопрос для викторины может быть любой длинны, потому что это вопрос для викторины 1?",
				//       	answer: '',
				//       	type:'options',
				//       	responses: [
				//         	{text: 'Вариант ответа 1.', correct: 'one', key: 1}, 
				//         	{text: 'Right!', correct: 'two', key:'2'}, 
				//         	{text: 'Вариант ответа 3, где вариант может достигать нескольних строк', correct: 'three', key: 3}, 
				//         	{text: 'Вариант ответа 4, где вариант может достигать нескольних строк, а может и больше !',correct: 'four',  key: 4}, 
				//       	]
				//     }, 
				//     {
				//       	title: "Вопрос для викторины может быть любой длинны, потому что это вопрос для викторины 2?",
				//       	answer: '',
				//       	type:'options',
				//       	responses: [
				//         	{text: 'Вариант ответа 1.', correct: 'one', key: 1}, 
				//         	{text: 'Right!', correct: 'two', key:'2'}, 
				//         	{text: 'Вариант ответа 3, где вариант может достигать нескольних строк', correct: 'three', key: 3}, 
				//         	{text: 'Вариант ответа 4, где вариант может достигать нескольних строк, а может и больше !',correct: 'four',  key: 4}, 
				//       	]
				//     }, 
				//     {
				//       	title: "Вопрос для викторины может быть любой длинны, потому что это вопрос для викторины 3?",
				//       	answer: '',
				//       	type:'options',
				//       	responses: [
				//         	{text: 'Вариант ответа 1.', correct: 'one', key: 1}, 
				//         	{text: 'Right!', correct: 'two', key:'2'}, 
				//         	{text: 'Вариант ответа 3, где вариант может достигать нескольних строк', correct: 'three', key: 3}, 
				//         	{text: 'Вариант ответа 4, где вариант может достигать нескольних строк, а может и больше !',correct: 'four',  key: 4}, 
				//       	]
				//     }, 
				//     {
				//       	title: "Вопрос для викторины может быть любой длинны, потому что это вопрос для викторины 4?",
				//       	answer: '',
				//       	type:'options',
				//       	responses: [
				//         	{text: 'Вариант ответа 1.', correct: 'one', key: 1}, 
				//         	{text: 'Right!', correct: 'two', key:'2'}, 
				//         	{text: 'Вариант ответа 3, где вариант может достигать нескольних строк', correct: 'three', key: 3}, 
				//         	{text: 'Вариант ответа 4, где вариант может достигать нескольних строк, а может и больше !',correct: 'four',  key: 4}, 
				//       	]
				//     },
				//     {
				//       	title: "Вопрос для викторины может быть любой длинны, потому что это вопрос для викторины 4?",
				//       	answer: '',
				//       	type:'input'				      	
				//     }, 
				//     {
				//       	title: "Вопрос для викторины может быть любой длинны, потому что это вопрос для викторины 4?",
				//       	answer: [],
				//       	type:'roll',
				//       	responses: [
				//         	{text: 'Вариант ответа 1.', correct: 'one', key: 1}, 
				//         	{text: 'Right!', correct: 'two', key:'2'}, 
				//         	{text: 'Вариант ответа 3, где вариант может достигать нескольних строк', correct: 'three', key: 3}, 
				//         	{text: 'Вариант ответа 4, где вариант может достигать нескольних строк, а может и больше !',correct: 'four',  key: 4}, 
				//       	]
				//     }, 
				// ]
			}
		},
		mounted(){
			console.log('name: ', this.$route.name);
			// this.userResponsesLength();
			this.$nuxt.$on('tryAgain', this.tryAgain)

			this.getQuestions(this.$route.params.id)
		},
		methods:{
			async next(id, answer, status){
				this.questionIndex ++;
				let item = {
					id: id,
					answer: answer
				}
				console.log('item: ', item)
				this.quiz.answers.push(item);

				if(status == 'finish'){

					await this.checkAnswers();
				}
				console.log('arr: ', this.quiz.answers)
			},
			userResponsesLength(){
				this.userResponses = Array(this.questions.length).fill('');				
			},
			score(){
		      return this.userResponses.filter(function(val) { return val=='two' }).length;
		    },
		    checkArrayData(value, array){ 
                // console.log(value);
                return array.indexOf(value) > -1
            },  

            async tryAgain(){
            	this.questionIndex = 0;
            	this.quiz.answers = [];
            	// this.loaderStatus = false;
            	await this.getQuestions(this.$route.params.id)
            	console.log('again');
            },    
		    async getQuestions(id){

		    	this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

		    	try{

		    		let res = await this.$axios.$get(`/quiz/${id}/get`);

		    		let arr = res.quiz;
		    		for(let i = 0; i< arr.questions.length; i++){
		    			if(arr.type == 'poll'){
		    				if(arr.questions[i].type == 'choice'){
		    					arr.questions[i].selected = []
		    				}else{
		    					arr.questions[i].selected = ''
		    				}
		    			} else if(arr.type == 'quiz'){
		    				arr.questions[i].selected = ''
		    			}
		    		}

		    		this.questions = arr;

		    		console.log('res: ', arr)

		    		this.loaderStatus = false;


		    	} catch(error){

		    		console.log('errorInside', error)
		    	}
		    },
		    async checkAnswers(){

		    	this.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('authToken');

		    	let quiz = {

		    		id : this.$route.params.id,
		    		questions : this.quiz.answers
		    	}
		    		this.loaderStatus = true;
		    		
		    		this.title = 'Результат: 10 из 10'

		    		this.text = 'Поздравляем! Вам будет начислен мобильный баланс за успешное прохождение'

		    		this.img = 'money'

		    		// this.btnText = 'full'

		    		this.btnText = 'again'

		    		$('#modal-main').modal('show');


		    	// try {

		    	// 	let res = await this.$axios.$post('/quiz/check', quiz);


		    	// 	console.log('res: ', res);


		    	// }catch(error){
		    	// 	console.log('error', error)
		    	// }


		    }
		},
		computed:{
			
		}
	}
</script>
<style lang="scss">
	.quiz-inside{
		width: 100%;
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