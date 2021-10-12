//mascara al input de precio
$("#price").on({
  "focus": function (event) {
      $(event.target).select();
  },
  "keyup": function (event) {
      $(event.target).val(function (index, value ) {
          return value.replace(/\D/g, "")
                      .replace(/([0-9])([0-9]{2})$/, '$1.$2')
                      .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
      });
  }
});

function bloqueoModal(event,modal,opcion){
  if (modal == '') {
      modal = 'bloquear-modal';
    }
   
    var block_ele = event.target.closest("."+modal);
   
    // si la variable 'no' es 1 bloquea la card
    if (opcion==1) {
        $(block_ele).block({ 
          
          message: 'Espere...',
          css: {
            border: 0,
            hover:'wait',
            padding: 0,
            cursor: 'wait',
            color:'white',
            backgroundColor: 'transparent'
        } ,
       
          overlayCSS: {
              backgroundColor: '#000000',
              opacity: 0.8,
              

          }
        
        });
    }else{// si la variable 'no' es diferente de 1 desbloquea la card
      $(block_ele).unblock();
    }
      
}