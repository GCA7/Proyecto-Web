var conti=0;
var conta=0;
var cambio=true;


var LOGIN=LOGIN||
{ 
		//funcion que permite guardar un usuario
    guardarusuario:function() {
     var email = document.getElementById("email").value;
     var contrasena = document.getElementById("contrasena").value;
     debugger;

     if(!document.getElementById('checkterm').checked){

      alert('No has aceptado los terminos de servicio y privacidad');
    }else{

      LOGIN.validarcampos(form_registro);
    }
  },guardardatos:function(email,contrasena)
  {
    //funcion que permite guardar los datos del usuario
    debugger;
    this.email=email;
    this.contrasena=contrasena;


       dato = localStorage.getItem("Login");


       dato = JSON.parse(localStorage.getItem("Login"));

       if(dato==null)
       {
       	var datosLogin=new Array();

       	var date={'User':this.email,'Password':this.contrasena};
       	datosLogin.push(date);
          //Este es para ser el key del localstorage y le envia un arreglo de objetos		
          localStorage.setItem("Login",JSON.stringify(datosLogin));
          window.open("index2.html");
          window.close("registro.html");
        }else
        {

         var date={'User':this.email,'Password':this.contrasena};
         dato.push(date);
        //Este es para ser el key del localstorage y le envia un arreglo de objetos		
        localStorage.setItem("Login",JSON.stringify(dato));
        window.open("index2.html");
        window.close("registro.html");
      }

    },validar:function(email,contrasena){
      //funcion para validar el usuario
      debugger;
      this.email=email;
      this.contrasena=contrasena;
      dato = localStorage.getItem("Login");

      dato = JSON.parse(localStorage.getItem("Login"));

      for (var i = 0; i <dato.length; i++) {
        /*validacion de los usuarios*/
        if(dato[i].User==this.email&&dato[i].Password==this.contrasena){
         LOGIN.useronline();
         window.open("menuprincipal.html");
         window.close("index2.html");
         var logueado=dato[i].User;
         return true;
       }
     }
     alert('[ERROR] Datos incorrectos, favor verificar');
     document.getElementById("email").value="";
     document.getElementById("contrasena").value="";

	//valida el usuario
},Login:function()

{
	debugger;
	var email = document.getElementById("email").value;
	var contrasena = document.getElementById("contrasena").value;

	LOGIN.validar(email,contrasena);

},mostrar:function(){
  //funcion que muestra contenido oculto
  debugger;
  document.getElementById('oculto').style.display = 'block';
  document.getElementById('btnsesion').style.display = 'none';
  document.getElementById('btnregistro').style.display = 'none';

	
},validarcampos:function(){
  //funcion para validar que el usuario llene todos los campos exigidos
	debugger;
	var email = document.getElementById("email").value;
	var contrasena = document.getElementById("contrasena").value;
	var usuario = document.getElementById("usuario").value;
	var mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(document.form_registro.usuario.value=="")
	{ 
		alert("No se pueden Enviar los Datos Por que Falta Rellenar Todos los Campos"); 
		return false; 
	} 
	else if(document.form_registro.contrasena.value=="") 
	{ 
		alert("No se pueden Enviar los Datos Por que Falta Rellenar Todos los Campos"); 
		return false; 
	} 
	else if(!mail.test(email)) 
	{ 
		alert("Error: La dirección de correo " + email + " no es valida");
		return false; 
	}
	else if(document.form_registro.email.value=="")
	{ 
		alert("No se pueden enviar los datos por que falta rellenar todos los campos"); 
		return false; 
	} else 
	{ 
		LOGIN.guardardatos(email,contrasena);
	} 

},useronline:function(){
  //funcion que guarda el usuario que se acaba de loguear
  debugger;
  var ptoconectado = document.getElementById("email").value;
  var enlinea={'online':ptoconectado};
  localStorage.setItem("Online",JSON.stringify(enlinea));

},salidaguardado:function(){
  //funcion para guardar los mensajes de la bandeja de salida
  debugger;
  var destinatario = document.getElementById("paramsj").value;
  var asunto = document.getElementById("asuntomsj").value;
  var contenido = document.getElementById("contenidomsj").value;
  if(LOGIN.validarlightbox()){
    var bandejaborrador=new Array();
    useronline = JSON.parse(localStorage.getItem("Online")).online;
    var correos=JSON.parse(localStorage.getItem("Borradores"));
    var newmsj={'User':useronline,'para':destinatario,'asunto':asunto,'contenido':contenido};
    if(correos===null){
      bandejaborrador.push(newmsj);
      localStorage.setItem("Borradores",JSON.stringify(bandejaborrador));
    }else{
      correos.push(newmsj);  
      localStorage.setItem("Borradores",JSON.stringify(correos));
    }
    document.getElementById("paramsj").value ="";
    document.getElementById("asuntomsj").value ="";
    document.getElementById("contenidomsj").value ="";
  }
  

},validarlightbox:function(){
  //funcion para validar que el lightbox lleve todos sus campos llenos
  debugger;
  var para = document.getElementById("paramsj").value;
  var asunto = document.getElementById("asuntomsj").value;
  var contenido = document.getElementById("contenidomsj").value;
  var validacioncorreo = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!validacioncorreo.test(para)){
    alert("Dirección de correo incorrectos");
  }else if(asunto==""&&contenido==""){
    alert("Debe llenar todos los campos")
  }else{
    return true;
  }
  $("#redactar").click();

},enviadosguardado:function(){
  //funcion para guardar los correos de la bandeja de enviados
 debugger;
 var destinatario = document.getElementById("paramsj").value;
 var asunto = document.getElementById("asuntomsj").value;
 var contenido = document.getElementById("contenidomsj").value;
 if(LOGIN.validarlightbox()){
  var bandejaenviado=new Array();
  var correosenviado=JSON.parse(localStorage.getItem("Enviados"));
  useronline = JSON.parse(localStorage.getItem("Online")).online;
  var sendmsj={'User':useronline,'para':destinatario,'asunto':asunto,'contenido':contenido};
  if(correosenviado===null){
    bandejaenviado.push(sendmsj);
    localStorage.setItem("Enviados",JSON.stringify(bandejaenviado));
  }else{
    correosenviado.push(sendmsj);  
    localStorage.setItem("Enviados",JSON.stringify(correosenviado));
  }
  document.getElementById("paramsj").value ="";
  document.getElementById("asuntomsj").value ="";
  document.getElementById("contenidomsj").value ="";

}
},cargarcorreos:function(){
  //funcion que carga los correos cada vez que el usuario se loguea
  debugger;
  var user_html = "";
  bandeborrador = JSON.parse(localStorage.getItem("Borradores"));
  user = JSON.parse(localStorage.getItem("Online")).online;
  var cont=0;
  if(bandeborrador!=null){
    for (var i = 0; i < bandeborrador.length; i++) { 
      var c = bandeborrador[i];  
      if(bandeborrador[i].User===user){
        cont=cont+1;
        if(bandeborrador.length!=null){
          user_html = user_html + "<div id="+i+" class=' mostrar nave panel panel-default imagenConPieDeTexto sombra' >"+"<div onClick=' LOGIN.contoculto("+i+");'><span class= 'glyphicon glyphicon-envelope img-tam2'>"+"</span>"+"<span id='corrasun' class='text' style='color:black' >"+c.asunto+"&nbsp;"+"</span>"+
          "<span id='corrcont' class='text' style='color:gray' maxlength='10'>" +"-"+ c.contenido+"</span>"+"<span title='Eliminar correo' id='trash' class='glyphicon glyphicon-trash img-tam' style='float:right' onClick='LOGIN.eliminarcorreoborrador("+i+");'></span></div>"+"<nav><div id="+"C"+i+"></div></nav>"+
          "<div id="+"M"+i+" class='ocultar 'class='pr colocar'><div ><div class='animated fadeIn colornuevo sombra2'>"+
          "<header class=he><div><p class=txt izq>"+c.asunto+"</p><div class=>"+
          "<a title=Eliminar correo>"+
          "<a onclick='LOGIN.editarcorreoborrador("+i+");' ><img class='padding' title='Editar mensaje' src='Imagenes/edit.png'>"+
          "<a/><a onclick='LOGIN.eliminarcorreoborrador();' title='Eliminar correo'><img class='padding' src='Imagenes/trash.png'><a/>"
          +"</div></div></header><hr>"+ "<div class='div'><p class='txt-izq'>"+c.para+"</p>"+"<div></div><div>"+"<p class='contenido'>"+c.contenido+"</p>"+"</div>"+"</div>"
          +"</div></div></div>"+"</div>"
        }else{
          user_html = user_html + "<nav class='bandeja'>"+"<p class='hoy salto'>"+"Aca se mostraran tus mensajes que se encuentran en borrador"+"</p>"+"</nav>";
        }
        $('#correos_borrados').html(user_html);
        $('#icorreos').html(cont);
      }
    }
  }else{
    user_html = user_html + "<nav class='bandeja'><p class='hoy salto'>"+"Aca se mostraran tus mensajes que se encuentran en borrador</p></nav>";
    $('#correos_borrados').html(user_html);
    $('#icorreos').html(cont);
  }


},fecha:function(){
  //funcion para colocar la fecha
  debugger;
  var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth()+1; //hoy es 0!
  var yyyy = hoy.getFullYear();

  $('#fecha').html(dd+"/"+mm+"/"+yyyy);

},cargarcorreosenviados:function(){
  //funcion para cargar los correos de la bandeja de enviados cada vez que el usuario se loguea
 debugger;
 var user_html = "";
 bandenviados = JSON.parse(localStorage.getItem("Enviados"));
 user = JSON.parse(localStorage.getItem("Online")).online;
 var contador=0;
 if(bandenviados!=null){
   for (var i = 0; i < bandenviados.length; i++) { 
    var e = bandenviados[i]; 
    if(bandenviados[i].User===user){
      var contador=contador+1;
      if(bandenviados.length!=null){
       user_html = user_html + "<div onClick=' LOGIN.contoculto("+i+");' id="+i+" class=' mostrar nave panel panel-default imagenConPieDeTexto sombra' >"+"<span class='glyphicon glyphicon-envelope img-tam2'>"+"</span>"+"<span id='corrasun' class='text' style='color:black' >"+e.asunto+"&nbsp;"+"</span>"+
       "<span id='corrcont' class='text' style='color:gray' maxlength='10'>" +"-"+ e.contenido+"</span>"+"<span title='Eliminar correo' id='trash' class='glyphicon glyphicon-trash img-tam' style='float:right' onClick='LOGIN.eliminarcorreoenviados("+i+");'></span>"+"<nav><div id="+"E"+i+"></div></nav>"+
       "<div id="+"M"+i+" class='ocultar'class='pr colocar'><div ><div class= 'colornuevo class='animated fadeIn sombra2'>"+
       "<header class=he><div><p class=txt izq>"+e.asunto+"</p><div class=>"+
       "<a title=Eliminar correo>"+
       "<a ><img class='padding' title='Editar mensaje' src='Imagenes/edit.png'>"+
       "<a/><a onClick=LOGIN.eliminarcorreoenviados(); title='Eliminar correo'><img class='padding' src='Imagenes/trash.png'><a/>"
       +"</div></div></header><hr>"+ "<div class='div'><p class='txt-izq'>"+e.para+"</p>"+"<div></div><div>"+"<p class='contenido'>"+e.contenido+"</p>"+"</div>"+"</div>"
       +"</div></div></div>"+"</div>"
     }else{
      user_html = user_html + "<nav class='bandeja'><p class='hoy salto'>Aca se mostraran tus mensajes que se encuentran en borrador</p></nav>";
    }
    $('#correos_borrados').html(user_html);
    $('#ienviados').html(contador);
  }
}
}else{
  user_html = user_html + "<nav class='bandeja'>"+"<p class='hoy salto'>"+"Aca se mostraran tus mensajes que se encuentran en borrador"+"</p>"+"</nav>";
  $('#correos_borrados').html(user_html);
  $('#ienviados').html(contador);
}


},mostrarcontenido:function(aidi){
  //funcion que muestra el contenido del correo de la bandeja de salida
  debugger;
  var enviado_html = "";
  this.aidi=aidi;
  salida= JSON.parse(localStorage.getItem("Borradores"));
  for (var i = 0; i < salida.length; i++) {
    if(i===aidi){
      var maniacs="C"+i;
      var mos=salida[i];
      borrador_html = borrador_html +"<div id="+"M"+i+" class='ocultar pr colocar animated fadeOutDown'><div><div class=colornuevo sombra2>"+
      "<header class='he'><div><p class=txt izq>"+mos.asunto+"</p><div class=>"+
      "<a onclick=document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block' title=Eliminar correo>"+
      "<img class='padding' title='Responder mensaje' src='Imagenes/responder.png'><a/>"+
      "<a onClick='' title=Eliminar correo><img class='padding' title='Editar mensaje' src='Imagenes/edit.png'>"+
      "<a/><a onClick='LOGIN.eliminarcorreoborrador();' title='Eliminar correo'><img class='padding' src='Imagenes/trash.png'><a/>"
      +"</div></div></header><hr>"+ "<div class='div'><p class='txt-izq'>"+mos.para+"</p>"+"<div>"+"<header>" + mos.asunto +"</header>"+"</div><div>"+"<p class='contenido'>"+mos.contenido+"</p>"+"</div>"+"</div>"
      +"</div></div></div>";
    }
  }
  document.getElementById(maniacs).innerHTML=borrador_html;

},mostrarcontenidoenviados:function(aid){
  //funcion que muestra el contenido del correo de la bandeja de enviados
  debugger;
  var enviado_html = "";
  this.aid=aid;
  enviado= JSON.parse(localStorage.getItem("Enviados"));
  for (var i = 0; i < enviado.length; i++) {
    if(i===aid){
      var mani="E"+i;
      var envi=enviado[i];
      enviado_html = enviado_html +"<div id="+"M"+i+" class='ocultar pr colocar animated fadeOutDown'><div><div class=colornuevo sombra2>"+
      "<header class=he><div><p class=txt izq>"+envi.asunto+"</p><div class=>"+
      "<a onclick=document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block' title=Eliminar correo>"+
      "<a onclick='' title=Eliminar correo><img class='padding' title='Editar mensaje' src='Imagenes/edit.png'>"+
      "<a/><a onClick='LOGIN.eliminarcorreoenviados();' title='Eliminar correo'><img class='padding' src='Imagenes/trash.png'><a/>"
      +"</div></div></header><hr>"+ "<div class='div'><p class='txt-izq'>"+envi.para+"</p>"+"<div>"+"<header>" + envi.asunto +"</header>"+"</div><div>"+"<p class='contenido'>"+envi.contenido+"</p>"+"</div>"+"</div>"
      +"</div></div></div>";
    }
  }
  document.getElementById(mani).innerHTML=enviado_html;

},contoculto:function(aidi2){
  //funcion que muestra el contenido oculto del correo de la bandeja de salida
  debugger;
  var culto="M"+aidi2;
  if(conti===0){
    conti=conti+1;
    document.getElementById(culto).style.display = 'block';
  }else{
    conti=0;
    document.getElementById(culto).style.display = 'none';
  }


},contoculto2:function(aidi4){
  //funcion que muestra el contenido oculto del correo de la bandeja de enviados
  debugger;
  var cul="O"+aidi4;
  if(conta===0){
    conta=conta+1;
    document.getElementById(cul).style.display = 'block';
  }else{
    conta=0;
    document.getElementById(cul).style.display = 'none';
  }
},eliminarcorreoborrador:function(ec){
  //funcion que elimina un correo en la bandeja de salida
 debugger;
 var bor=new Array();
 this.ec=ec;
 borrarbo= JSON.parse(localStorage.getItem("Borradores"));
 for (var i = 0; i < borrarbo.length; i++) {
   if(i===ec&&borrarbo.length===1){
    localStorage.removeItem("Borradores");
  }
  if(i==ec){

  }else{
    var bora={'User':borrarbo[i].User,'para':borrarbo[i].para,'asunto':borrarbo[i].asunto,'contenido':borrarbo[i].contenido};
    bor.push(bora);
    localStorage.setItem("Borradores",JSON.stringify(bor));
  }
}

LOGIN.cargarcorreos();

},eliminarcorreoenviados:function(ec){
  //funcion que elimina un correo en la bandeja de enviados
 debugger;
 var bor=new Array();
 this.ec=ec;
 borrarbo= JSON.parse(localStorage.getItem("Enviados"));
 for (var i = 0; i < borrarbo.length; i++) {
   if(i===ec&&borrarbo.length===1){
    localStorage.removeItem("Enviados");
  }
  if(i==ec){

  }else{
    var bora={'User':borrarbo[i].User,'para':borrarbo[i].para,'asunto':borrarbo[i].asunto,'contenido':borrarbo[i].contenido};
    bor.push(bora);
    localStorage.setItem("Enviados",JSON.stringify(bor));
  }
}

LOGIN.cargarcorreosenviados();

},cargarnombre:function(){
  //funcion para mostrar el nombre del usuario que se acaba de loguear
 var uuser = JSON.parse(localStorage.getItem("Online")).online;
 $('#nomuser').html(uuser);

},editarcorreoborrador:function(edit){
  //funcion que permite editar correos en la bandeja de salida
  debugger;
  this.edit = edit;
  document.getElementById("M"+edit).style.display='none';
  editarcorreo= JSON.parse(localStorage.getItem("Borradores"));
  for (var i = 0; i < editarcorreo.length; i++) {
    if(edit===i){
      var editarmensaje= "<div>"+
      "<div id="+"O"+i+" onClick='LOGIN.contoculto2("+edit+");'></div><div class='colornuevo sombra2'><header class='he'><div><input id='ediasunto' class='ta color' type=text value="+editarcorreo[i].asunto+"></div>"+
      "</header><hr><div class='div'><input id='edipara' class='ta color' type=text value="+editarcorreo[i].para+">"+
      "<div></br><textarea id='edicontenido' class='tamano3 col2' type='text' placeholder='Escribe aqui'>"+editarcorreo[i].contenido+"</textarea>"+
      "<button title='Enviar mensaje editado' class='boton b2 bt' type=button onClick='LOGIN.guardaredicion("+i+"); window.reload();'><span class='glyphicon glyphicon-ok'></span></button><button title='Cancelar edicion' onClick='document.getElementById("+"O"+i+").style.display='none';' class='boton b2 bt colo sp' type=button><span class='glyphicon glyphicon-remove'></span></button></div></br></div></div></div>";
      break;
    }

  }
  document.getElementById("C"+edit).innerHTML=editarmensaje;
},guardaredicion:function(ed){
  //funcion que permite guardar lo editado y cambiarlo de la bandeja de salida a la de enviados
  debugger;
  var eddit=new Array();
  var edienviado= new Array();
  this.ed=ed;
  var edita;
  var editacion;
  var edpara = document.getElementById("edipara").value;
  var edasunto = document.getElementById("ediasunto").value;
  var edcontenido = document.getElementById("edicontenido").value;
  ecorreo = JSON.parse(localStorage.getItem("Borradores"));
  envicorreo = JSON.parse(localStorage.getItem("Enviados"));
  localStorage.removeItem("Borradores");
  for (var i = 0; i < ecorreo.length; i++) {
    if(i===ed&&ecorreo.length===1){
      editacion={'User':ecorreo[i].User,'para':edpara,'asunto':edasunto,'contenido':edcontenido};
    }if(i===ed){
      editacion={'User':ecorreo[i].User,'para':edpara,'asunto':edasunto,'contenido':edcontenido};
    }else{
      edita={'User':ecorreo[i].User,'para':ecorreo[i].para,'asunto':ecorreo[i].asunto,'contenido':ecorreo[i].contenido};
      eddit.push(edita);
    }
    localStorage.setItem("Borradores",JSON.stringify(eddit));
    document.getElementById("O"+this.ed).style.display='none';
  }
  edienviado.push(editacion);
  if(envicorreo!=null){
    for (var i = 0; i < envicorreo.length; i++) {
      editacion={'User':ecorreo[i].User,'para':envicorreo[i].para,'asunto':envicorreo[i].asunto,'contenido':envicorreo[i].contenido};
      edienviado.push(editacion);
    }
  }
  localStorage.setItem("Enviados",JSON.stringify(edienviado));

},seleccionado:function(){
  //funcion para que el usuario note cual bandeja tiene seleccionada (bandeja de enviados)
  debugger;
  if(cambio===true){
    $("#salida").removeClass("seleccionado");
    $("#enviados").addClass("seleccionado");
    cambio=false;
  }
},seleccionado2:function(){
  //funcion para que el usuario note cual bandeja tiene seleccionada (bandeja de salida)
  debugger;
  if(cambio===false){
    $("#salida").addClass("seleccionado");
    $("#enviados").removeClass("seleccionado");
    cambio=true;
  }
}

};
