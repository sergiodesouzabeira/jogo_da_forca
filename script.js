
palavras = ["ARROZ", "FEIJAO", "MACARRAO", "FUTEBOL", "CSS", "HTML","PERFUME", "OLEO", "COPO", "COMPETIR", "ROUPAS", "RADIO", "SOFTWARE"];

const menuPrincipal = document.getElementById("menu-principal");

const btnIniciarGame = document.querySelector("#iniciar");

const btnAdiciona = document.getElementById("adicionarpalavra");

const menuAdiciona = document.getElementById("adicionar-palavra");

const btnSalvarComecar = document.getElementById("salvar");

const btnCancelar = document.getElementById("cancelar");

const menuTabuleiro = document.getElementById("tabuleiro");

const desistir = document.getElementById("desistir");

const novoJogo = document.getElementById("novoJogo");

const ul = document.querySelector("ul");

let novaPalavra = document.getElementById("entrada-texto");

const teclado = document.querySelectorAll(".btn-letras")


var paginaAtual = menuPrincipal;

var palavra;

var letrasErradas = [];
var letrasCorretas = [];
var fimDeJogo = false;



btnIniciarGame.addEventListener("click", function(){
    document.querySelector(".texto").focus();
    reiniciaCanvas();
    sorteia();
    tornarInvisivel(paginaAtual);
    removerInvisivel(menuTabuleiro);
    desenhaTraco(palavra);
    paginaAtual = menuTabuleiro;
    let letras = document.querySelectorAll("li").focus();
   
    document.addEventListener("keydown", function(event,keyCode){
        let codigo = event.keyCode;
        if(validaLetra(codigo)){
            let letra = event.key.toUpperCase();
            if(!letrasErradas.includes(letra)){
                verificaLetraCorretaErrada(letra,palavra,letras,letrasCorretas,letrasErradas);   
            }
            mostrarLetrasErradas();
            verificaFimDeJogo();
        }
    })
    
 

    for(z = 0; z < teclado.length; z++) {
        teclado[z].addEventListener('click', function(){
            console.log(`ok${[z]}`);
            let letra = this.value;
                if(!letrasErradas.includes(letra)){
                    if(palavra.includes(letra)){
                        letrasCorretas.push(letra);
                    } else {
                        letrasErradas.push(letra);
                        desenhaForca();
                    }
                    for(i=0;i<palavra.length;i++){
                        if(letra===palavra[i]){
                            letras[i].textContent = letra;
                        }     
                    }   
                }
                mostrarLetrasErradas();
                verificaFimDeJogo();            
        })
    }
    })  


btnAdiciona.addEventListener("click", function(){
    tornarInvisivel(paginaAtual);
    removerInvisivel(menuAdiciona)
    paginaAtual=menuAdiciona;
    document.getElementById("entrada-texto").focus();
})


btnCancelar.addEventListener("click",function(){
    tornarInvisivel(paginaAtual);
    removerInvisivel(menuPrincipal);
    paginaAtual = menuPrincipal;
})


btnSalvarComecar.addEventListener("click", function(){
    document.querySelector(".texto").focus();
    let novaPalavra = document.getElementById("entrada-texto");
    if(novaPalavra.value.length>0){
        
        reiniciaCanvas();
        letrasErradas=[];
        acertos=[];
        ul.innerHTML=""
        adicionaPalavra();
        sorteia();
        tornarInvisivel(paginaAtual);
        removerInvisivel(menuTabuleiro);
        desenhaTraco(palavra);
        paginaAtual = menuTabuleiro;
        let letras = document.querySelectorAll("li");
        // configurando evento ao digitar letra:
        document.addEventListener("keydown", function(event,keyCode){
            let codigo = event.keyCode;
            if(validaLetra(codigo)){
                let letra = event.key.toUpperCase();
                if(!letrasErradas.includes(letra)){
                    verificaLetraCorretaErrada(letra,palavra,letras,letrasCorretas,letrasErradas);   
                }
                mostrarLetrasErradas();
                verificaFimDeJogo();                
            }
        })

    } else {
        alert("Por favor digite uma palavra válida!")
    }
})


novoJogo.addEventListener("click", function(){
    document.querySelector(".texto").focus();
    reiniciaCanvas();
    letrasErradas=[];
    acertos=[];
    ul.innerHTML="";
    sorteia();
    desenhaTraco(palavra);
    let letras = document.querySelectorAll("li");
    document.addEventListener("keydown", function(event,keyCode){
        let codigo = event.keyCode;
        if(validaLetra(codigo)){
            let letra = event.key.toUpperCase();
            if(!letrasErradas.includes(letra)){              
                verificaLetraCorretaErrada(letra,palavra,letras,letrasCorretas,letrasErradas);      
            }
            verificaFimDeJogo();
            mostrarLetrasErradas();
        }
    })

})


desistir.addEventListener("click",function(){
    letrasErradas=[];
    acertos=[];
    ul.innerHTML="";
    alert(`A palavra secreta era ${palavra}`)
    tornarInvisivel(paginaAtual);
    removerInvisivel(menuPrincipal);
    paginaAtual=menuPrincipal;
})





function sorteia(){
    let indice = Number(Math.floor(Math.random()*palavras.length));
    palavra=palavras[indice]; 
    return palavra;   
}



function tornarInvisivel(section){
    section.classList.add("invisivel");
}


function removerInvisivel(section){
    section.classList.remove("invisivel");
}



function adicionaPalavra(){
    let novaPalavra = document.getElementById("entrada-texto");
    palavras.push(novaPalavra.value.toUpperCase());
}


function desenhaTraco(palavra){
    let ul = document.getElementById("lista");
    for(i=0;i<palavra.length;i++){
       let li = document.createElement("li");
       li.textContent="___";
       ul.appendChild(li);
    }
}



function validaLetra(codigo){
    return codigo>=65 && codigo<=90;
}



function mostrarMensagemLetraUsada(){
    let aviso = document.querySelector(".aviso");
    aviso.classList.remove("invisivel");
    setTimeout(function(){
        aviso.classList.add("invisivel");
    },1000);
}



function mostrarLetrasErradas(){
    let divLetraErrada = document.querySelector(".letrasErradas")
    divLetraErrada.innerHTML='<h2>Letras Erradas:</h2>';
    letrasErradas.forEach(letra=>{
        divLetraErrada.innerHTML+=letra;
    })
}



function verificaFimDeJogo(){
    let mensagem = "";
     if(palavra==ul.innerText){
   
        mensagem="Parabens, você ganhou!";
        
    }
    if(mensagem){
        setTimeout(function(){
            alert(mensagem);
        },500)
    }

}


function reiniciarJogo(){
    window.location.reload();
}




function removerListeners(){
    document.removeEventListener("keydown", function(event,keyCode){
        let codigo = event.keyCode;
        if(validaLetra(codigo)){
            let letra = event.key.toUpperCase();
            if(letrasErradas.includes(letra)){
                mostrarMensagemLetraUsada();
            }else{
                verificaLetraCorretaErrada(letra,palavra,letras,letrasCorretas,letrasErradas);   
            }
            mostrarLetrasErradas();
            verificaFimDeJogo();
        }
    })
}


novaPalavra.addEventListener("keypress", function(e){
    if(!checkChar(e)){
        e.preventDefault();
    }
});


function checkChar(e) {
    const char = String.fromCharCode(e.keyCode);
   
    const pattern = '[a-zA-Z]';

    if(char.match(pattern)){
        return true;
    }
}


function verificaLetraCorretaErrada(letra,palavra,letras,letrasCorretas,letrasErradas){
    if(palavra.includes(letra)){
        letrasCorretas.push(letra);
    } else {
        letrasErradas.push(letra);
        desenhaForca();
    }
    for(i=0;i<palavra.length;i++){
        if(letra==palavra[i]){
            letras[i].textContent = letra;
        }     
    }  
}
