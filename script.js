// ======================================
// MB DRYFIT
// SISTEMA DE LOJA COMPLETO
// ======================================


let produtos = [];

let carrinho = [];

let produtoSelecionado = null;

let corSelecionada = null;

let tamanhoSelecionado = null;




// ======================================
// CARREGAR CATALOGO
// ======================================


fetch("catalogo.json")

.then(res => res.json())

.then(dados => {


    produtos = dados;


    mostrarProdutos();


})

.catch(error=>{

console.log(error);

});






// ======================================
// NAVEGAÇÃO
// ======================================


function mostrarPagina(id){


document
.querySelectorAll(".pagina")
.forEach(p=>{


p.classList.add("escondido");


});



document
.getElementById(id)
.classList.remove("escondido");


}







// ======================================
// LISTAR PRODUTOS
// ======================================


function mostrarProdutos(lista=produtos){


let area =
document.getElementById("listaProdutos");


area.innerHTML="";



lista.forEach((produto,index)=>{


area.innerHTML += `


<div class="produto">


<img src="${produto.imagem}">


<h3>

${produto.nome}

</h3>


<p>

${produto.marca}

</p>


<div class="preco">

R$ ${produto.preco.toFixed(2)}

</div>



<button onclick="abrirProduto(${index})">

Ver produto

</button>



</div>



`;



});


}








// ======================================
// ABRIR PRODUTO
// ======================================


function abrirProduto(index){


produtoSelecionado =
produtos[index];



corSelecionada=null;

tamanhoSelecionado=null;



let area =
document.getElementById("listaProdutos");



area.innerHTML = `



<div class="produto-detalhe">



<img 
id="imagemProduto"
src="${produtoSelecionado.imagem}"
>



<h1>

${produtoSelecionado.nome}

</h1>



<p>

Marca:
${produtoSelecionado.marca}

</p>



<h3>
Escolha a cor:
</h3>



<div id="cores"></div>



<h3>
Escolha o tamanho:
</h3>



<div id="tamanhos"></div>



<h2 id="valorProduto">

Escolha uma opção

</h2>



<button onclick="adicionarProdutoCarrinho()">

Adicionar ao carrinho

</button>



</div>



`;




mostrarCores();


}







// ======================================
// CORES
// ======================================


function mostrarCores(){


let area =
document.getElementById("cores");



area.innerHTML="";



produtoSelecionado.cores.forEach((cor)=>{



area.innerHTML += `


<button onclick='selecionarCor(${JSON.stringify(cor)})'>


${cor.nome}


</button>


`;



});



}







function selecionarCor(cor){


corSelecionada=cor;



document
.getElementById("imagemProduto")
.src =
cor.imagem;



mostrarTamanhos();


}








// ======================================
// TAMANHOS
// ======================================


function mostrarTamanhos(){



let area =
document.getElementById("tamanhos");



area.innerHTML="";



corSelecionada.tamanhos.forEach(t=>{



area.innerHTML +=`


<button onclick='selecionarTamanho(${JSON.stringify(t)})'>


${t.tamanho}


</button>


`;



});


}







function selecionarTamanho(tamanho){


tamanhoSelecionado=tamanho;



document
.getElementById("valorProduto")
.innerHTML = `


Preço:

R$ ${tamanho.preco.toFixed(2)}

<br>

Estoque:

${tamanho.estoque}



`;



}







// ======================================
// CARRINHO
// ======================================



function adicionarProdutoCarrinho(){



if(!corSelecionada){

alert("Escolha uma cor");

return;

}



if(!tamanhoSelecionado){


alert("Escolha um tamanho");


return;


}



if(tamanhoSelecionado.estoque<=0){


alert("Produto sem estoque");


return;


}




let item={


nome:

produtoSelecionado.nome,


cor:

corSelecionada.nome,


tamanho:

tamanhoSelecionado.tamanho,


ean:

tamanhoSelecionado.ean,


preco:

tamanhoSelecionado.preco,


quantidade:

1


};




carrinho.push(item);



mostrarCarrinho();



alert("Produto adicionado");



}








function abrirCarrinho(){


document
.getElementById("carrinho")
.classList
.remove("escondido");


mostrarCarrinho();


}





function fecharCarrinho(){


document
.getElementById("carrinho")
.classList
.add("escondido");


}







function mostrarCarrinho(){


let area =
document.getElementById("itensCarrinho");



if(!area)return;



area.innerHTML="";



let total=0;



carrinho.forEach((item,index)=>{


let subtotal =
item.preco *
item.quantidade;



total += subtotal;



area.innerHTML += `



<div class="itemCarrinho">


${item.nome}

<br>


Cor:
${item.cor}


<br>


Tamanho:
${item.tamanho}



<br>


EAN:
${item.ean}



<br>


Quantidade:
${item.quantidade}



<br>


R$ ${subtotal.toFixed(2)}



<button onclick="removerItem(${index})">

Excluir

</button>



</div>


`;



});



area.innerHTML += `


<h2>

Total:

R$ ${total.toFixed(2)}

</h2>


`;



}





function removerItem(index){


carrinho.splice(index,1);


mostrarCarrinho();


}
