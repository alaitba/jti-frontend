<template>
	<div>
		<main class="page page--grey page--block qrcode" >
			<div class="container">
				<div class="section section--condition">
					<h3 class="section__title">
						QR-код
					</h3>
					<div class="content">
						<div class="qrcode__content">
							<div class="qrcode__img">
								
								<div class="qrcode__loader">
									<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
								</div>
								<img  load="" src="https://api.qrserver.com/v1/create-qr-code/?data=Example " alt="">

							</div>

							<div class="qrcode__btn" @click="qrModal = true">
								Зачем нужен мой QR-код?
							</div>
						</div>

						<p class="qrcode__text">
							Данным QR-кодом могут воспользоваться только потребители табачных изделий, достигшие 21 года. QR-код не должен передаваться или демонстрироваться любым другим лицам
						</p>
					</div>
				</div>
			</div>

			<div class="qrcode__modal-wrap" v-if="qrModal"  @click="qrModal = false">
				<div class="qrcode__modal">

					<h5>
						Заголовок
					</h5>

					<p>
						Для сохранения анкеты заполните все поля. 
						Для сохранения анкеты заполните все поля. 
						Для сохранения анкеты заполните все поля. 
						Для сохранения анкеты заполните все поля. 
						Для сохранения анкеты заполните все поля. 
						Для сохранения анкеты заполните все поля. 
						Для сохранения анкеты заполните все поля. 
						Для сохранения анкеты заполните все поля. 
						Для сохранения анкеты заполните все поля. 
						Для сохранения анкеты заполните все поля. 
					</p>


					<div class="qrcode__modal-close"  @click="qrModal = false">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M18 6L6 18" stroke="#05B186" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M6 6L18 18" stroke="#05B186" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
				</div>


			</div>
		</main>
		<footer-anketa/>
	</div>
</template>
<script>
	import FooterAnketa from '~/components/layouts/Footer/Footer.vue'
	export default {
		data() {
			return {
				qrModal: false,
			}
		},
		components:{
			FooterAnketa,
		}
	}
</script>
<style lang="scss">
	.qrcode {
		&__text{
			font-size: 12px;
			line-height: 14px;
			text-align: center;
			color: #1F1F1F;
			max-width: 542px;
			margin: auto;
		}

		&__content {
			background: #fff;
			padding: 48px 0 40px;
			margin-bottom: 24px;
		}

		&__img {
			min-width: 207px;
			max-width: 400px;
			min-height: 207px;
			max-height: 400px;
			width: calc(100% - 120px);
			display: block;
			margin: auto;
			position: relative;

			&:after {
				content: '';
				padding-top: 100%;
				display: block;
			}

			img {
				min-width: 207px;
				max-width: 400px;
				min-height: 207px;
				max-height: 400px;
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
			}


		}

		&__modal {
			    background: #fff;
				min-width: 320px;
				max-width: 400px;
				width: calc(100% - 30px);
				padding: 40px 28px 75px;
				position: relative;
				
				h5 {
					font-family: Open Sans;
					font-style: normal;
					font-weight: bold;
					font-size: 18px;
					line-height: 25px;
					/* identical to box height */


					/* Text Color */

					margin-bottom: 4px;
					color: #1F1F1F;
				}

				p {
					font-family: Roboto;
					font-style: normal;
					font-weight: 300;
					font-size: 16px;
					line-height: 19px;

					/* Text Color */
					text-align: left;
					color: #1F1F1F;
				}
			&-wrap {
				position: fixed;
				width: 100%;
				height: 100%;
				background: rgba(133, 130, 130, 0.5);
				top: 0;
				left: 0;
				z-index: 20;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			&-close {
				position: absolute;
				top: 14px;
				right: 14px;
			}
		}

		&__loader {
			width: 80px;
			height: 80px;
			position: absolute;
			top: calc(50% - 40px);
			left: calc(50% - 40px);
		}

		&__btn {
			font-family: Roboto;
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 19px;
			margin-top: 32px;

			text-align: center;
			text-decoration-line: underline;

			/* Secondary Green */

			color: #217461;
		}
		.lds-spinner {
			color: official;
			display: inline-block;
			position: relative;
			width: 80px;
			height: 80px;
			}
			.lds-spinner div {
			transform-origin: 40px 40px;
			animation: lds-spinner 1.2s linear infinite;
			}
			.lds-spinner div:after {
			content: " ";
			display: block;
			position: absolute;
			top: 3px;
			left: 37px;
			width: 6px;
			height: 18px;
			border-radius: 20%;
			background: #217461;
			}
			.lds-spinner div:nth-child(1) {
			transform: rotate(0deg);
			animation-delay: -1.1s;
			}
			.lds-spinner div:nth-child(2) {
			transform: rotate(30deg);
			animation-delay: -1s;
			}
			.lds-spinner div:nth-child(3) {
			transform: rotate(60deg);
			animation-delay: -0.9s;
			}
			.lds-spinner div:nth-child(4) {
			transform: rotate(90deg);
			animation-delay: -0.8s;
			}
			.lds-spinner div:nth-child(5) {
			transform: rotate(120deg);
			animation-delay: -0.7s;
			}
			.lds-spinner div:nth-child(6) {
			transform: rotate(150deg);
			animation-delay: -0.6s;
			}
			.lds-spinner div:nth-child(7) {
			transform: rotate(180deg);
			animation-delay: -0.5s;
			}
			.lds-spinner div:nth-child(8) {
			transform: rotate(210deg);
			animation-delay: -0.4s;
			}
			.lds-spinner div:nth-child(9) {
			transform: rotate(240deg);
			animation-delay: -0.3s;
			}
			.lds-spinner div:nth-child(10) {
			transform: rotate(270deg);
			animation-delay: -0.2s;
			}
			.lds-spinner div:nth-child(11) {
			transform: rotate(300deg);
			animation-delay: -0.1s;
			}
			.lds-spinner div:nth-child(12) {
			transform: rotate(330deg);
			animation-delay: 0s;
			}
			@keyframes lds-spinner {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
	}
</style>
