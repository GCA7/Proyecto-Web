var conti=0;
var conta=0;
var LOGIN=LOGIN||
{ 
		//funcion para guardar un usuario
		guardarUser:function() {
			var email = document.getElementById("email").value;
			var contrasena = document.getElementById("contrasena").value;
			debugger;

			if(!document.getElementById('checkterm').checked){

				alert('No has aceptado los terminos de servicio y privacidad');
			}else{

				LOGIN.validarcampos(form_registro);
			}
		},

	//funcion para guardar los datos del usuario
	guardar:function(email,contrasena)
	{
		debugger;
		this.email=email;
		this.contrasena=contrasena;

       //lo obtiene todo en si
       dato = localStorage.getItem("Login");

       //lo obtiene en objetos 
       dato = JSON.parse(localStorage.getItem("Login"));

       if(dato==null)
       {
       	var datosLogin=new Array();

       	var date={'User':this.email,'Password':this.contrasena};
       	datosLogin.push(date);
          //Este es para ser el key del localstorage y le envia un arreglo de objetos		
          localStorage.setItem("Login",JSON.stringify(datosLogin));
        }else
        {

         var date={'User':this.email,'Password':this.contrasena};
         dato.push(date);
        //Este es para ser el key del localstorage y le envia un arreglo de objetos		
        localStorage.setItem("Login",JSON.stringify(dato));

      }
    	//funcion que valida el usuario en el login

    },validar:function(email,contrasena)
    {
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

	//valida el usuario
},Login:function()

{
	debugger;
	var email = document.getElementById("email").value;
	var contrasena = document.getElementById("contrasena").value;

	LOGIN.validar(email,contrasena);

	//funcion que muestra el contenido oculto del login
},mostrar:function()
{
  debugger;
  document.getElementById('oculto').style.display = 'block';
  document.getElementById('btnsesion').style.display = 'none';
  document.getElementById('btnregistro').style.display = 'none';

	//funcion para validar que el usuario llene todos los campos exigidos
},validarcampos:function(){
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
		LOGIN.guardar(email,contrasena);
	} 

},useronline:function(){
  debugger;
  var ptoconectado = document.getElementById("email").value;
  var enlinea={'online':ptoconectado};
  localStorage.setItem("Online",JSON.stringify(enlinea));

},salidaguardado:function(){
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
  debugger;
  var para = document.getElementById("paramsj").value;
  var asunto = document.getElementById("asuntomsj").value;
  var contenido = document.getElementById("contenidomsj").value;
  var validacioncorreo = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!validacioncorreo.test(para)){
    alert("sea idiota meta un correo que sirva");
  }else if(asunto==""&&contenido==""){
    alert("Debe llenar todos los campos")
  }else{
    return true;
  }
  $("#redactar").click();

},enviadosguardado:function(){
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
  debugger;
  var user_html = "";
  bandeborrador = JSON.parse(localStorage.getItem("Borradores"));
  user = JSON.parse(localStorage.getItem("Online")).online;
  var cont=0;
  if(bandeborrador!=null){
    for (var i = 0; i < bandeborrador.length; i++) { 
      var c = bandeborrador[i];  
      if(c!=null){
        if(bandeborrador[i].User===user){
          cont=cont+1;
          if(bandeborrador.length!=null){
            user_html = user_html + "<div id="+i+" class=' mostrar nave panel panel-default imagenConPieDeTexto sombra row-fluid' >"+"<div onClick=' LOGIN.contoculto("+i+");'><span class= 'glyphicon glyphicon-envelope'>"+"</span>"+"<span id='corrasun' class='text' style='color:black' >"+c.asunto+"&nbsp;"+"</span>"+
            "<span id='corrcont' class='text' style='color:gray' maxlength='10'>" +"-"+ c.contenido+"</span>"+"<span id='trash' class='glyphicon glyphicon-trash' style='float:right' onClick='LOGIN.eliminarcorreoborrador("+i+");'></span></div>"+"<nav><div id="+"C"+i+"></div></nav>"+
            "<div id="+"M"+i+" class='ocultar 'class='pr colocar'><div ><div class='animated fadeIn colornuevo sombra2'>"+
            "<header class=he><div><p class=txt izq>"+c.asunto+"</p><div class=>"+
            "<a title=Eliminar correo>"+
            "<img class='padding' title='Responder mensaje' src='Imagenes/responder.png'><a/>"+
            "<a onclick='LOGIN.editarcorreoborrador("+i+");' title=Eliminar correo><img class='padding' title='Editar mensaje' src='Imagenes/edit.png'>"+
            "<a/><a href='eliminar.html' title='Eliminar correo'><img class='padding' src='Imagenes/trash.png'><a/>"
            +"</div></div></header><hr>"+ "<div class='div'><p class='txt-izq'>"+c.para+"</p>"+"<div>"+"<header>" + c.asunto +"</header>"+"</div><div>"+"<p class='contenido'>"+c.contenido+"</p>"+"</div>"+"</div>"
            +"</div></div></div>"+"</div>"
          }else{
            user_html = user_html + "<nav class='bandeja'>"+"<p class='hoy salto'>"+"Aca se mostraran tus mensajes que se encuentran en borrador"+"</p>"+"</nav>";
          }
          $('#correos_borrados').html(user_html);

        }
      }else{
        user_html = user_html + "<nav class='bandeja'>"+"<p class='hoy salto'>"+"Aca se mostraran tus mensajes que se encuentran en borrador"+"</p>"+"</nav>";
      }
    }
  }
  $('#icorreos').html(cont);

},fecha:function(){
  debugger;
  var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth()+1; //hoy es 0!
  var yyyy = hoy.getFullYear();

  $('#fecha').html(dd+"/"+mm+"/"+yyyy);

},cargarcorreosenviados:function(){
 debugger;
 var user_html = "";
 bandenviados = JSON.parse(localStorage.getItem("Enviados"));
 user = JSON.parse(localStorage.getItem("Online")).online;
 var contador=0;
 if(bandenviados!=null){
   for (var i = 0; i < bandenviados.length; i++) { 
    var e = bandenviados[i]; 
    if(e!=null){ 
      if(bandenviados[i].User===user){
        var contador=contador+1;
        if(bandenviados.length!=null){
         user_html = user_html + "<div onClick=' LOGIN.contoculto("+i+");' id="+i+" class=' mostrar nave panel panel-default imagenConPieDeTexto sombra row-fluid' >"+"<span class='glyphicon glyphicon-envelope'>"+"</span>"+"<span id='corrasun' class='text' style='color:black' >"+e.asunto+"&nbsp;"+"</span>"+
         "<span id='corrcont' class='text' style='color:gray' maxlength='10'>" +"-"+ e.contenido+"</span>"+"<span id='trash' class='glyphicon glyphicon-trash' style='float:right' onClick='LOGIN.eliminarcorreoenviados("+i+");'></span>"+"<nav><div id="+"E"+i+"></div></nav>"+
         "<div id="+"M"+i+" class='ocultar'class='pr colocar'><div ><div class= 'colornuevo class='animated fadeIn sombra2'>"+
         "<header class=he><div><p class=txt izq>"+e.asunto+"</p><div class=>"+
         "<a title=Eliminar correo>"+
         "<img class='padding' title='Responder mensaje' src='Imagenes/responder.png'><a/>"+
         "<a onclick='document.getElementById(culto).style.display = 'none';' title=Eliminar correo><img class='padding' title='Editar mensaje' src='Imagenes/edit.png'>"+
         "<a/><a href='eliminar.html' title='Eliminar correo'><img class='padding' src='Imagenes/trash.png'><a/>"
         +"</div></div></header><hr>"+ "<div class='div'><p class='txt-izq'>"+e.para+"</p>"+"<div>"+"<header>" + e.asunto +"</header>"+"</div><div>"+"<p class='contenido'>"+e.contenido+"</p>"+"</div>"+"</div>"
         +"</div></div></div>"+"</div>"
       }else{
        user_html = user_html + "<nav class='bandeja'>"+"<p class='hoy salto'>"+"Aca se mostraran tus mensajes que se encuentran en borrador"+"</p>"+"</nav>";
      }
    }
    $('#correos_borrados').html(user_html);

  }
}
}
$('#ienviados').html(contador);

},mostrarcontenido:function(aidi){
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
      "<a/><a href='eliminar.html' title='Eliminar correo'><img class='padding' src='Imagenes/trash.png'><a/>"
      +"</div></div></header><hr>"+ "<div class='div'><p class='txt-izq'>"+mos.para+"</p>"+"<div>"+"<header>" + mos.asunto +"</header>"+"</div><div>"+"<p class='contenido'>"+mos.contenido+"</p>"+"</div>"+"</div>"
      +"</div></div></div>";
    }
  }
  document.getElementById(maniacs).innerHTML=borrador_html;

},mostrarcontenidoenviados:function(aid){
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
      "<img class='padding' title='Responder mensaje' src='Imagenes/responder.png'><a/>"+
      "<a onclick='' title=Eliminar correo><img class='padding' title='Editar mensaje' src='Imagenes/edit.png'>"+
      "<a/><a href='eliminar.html' title='Eliminar correo'><img class='padding' src='Imagenes/trash.png'><a/>"
      +"</div></div></header><hr>"+ "<div class='div'><p class='txt-izq'>"+envi.para+"</p>"+"<div>"+"<header>" + envi.asunto +"</header>"+"</div><div>"+"<p class='contenido'>"+envi.contenido+"</p>"+"</div>"+"</div>"
      +"</div></div></div>";
    }
  }
  document.getElementById(mani).innerHTML=enviado_html;

},contoculto:function(aidi2){
  debugger;

  var culto="M"+aidi2;
  if(conti===0){
    conti=conti+1;
    document.getElementById(culto).style.display = 'block';
  //document.getElementById(culto).style.display = 'none';
  //document.getElementById('corrcont').style.display = 'none';
  //document.getElementById('corrasun').style.display = 'none';
}else{
  conti=0;
  document.getElementById(culto).style.display = 'none';
}


},contoculto2:function(aidi4){
  debugger;
  var cul="O"+aidi4;
  if(conta===0){
    conta=conta+1;
    document.getElementById(cul).style.display = 'block';
  //document.getElementById(culto).style.display = 'none';
  //document.getElementById('corrcont').style.display = 'none';
  //document.getElementById('corrasun').style.display = 'none';
}else{
  conta=0;
  document.getElementById(cul).style.display = 'none';
}
},eliminarcorreoborrador:function(ec){
 debugger;
 var bor=new Array();
 this.ec=ec;
 borrarbo= JSON.parse(localStorage.getItem("Borradores"));
 localStorage.removeItem("Borradores");
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
    localStorage.removeItem("Enviados");
    localStorage.setItem("Enviados",JSON.stringify(bor));
  }
}

LOGIN.cargarcorreos();

},cargarnombre:function(){
 var uuser = JSON.parse(localStorage.getItem("Online")).online;
 $('#nomuser').html(uuser);

},editarcorreoborrador:function(edit){
  debugger;
  this.edit = edit;
  document.getElementById("M"+edit).style.display='none';
  editarcorreo= JSON.parse(localStorage.getItem("Borradores"));
  for (var i = 0; i < editarcorreo.length; i++) {
    if(edit===i){
      var editarmensaje= "<div class='espacio top'>"+
      "<div id="+"O"+i+" onClick='LOGIN.contoculto2("+edit+");'></div><div class='colornuevo sombra2'><header class='he'><div><input id='ediasunto' class='ta color' type=text value="+editarcorreo[i].asunto+"></div>"+
      "</header><hr><div class='div'><input id='edipara' class='ta color' type=text value="+editarcorreo[i].para+">"+
      "<div></br><textarea id='edicontenido' class='tamano3 col' type=text placeholder=Escribe aqui>"+editarcorreo[i].contenido+"</textarea>"+
      "<button class='boton b2 bt' type=button onClick='LOGIN.guardaredicion("+i+");'><span class='glyphicon glyphicon-ok'></span></button><button class='boton b2 bt colo sp' type=button><span class='glyphicon glyphicon-remove'></span></button></div></br></div></div></div>";
      break;
    }

  }
  document.getElementById("C"+edit).innerHTML=editarmensaje;

},guardaredicion:function(ed){
  debugger;
 var eddit=new Array();
 this.ed=ed;
 var edita;
 var edpara = document.getElementById("edipara").value;
 var edasunto = document.getElementById("ediasunto").value;
 var edcontenido = document.getElementById("edicontenido").value;
 ecorreo = JSON.parse(localStorage.getItem("Borradores"));
 localStorage.removeItem("Borradores");
 for (var i = 0; i < ecorreo.length; i++) {
  if(i===ed&&ecorreo.length===1){
    edita={'User':ecorreo[i].User,'para':edpara,'asunto':edasunto,'contenido':edcontenido};
  }if(i===ed){
    edita={'User':ecorreo[i].User,'para':edpara,'asunto':edasunto,'contenido':edcontenido};
  }else{
    edita={'User':ecorreo[i].User,'para':ecorreo[i].para,'asunto':ecorreo[i].asunto,'contenido':ecorreo[i].contenido};
    }
    eddit.push(edita);
    localStorage.setItem("Borradores",JSON.stringify(eddit)); 
}
}
};
