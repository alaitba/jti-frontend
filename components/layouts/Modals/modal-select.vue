<template>
	<!-- modal for auth error -->
    <!-- Отказано в доступе! -->
    <div 
        class="modal fade modal-auth-denied" 
        id="modal-select" 
        data-backdrop="static" 
        data-keyboard="false"
    >
        <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content">                          
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="head">                
                        <div class="head__content" style="padding:0">
                            <p>
                                Визитов в неделю
                            </p>
                        </div>                    
                    </div>                   
                    <div class="body">
                        <div class="options">
                            <div :class="{'options__item': true, 'active': checkArrayData('Пн')}">
                                <label class="checkbox-container">
                                    Понедельник
                                    <input type="checkbox" value="Пн" v-model="checkedDays">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div :class="{'options__item': true, 'active': checkArrayData('Вт')}">
                                <label class="checkbox-container">
                                    Вторник
                                    <input type="checkbox" value="Вт" v-model="checkedDays">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div :class="{'options__item': true, 'active': checkArrayData('Ср')}">
                                <label class="checkbox-container">
                                    Среда
                                    <input type="checkbox" value="Ср" v-model="checkedDays">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div :class="{'options__item': true, 'active': checkArrayData('Чт')}">
                                <label class="checkbox-container">
                                    Четверг
                                    <input type="checkbox" value="Чт" v-model="checkedDays">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div :class="{'options__item': true, 'active': checkArrayData('Пт')}">
                                <label class="checkbox-container">
                                    Пятница
                                    <input type="checkbox" value="Пт" v-model="checkedDays">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>              
                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="button button--green" data-dismiss="modal" @click="saveData()">
                        Готово
                    </button>
                    <button type="button" class="button button--bordered green" data-dismiss="modal" @click="closeModal()">
                        Отмена
                    </button>             
                </div>              
            </div>
        </div>
    </div>
</template>

<script>
  
    export default {
        props: ['number', ],
        filters: {
            formatNumber (value){
                return value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
            }
        },
        data(){
            return {
                checkedDays: [],
            }
        },  
        computed:{      
        },
        methods:{
            checkArrayData(value){ 
                // console.log(value);
                return this.checkedDays.indexOf(value) > -1
            },      
            saveData(){
                localStorage.setItem('checkedDays', JSON.stringify(this.checkedDays));
                this.$store.commit('setCheckedDays', this.checkedDays);        
                this.$nuxt.$emit('setDays','dsds');
                this.checkedDays = [];        
            },
            closeModal(){
                this.$nuxt.$emit('setDefault', 'dsds')
            }      
        }
    }

</script>

<style lang="scss">
    
</style>