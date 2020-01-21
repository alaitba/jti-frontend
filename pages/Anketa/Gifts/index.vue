<template>
	<main class="page page--flex">
		<div class="gifts">
			<div class="container">
				<h3 class="section__title gifts__title">
					Призы
				</h3>
				<div class="gifts__points points">
					<p>
						Количество баллов: 
						<span>
							0	
						</span>
					</p>
				</div>
				<div class="gifts__wrapper">
					<div class="item" v-for="(item,key) in gifts">
						<div class="item__img">
							<img :src="item.url" alt="">
						</div>
						<div class="item__content">
							<h4 class="title">
								{{item.points}} <span>баллов</span>
							</h4>
							<p class="text">
								{{item.name}}
							</p>
							<p class="left" v-if="item.left!=null">
								Осталось штук: {{item.left}}
							</p>
							<button class="link" to="/" @click="showModal()">
								Получить приз
							</button>	
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer-anketa/>
		<modal-error/>
	</main>
</template>
<script>
	import FooterAnketa from '~/components/layouts/Footer/Footer.vue'
	import ModalError from '~/components/layouts/Modals/ModalError.vue'
	export default {
		components:{
			FooterAnketa,
			ModalError
		},
		data(){
			return {
				gifts:[
					{
						name: 'Беспроводные наушники Xiaomi',
						points: 600,
						left: 250,
						url: '/gifts/0.png'
					},
					{
						name: 'Пополнение баланса ',
						points: 200,
						left: null,
						url: '/gifts/1.png'
					},
					{
						name: 'Чайник Vitek',
						points: 500,
						left: 400,
						url: '/gifts/2.png'
					},
					{
						name: 'Мультиварка Redmond',
						points: 800,
						left: 340,
						url: '/gifts/3.png'
					},
					{
						name: 'Утюг Maxwell',
						points: 600,
						left: 400,
						url: '/gifts/4.png'
					},
					{
						name: 'Power-bank Xiaomi',
						points: 350,
						left: 600,
						url: '/gifts/5.png'
					},
					{
						name: 'Сертификат Технодом на 5000 тг',
						points: 250,
						left: 500,
						url: '/gifts/6.png'
					}
				]
			}
		},
		methods:{
			showModal(modal){
				$('#modal-error').modal('show')
			}
		}
	}
</script>
<style lang="scss">
	main.page{
		
	}
	.points{
		margin-top: 16px;
	}
	.gifts{
		padding: 16px 0 120px 0;
		&__wrapper{
			.item{
				display: flex;
				background: #FFFFFF;
				margin-top: 8px;
				box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 4px 8px rgba(0, 0, 0, 0.04);
				border-radius: 8px;
				padding: 8px;
				&__img{
					img{
						// max-width: 100%;
						max-height: 121px;
					}
				}
				&__content{
					margin-left: 16px;
					.title{
						margin-top: 8px;
						line-height: 25px;
					}
					.text{
						font-weight: 300;
						font-size: 16px;
						line-height: 19px;						
						color: #1F1F1F;
						margin-bottom: 0;
					}
					.left{
						font-weight: normal;
						font-size: 12px;
						line-height: 14px;
						color: #969696;
						margin-bottom: 5px;
					}
					.link{
						font-weight: bold;
						font-size: 14px;
						line-height: 16px;						
						color: #05B186;
						background: transparent;
						box-shadow: none;
						border:0;
						&:hover{
							text-decoration: none;
						}
					}
				}
			}
		}
	}
</style>
