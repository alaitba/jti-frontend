<template>
	<!-- <div> -->
		<div class="ring">
		  <span></span>
		</div>
	<!-- </div> -->
</template>

<style scoped>
	body{
	/*   background: #fff; */
	}

	.ring{
	  width: 60px;
	  height: 60px;
	  border: 2px solid #05B186;
	  background: transparent;
	  text-align: center;
	  line-height: 60px;
	  border-radius: 50%;
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%,-50%);
	  color: #05B186;
	  font-size: 20px;
	  text-shadow: 0 0 10px #fff;
	/*   box-shadow: 0 0 20px rgba(0,0,0,.5); */
	}
	/*.ring:before {
	  box-sizing: content-box;
	  content: '';
	  width: 100%;
	  height: 100%;
	  position: absolute;	    
	  border: 3px solid transparent; 
	  border-top: 3px solid #05B186;  
	  border-right: 3px solid #05B186;
	  border-radius: 50%;
	  top: -3px;
	  left: -3px;
	  animation: animateCircle 2s linear infinite;
	}*/
	span{
	  display: block;
	  background: transparent;
	  position: absolute;
	  width: 50%;
	  height: 4px;
	  left: 50%;
	  top: calc(50% - 2px);
	  transform-origin: left;  
	  animation: animate 1.7s linear infinite;
	}

	span:before{
	  content:'';
	  position: absolute;
	  width: 8px;
	  height: 8px;
	  background: #05B186;
	  border-radius: 50%;
	  top: -5px;
	  right: -5px;
	  /*box-shadow: 0 0 20px #05B186;*/
	}
	@keyframes animateCircle {
	  0%{
	    transform: rotate(0deg);
	  }
	  100%{
	    transform: rotate(360deg);
	  }
	}@keyframes animate {
	  0%{
	    transform: rotate(45deg);
	  }
	  100%{
	    transform: rotate(405deg);
	  }
	}
</style>