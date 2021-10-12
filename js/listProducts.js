var contenedorTabla=document.getElementById("bodyTablaProductos");
var idOrden=localStorage.getItem('idOrder');
var data=JSON.parse(localStorage.getItem('datos'));

$(document).ready(function(){

  $("#labelNoOrden").html('No.Orden: ' + localStorage.getItem('noOrder'));

 //Creacion de spinner mientras la pagina carga los datos 
  contenedorTabla.innerHTML=`
     <div class="col-lg-12 col-md-12 col-sm-12 p-3">
       <span >Cargando...</span>
       <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
     </div>
     `;
  
  listProducts();

  $("#formAddProducto").submit(function(e){
     addProduct(e);
  })
  
  $("#btnPay").click(function(){
     showAlert();
  })

})
 
//Obtener la lista de productos de cada orden
function listProducts(){

  for (let orden of Object.values(data)) {
   
    if(orden.id==idOrden){
      tablaProducts(orden.items);
     
    }
}
}

//Creacion de la tabla con la informacion de los productos
function tablaProducts(json){
 
  let data=json;
  contenedorTabla.innerHTML ='';

    if(data.length===0){
      contenedorTabla.innerHTML =`
      
      <div class="col-lg-12 col-md-12 col-sm-12 text-center bg-white p-3">
        No hay registros
      </div>
    `;
    }else{

          for(let producto of data){

            contenedorTabla.innerHTML +=`
             <tr>
               <td>${producto.sku==null ? 'No asignado' : producto.sku}</td>
               <td>${producto.name}</td>
               <td>${producto.quantity}</td>
               <td>$${producto.price}</td>
             </tr>       
             `;
  
         }
        
  }
}

//Alerta de proceso exitoso
function showAlert(){
  Swal.fire({
    icon: 'success',
    title: '¡Muy bien!',
    text: 'Proceso exitoso',
    background: '#FFFF00',
    timer: 4000 ,
    showConfirmButton: false
  })
}

//Funcion para agregar un producto en la orden
function addProduct(e){
  e.preventDefault();
  bloqueoModal(e, 'bloquear-card', 1);
  
  //Obtenemos valores de formulario y lo ponemos en json
  var jsonData=$(e.target).serializeArray()
 .reduce(function(a, z) { a[z.name] = z.value; return a; }, {});

  for (let orden of Object.values(data)) {
     let json=orden.items;

     if(orden.id==idOrden){
       let id=orden.id;

       setTimeout(function() {
         bloqueoModal(e, 'bloquear-card', 2);
         json.push(jsonData);
         localStorage.setItem('datos', JSON.stringify(data,(id)));
         $("#formAddProducto")[0].reset();
         tablaProducts(json);
       }, 2000);
      
     }
 }
}