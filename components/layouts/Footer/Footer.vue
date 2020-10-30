<template>
	<div class="footer">
		<div class="container">
			<div class="footer__wrapper">
				<div class="footer__item">
					<nuxt-link :to="$i18n.path('anketa/createanketa')" class="">		
						<div class="footer__icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path class="path" d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#969696" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path class="path" d="M14 2V8H20" stroke="#969696" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path class="path path--light" d="M12 18V12" stroke="#969696" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path class="path path--light" d="M9 15H15" stroke="#969696" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
						<div class="footer__title">
							{{$t('Создать')}}
						</div>
					</nuxt-link>
				</div>

				<div class="footer__item"  v-if="phoneNumber == '+77059521623' ||  phoneNumber == '+77085222707' || phoneNumber == '+77471748557'">
					<nuxt-link :to="$i18n.path('anketa/qrcode')" class="">		
						<div class="footer__icon">
							<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path class="path path--light" d="M14.6667 22H12.2222V19.5556H14.6667V22ZM12.2222 13.4444H9.77778V19.5556H12.2222V13.4444ZM22 11H19.5556V15.8889H22V11ZM19.5556 8.55556H17.1111V11H19.5556V8.55556ZM4.88889 11H2.44444V13.4444H4.88889V11ZM2.44444 8.55556H0V11H2.44444V8.55556ZM11 2.44444H13.4444V0H11V2.44444ZM1.83333 1.83333V5.5H5.5V1.83333H1.83333ZM7.33333 7.33333H0V0H7.33333V7.33333ZM1.83333 16.5V20.1667H5.5V16.5H1.83333ZM7.33333 22H0V14.6667H7.33333V18.3333V22ZM16.5 1.83333V5.5H20.1667V1.83333H16.5ZM22 7.33333H14.6667V0H22V7.33333ZM19.5556 19.5556V15.8889H14.6667V18.3333H17.1111V22H22V19.5556H19.5556ZM17.1111 11H12.2222V13.4444H17.1111V11ZM12.2222 8.55556H4.88889V11H7.33333V13.4444H9.77778V11H12.2222V8.55556ZM13.4444 7.33333V4.88889H11V2.44444H8.55556V7.33333H13.4444ZM4.58333 2.75H2.75V4.58333H4.58333V2.75ZM4.58333 17.4167H2.75V19.25H4.58333V17.4167ZM19.25 2.75H17.4167V4.58333H19.25V2.75Z" fill="#969696"/>
							</svg>

						</div>
						<div class="footer__title">
							QR-код
						</div>
					</nuxt-link>
				</div>				

				<div class="footer__item">
					<nuxt-link :to="$i18n.path('anketa/listanketa')">	
						<div class="footer__icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path class="path" d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#969696" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path class="path" d="M14 2V8H20" stroke="#969696" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path class="path path--light" d="M16 13H8" stroke="#969696" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path class="path path--light" d="M16 17H8" stroke="#969696" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path class="path path--light" d="M10 9H9H8" stroke="#969696" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
						<div :class="{'footer__title': true, 'kz' : $i18n.locale === 'kk'}">
							{{$t('Мои анкеты')}}
						</div>
					</nuxt-link>
				</div>
				<div class="footer__item">
					<nuxt-link :to="$i18n.path('anketa/gifts')">	
						<div class="footer__icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path class="path path--fill" d="M20.8457 11.2319V21.9017H3.18175V11.2319H1.53601V22.7245C1.53601 23.179 1.90435 23.5474 2.35885 23.5474H21.6686C22.1231 23.5474 22.4914 23.179 22.4914 22.7245V11.2319H20.8457Z" fill="#969696"/>
								<path class="path path--fill" d="M23.1772 5.06006H0.822844C0.368344 5.06006 0 5.4284 0 5.8829V11.2589C0 11.7134 0.368344 12.0817 0.822844 12.0817H23.1771C23.6316 12.0817 24 11.7136 24 11.2589V5.8829C24 5.4284 23.6317 5.06006 23.1772 5.06006ZM22.3543 10.4363H1.64573V6.70607H22.3543V10.4363H22.3543Z" fill="#969696"/>
								<path class="path path--light-fill path--light" d="M12.8097 5.67503C12.7537 5.46165 11.3963 0.452637 7.43312 0.452637C5.70896 0.452637 4.30627 1.85532 4.30627 3.57948C4.30627 5.30364 5.69663 6.70632 7.4057 6.70632H12.0137C12.2685 6.70632 12.5094 6.58811 12.6651 6.38622C12.8209 6.18433 12.8741 5.92159 12.8097 5.67503ZM7.40574 5.06064C6.59059 5.06064 5.95201 4.41001 5.95201 3.57948C5.95201 2.77665 6.63034 2.09832 7.43317 2.09832C9.23879 2.09832 10.32 3.87709 10.8398 5.06059H7.40574V5.06064Z" fill="#969696"/>
								<path class="path path--light-fill path--light" d="M16.5943 0.452637C12.6311 0.452637 11.2737 5.46165 11.2177 5.67503C11.153 5.92159 11.2065 6.18437 11.3623 6.38626C11.5181 6.58815 11.7586 6.70637 12.0137 6.70637H16.6217C18.3308 6.70637 19.7211 5.30368 19.7211 3.57953C19.7212 1.85532 18.3185 0.452637 16.5943 0.452637ZM16.6217 5.06064H13.1844C13.7004 3.87709 14.7783 2.09837 16.5946 2.09837C17.3974 2.09837 18.0758 2.7767 18.0758 3.57953C18.0757 4.41001 17.4372 5.06064 16.6217 5.06064Z" fill="#969696"/>
								<path class="path path--light-fill path--light" d="M13.5 6H10.5V23.543H13.5V6Z" fill="#969696"/>
							</svg>
						</div>
						<div class="footer__title">
							{{$t('Призы')}}
						</div>
					</nuxt-link>
				</div>
				<div class="footer__item">
					<nuxt-link :to="$i18n.path('anketa/conditions')">	
						<div class="footer__icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path class="path path--light" d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="#969696" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<path class="path" d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="#969696" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>

						</div>
						<div class="footer__title">
							{{$t('Условия')}}
						</div>
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.footer{
		position: fixed;
		width: 100%;
		bottom:0;
		left: 0;
		background: #fff;
		z-index: 9;
		&__wrapper{
			display: flex;
			flex-wrap: wrap;
		} 
		&__item{
			width: 20%;
			padding: 10px 8px;		
			text-align: center;	
			&>a{
				text-decoration: none;
			}
		}
		&__img{
			max-width: 100%;			
		}
		&__title{
			font-weight: normal;
			font-size: 12px;
			line-height: 14px;			
			text-align: center;
			color: #969696;
			&.kz{
			    word-break: break-all;
			}
			@media screen and (max-width: 370px) {
				font-size: 11px;
				line-height: 12px;		
			}				
			@media screen and (max-width: 320px) {
				font-size: 9px;
				line-height: 11px;		
			}						
		}
		.nuxt-link-exact-active,.nuxt-link-active{
			.footer{
				&__icon{
					svg{
						.path{
							stroke: #217461;
							&--fill{
								fill: #217461;
							}
							&--light-fill{
								fill: #05B186;	
							}
							&--light{
								stroke: #05B186;
							}							
						}
						
						&.path{

						}
					}
				}
				&__title{
					color: #217461;
				}
			}
		}
	}
</style>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
	computed: {
		    ...mapState({
		      phoneNumber: state => state.number,
		    }),
		},
}
</script>