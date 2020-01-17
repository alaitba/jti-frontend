<template>
	<!-- modal for auth error -->
    <!-- Отказано в доступе! -->
    <div class="modal fade modal-draw-sign" id="modal-draw-sign">
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">                          
          <!-- Modal body -->
          <div class="modal-body">
              <div class="head">
                <p class="title">
                  Подпись покупателя
                </p>      
              </div>                   
              <div class="body">
                <canvas id="signature-pad"></canvas>
              </div>
          </div>              
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="button button--green" @click="savePng()">
              Поставить подпись
            </button>
          </div>              
        </div>
      </div>
    </div>
</template>

<script>
  
  export default {
    data() {
      return {
        signaturePad: '',
        data: '',
      }
    },
    // props: ['number'],
    // filters: {
    //   formatNumber (value){
    //     return value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
    //   }
    // }
    mounted(){
      var canvas = document.getElementById('signature-pad');
      this.signaturePad = new SignaturePad(canvas,{
        penColor: "rgb(0, 0, 0)",
        backgroundColor: 'rgb(240, 240, 240)'
      });
    },
    methods:{
      savePng(){
        if (this.signaturePad.isEmpty()) {
          return alert("Please provide a signature first.");
        }
        this.data = this.signaturePad.toDataURL('image/png');
        this.$nuxt.$emit('Save',this.data);
        // console.log(this.data);
        $('#modal-draw-sign').modal('hide');
      }
    }
  }
</script>

<style lang="scss"> 
  
</style>