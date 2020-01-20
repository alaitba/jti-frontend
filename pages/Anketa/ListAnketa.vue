<template>
	<main class="page">		
		<div class="anketa">
			<div class="container">
				<div class="anketa__head">
					<h3 class="anketa__title">
						Мои анкеты
					</h3>
					<span class="amount">
						Анкет: 3
					</span>
				</div>			
				<div class="anketa__wrapper">
					<div class="item">
						<div class="item__content">
							<p class="title">
								+7 775 156 85 20
							</p>
							<p class="info">
								Сохранена 20.12.2019
							</p>
						</div>
						<div class="item__status">
							<p class="points">
								+50 баллов
							</p>
							<div class="status status--active">
								<img src="~/assets/img/icons/anketa/status_active.svg" alt="">
							</div>
						</div>
					</div>
					<div class="item">
						<div class="item__content">
							<p class="title">
								+7 775 156 85 20
							</p>
							<p class="info">
								Сохранена 20.12.2019
							</p>
						</div>
						<div class="item__status">
							<p class="points">
								+50 баллов
							</p>
							<div class="status status--filled">
								<img src="~/assets/img/icons/anketa/status_filled.svg" alt="">
							</div>
						</div>
					</div>
					<div class="item">
						<div class="item__content">
							<p class="title">
								+7 775 156 85 20
							</p>
							<p class="info">
								Сохранена 20.12.2019
							</p>
						</div>
						<div class="item__status item__status--waiting">
							<div class="status status--waiting">
								<img src="~/assets/img/icons/anketa/status_waiting.svg" alt="">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer-anketa/>
	</main>
</template>
<script>
	import FooterAnketa from '~/components/layouts/Footer/Footer.vue'
	export default {
		components:{
			FooterAnketa,
		}
	}
</script>

<style lang="scss">
	main.page{
		background: #F9F9F9;		
	}
	.anketa{
		padding: 16px 0 20px;
		height: 100vh;
		width: 100%;
		&__head{
			// padding: 0 16px;
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			margin-bottom: 8px;
			.amount{
				font-weight: 300;
				font-size: 16px;
				line-height: 19px;
				text-align: right;
				color: #969696;
			}
		}
		&__title{
			line-height: 33px;			
			color: #969696;
		}

		&__wrapper{
			margin: 0 -16px;
			.item{
				padding: 16px;
				background-color: #fff;
				display: flex;
				justify-content: space-between;
				position: relative;				
				&:after{
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					margin: 0 auto;
					height: 1px;
					width: 87%;
					background: #F0F0F0;
				}
				&__content{
					.title{
						font-weight: 500;
						font-size: 16px;
						line-height: 19px;						
						color: #1F1F1F;
						margin-bottom: 10px;
					}
					.info{
						font-weight: normal;
						font-size: 12px;
						line-height: 14px;						
						color: #969696;
						margin-bottom: 0;
					}
				}
				&__status{
					&--waiting{
						display: flex;
						align-items:flex-end;
					}
					.points{
						font-weight: 500;
						font-size: 16px;
						line-height: 19px;
						text-align: right;
						color: #05B186;
						margin-bottom: 10px;
					}
					.status{						
						&--active,&--filled, &--waiting{
							text-align: right;
							img{
								max-width: 100%;
							}
						}
					}
				}
			}
		}
	}
</style>