<template>	
	<main class="page page--flex page--grey">
  		<template v-if="loaderStatus">
			<loader/>
		</template>
		<template v-else>
			<div class="answer-inside">
				<div class="container">
					<h3 class="section__title  section__title--link" @click="$router.go(-1)">
						Ответы
					</h3>

					<div class="answer-inside__block answer-inside__block--admin">
						<p class="subtitle">
							Ответ от администрации
						</p>
						<p class="text" v-if="$route.query.answer!=null">
							{{$route.query.answer}}
						</p>
						<p class="text" v-else>
							ответ не получен
						</p>
					</div>

					<div class="answer-inside__block answer-inside__block--user">
						<p class="subtitle">
							Ваше сообщение
						</p>
						<p class="title">
							{{$route.query.title}}
						</p>
						<p class="text">
							{{$route.params.answer}}
						</p>
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
				loaderStatus: false,
			}
		},
		mounted(){
			// console.log('params', this.$route.params);
			// console.log('query', this.$route.query);
		}

	}
</script>

<style lang="scss">
	.answer-inside{
		padding: 16px 0 64px 0;

		&__block{
			&--admin{
				margin-top: 24px;	
			}
			&--user{
				margin-top: 40px;
			}
			p{
				&.title{
					font-weight: 500;
					font-size: 16px;
					line-height: 19px;					
					color: #1F1F1F;
					margin-bottom: 8px;
				}
				&.subtitle{
					font-weight: normal;
					font-size: 12px;
					line-height: 14px;
					color: #217461;
					margin-bottom: 8px;
				}
				&.text{
					font-weight: 300;
					font-size: 16px;
					line-height: 19px;
					color: #1F1F1F;
				}

			}			
		}
	}
</style>