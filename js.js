var cantidad=0;//varia depende la dificultad
var baraja=[];
//var desde=1;
var memoria=document.getElementById('memoria');
var intentos=document.getElementById('intentos');
var jugador1=document.getElementById('jugador1');
var jugador2=document.getElementById('jugador2');
var personalizarn=document.getElementById('personalizar');
var giradas=0;
var posicion1=0;
var posicion2=0;
var jugando=[];
var volteadas=[];
var pares=0;
var anterior=-1;
var nueva=-2;
var puedegirar=true;
var ancho=130;
var alto=200;
var turno=aleatorioentredos(1,2);
var score1=0;
var score2=0;
var nombre1='Jugador 1';
var nombre2='Jugador 2';
var cantidadjugadores=1;
var botones=document.getElementsByClassName('btn-primary');
var dorsoelegido="0";
function crea() {
    for (let i=0; i<cantidad; i++)
    {baraja.push(i);
     baraja.push(i);
}}
function jugador(){
    if(cantidadjugadores==1){
        cantidadjugadores=2;
        limpiar();
        jugador2.disabled=true;
        jugador1.disabled=false;
        personalizarn.hidden=false;
        cambiarnombreboton(10);

    }
    else{cantidadjugadores=1;limpiar();jugador1.disabled=true;jugador2.disabled=false;personalizarn.hidden=true;nombre1='Jugador 1';nombre2='Jugador 2';
    cambiarnombreboton(10);}
}

function personalizar(){
    nombre1=prompt('Ingresa el nombre del primer jugador');
    nombre2=prompt('Ingresa el nombre del segundo jugador');
    }

var score=0;
function facil(){cambiarnombreboton(0);
                cantidad=4; ancho=130;alto=200;limpiar(); crea();  entreverar();};
function amateur(){
    cambiarnombreboton(1);
    cantidad=8;; ancho=130;alto=200; limpiar(); crea(); entreverar();};
function intermedio(){
                cambiarnombreboton(2);
                cantidad=15; ; ancho=100;alto=150; limpiar(); crea(); entreverar();};
function dificil(){
                cambiarnombreboton(3);
                cantidad=28; ; ancho=70;alto=100; limpiar(); crea(); entreverar();};
function crack(){
                cambiarnombreboton(4);
                cantidad=42; ; ancho=70;alto=100; limpiar(); crea(); entreverar();};
function limpiar(){
    baraja=[];
    giradas=0;
    posicion1=0;
    posicion2=0;
    jugando=[];
    volteadas=[];
    pares=0;
    score=0;
    score1=0;
    score2=0;
    puedegirar=true;
    intentos.innerHTML='';
    memoria.innerHTML='<p>Es un juego que requiere de gran habilidad mental y capacidad intelectual, con un aditivo de competitividad en el caso que se jugase contra otro jugador. Elije la dificultad y comienza a jugar</p>';
    
   
}

function pantalla(){
    if(cantidadjugadores==1){intentos.innerHTML='<h1>Score: Comienza a jugar!!<h1>';}
        else{
            if(turno=1){intentos.innerHTML=`<h1>Comienza jugando ${nombre1} <hr>${nombre1}: ${score1} parejas encontradas. <hr>${nombre2}: ${score2} parejas encontradas.</h1>`;}
                    else{intentos.innerHTML=`<h1>Comienza jugando ${nombre2} <hr>${nombre1}: ${score1} parejas encontradas. <hr>${nombre2}: ${score2} parejas encontradas.</h1>`;}
            }
}



function mostrar(lista){
    memoria.innerHTML='';            
    for(let i=0; i<lista.length; i++){
        memoria.innerHTML+=`<img id="${i}" src="cartas/dorsos/${dorsoelegido}.jpg" class="mr-2 mt-2" width="${ancho}" height="${alto}"  onclick="girar(${i})" alt="">`;
    }
}



function entreverar(){
jugando=[];
var lista=baraja.slice();
var entreveradas=[];
while(lista.length){
var posicion=aleatorioentredos(0,lista.length-1);
entreveradas.push(lista[posicion]);
lista.splice(posicion,1);}

jugando=entreveradas;
pantalla();
mostrar(jugando);

}

function aleatorioentredos(minimo,maximo){
   return Math.floor(Math.random()*((maximo+1)-minimo)+minimo);}


// el primer cero es binario por lo que no es el minimo
//var variable = 0 | Math.random() * 50;
//console.log (variable);


async function girar(posicion){
    nueva=posicion;
    if(anterior!=nueva){
    if (esta(volteadas,posicion)==false){
    
    if(puedegirar){

            var carta=document.getElementById(posicion); 
            carta.src=`cartas/${jugando[posicion]}.jpg`; 
            giradas++; 

            if (giradas==1){posicion1=posicion;anterior=posicion;}
            if (giradas==2){posicion2=posicion;puedegirar=false; await comparar(posicion1,posicion2);}
        
    }//puede si no se esta comparando
    }//gira si no esta usada
    }//acepta si no es la misma
}

async function comparar(pos1,pos2){
    giradas=0;
        if(jugando[pos1]!=jugando[pos2]){        
                                   await esperar(1.6);//espero tres segundos
                                   var carta1=document.getElementById(pos1);
                                   var carta2=document.getElementById(pos2);
                                   carta1.src=`cartas/dorsos/${dorsoelegido}.jpg`;
                                   carta2.src=`cartas/dorsos/${dorsoelegido}.jpg`;    
                                   score++;    
                                   anterior=-1;                           
        }
        else{pares++;score++; volteadas.push(pos1); volteadas.push(pos2);anterior=-1; if(turno==1){score1++;turno=2}else{score2++;turno=1}}
    
        puedegirar=true; 

        if(turno==1){turno=2}else{turno=1}
    
    if(pares==baraja.length/2){
        if(cantidadjugadores==1){intentos.innerHTML=''; intentos.innerHTML=`<h1>Score: ${score} intentos. Felicidades lo lograste!!</h1>`}
            else{if(score1==score2){intentos.innerHTML='';intentos.innerHTML=`<h1>Empate entre ${nombre1} y ${nombre2}!! con ${score2} parejas encontradas cada uno!!</h1>`;}
                 if(score1>score2){intentos.innerHTML='';intentos.innerHTML=`<h1>Ganador: ${nombre1} con ${score1} parejas encontradas. Felicidades!!!<hr> Perdedor: ${nombre2} con ${score2} parejas encontradas</h1>`;}
                 if(score1<score2){intentos.innerHTML='';intentos.innerHTML=`<h1>Perdedor: ${nombre1} con ${score1} parejas encontradas. <hr> Ganador: ${nombre2} con ${score2} parejas encontradas. Felicidades!!!</h1>`}
                
                }
        }
        else{if(cantidadjugadores==1){intentos.innerHTML=''; intentos.innerHTML=`<h1>Score: ${score} intentos.</h1>`}
            else{if(turno==1){intentos.innerHTML=`<h1>Turno de ${nombre1} <hr>${nombre1}: ${score1} parejas encontradas. <hr>${nombre2}: ${score2} parejas encontradas.</h1>`;}
                    else{intentos.innerHTML=`<h1>Turno de ${nombre2} <hr>${nombre1}: ${score1} parejas encontradas. <hr>${nombre2}: ${score2} parejas encontradas.</h1>`;}}
            }
    }
    
    function esperar(ms){return new Promise(resolve => setTimeout(resolve, ms*1000));}


    function esta(lista,elemento){
        for(let i=0;i<lista.length;i++){
            if(elemento==lista[i]){return true;}
        }    
        return false;
    }

    function dorso(){
        memoria.innerHTML='<h3>Elige un modelo...</h3><br>'
        for(let i=0; i<21; i++){intentos.innerHTML='';
            memoria.innerHTML+=`<img id="${i}" src="cartas/dorsos/${i}.jpg" class="mr-2 mt-2" width="${ancho}" height="${alto}"  onclick="asignar(${i})" alt="">`;
        }
    }
    function asignar(elegido){dorsoelegido=elegido;memoria.innerHTML='<h3>Ya ha quedado guardado el cambio, puedes ver el nuevo dorso al comenzar un juego</h3><br>';
        cambiarnombreboton(10);
        }


    function cambiarnombreboton(cual){
        botones[0].innerHTML='Fácil';
        botones[1].innerHTML='Amateur';
        botones[2].innerHTML='Intermedio';
        botones[3].innerHTML='Dificil';
        botones[4].innerHTML='Experto';
        if(cual<5&&cual>=0){ botones[cual].innerHTML='Volver a Repartir'}
    }