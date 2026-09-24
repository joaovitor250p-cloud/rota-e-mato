// =====================================
// MB DRYFIT
// SISTEMA PRINCIPAL JAVASCRIPT
// =====================================


let produtos = [];

let carrinho = [];




// =====================================
// CARREGAR PRODUTOS
// =====================================


async function carregarProdutos(){

    try{

        let resposta = await fetch("catalogo.json");

        produtos = await resposta.json();


        mostrarProdutos();


    }catch(error){

        console.log("Erro carregando catálogo",error);

    }

}



carregarProdutos();





// =====================================
// NAVEGAÇÃO
// =====================================


function mostrarPagina(id){


    let paginas=document.querySelectorAll(".pagina");


    paginas.forEach(p=>{

        p.classList.add("escondido");

    });



    document
    .getElementById(id)
    .classList.remove("escondido");


}






// =====================================
// MOSTRAR PRODUTOS
// =====================================


function mostrarProdutos(lista=produtos){


    let area=document.getElementById("listaProdutos");


    area.innerHTML="";



    lista.forEach((produto,index)=>{


        let card=document.createElement("div");


        card.className="produto";



        card.innerHTML=`

        <img src="${produto.imagem || 'imagens/produtos/semfoto.jpg'}">


        <h3>
        ${produto.nome}
        </h3>


        <p>
        Marca:
        ${produto.marca}
        </p>


        <div class="preco">

        R$ ${produto.preco.toFixed(2)}

        </div>


        <button onclick="adicionarCarrinho(${index})">

        Comprar

        </button>


        `;



        area.appendChild(card);



    });


}








// =====================================
// BUSCA PRODUTOS
// =====================================


function buscarProduto(){


let texto=
document
.getElementById("busca")
.value
.toLowerCase();



let resultado=produtos.filter(p=>{


return (

p.nome.toLowerCase().includes(texto)

||

p.marca.toLowerCase().includes(texto)

);



});



mostrarProdutos(resultado);



}








// =====================================
// FILTRO MARCA
// =====================================


document
.getElementById("marcaFiltro")
.addEventListener("change",function(){



let marca=this.value;



if(marca==""){

mostrarProdutos();

return;

}



let resultado=produtos.filter(p=>{


return p.marca==marca;


});



mostrarProdutos(resultado);



});








// =====================================
// CARRINHO
// =====================================


function adicionarCarrinho(id){


let produto=produtos[id];



let existente=
carrinho.find(p=>p.nome==produto.nome);



if(existente){


existente.quantidade++;


}

else{


carrinho.push({

nome:produto.nome,

preco:produto.preco,

quantidade:1


});


}



mostrarCarrinho();



alert("Produto adicionado ao carrinho");


}








function abrirCarrinho(){


document
.getElementById("carrinho")
.classList.remove("escondido");


}



function fecharCarrinho(){


document
.getElementById("carrinho")
.classList.add("escondido");


}






function mostrarCarrinho(){


let area=
document.getElementById("itensCarrinho");



area.innerHTML="";



let total=0;



carrinho.forEach((item,index)=>{


total+=item.preco*item.quantidade;



area.innerHTML+=`

<div class="itemCarrinho">


<span>

${item.nome}

<br>

Quantidade:
${item.quantidade}


</span>


<span>

R$
${(item.preco*item.quantidade).toFixed(2)}

</span>


<button onclick="removerCarrinho(${index})">

X

</button>


</div>


`;



});



area.innerHTML+=`

<hr>

<h3>

Total:
R$ ${total.toFixed(2)}

</h3>

`;




}








function removerCarrinho(id){


carrinho.splice(id,1);


mostrarCarrinho();


}








// =====================================
// VENDA - BUSCAR EAN
// =====================================



function buscarEAN(){


let codigo=
document
.getElementById("codigoEAN")
.value;



let produto=produtos.find(p=>{


return p.ean==codigo;


});



let resultado=
document.getElementById("resultadoEAN");



if(!produto){


resultado.innerHTML=`

<h3>
Produto não encontrado
</h3>

`;

return;


}



resultado.innerHTML=`

<h2>
${produto.nome}
</h2>


<p>
Marca:
${produto.marca}
</p>


<p>
Preço:
R$ ${produto.preco}
</p>


<p>
Estoque:
${produto.estoque}
</p>


<button onclick="registrarVenda('${produto.nome}')">

Vender

</button>


`;



}







function registrarVenda(nome){


alert(
"Venda registrada: "+nome
);


}










// =====================================
// ADMIN
// =====================================


function loginAdmin(){



let senha=
document
.getElementById("adminSenha")
.value;



if(senha==="1234"){


document
.getElementById("painelAdmin")
.classList
.remove("escondido");



}

else{


alert("Senha incorreta");


}



}









// =====================================
// CADASTRO PRODUTO
// =====================================



function cadastrarProduto(){


let nome=
document
.getElementById("nomeProduto")
.value;



let marca=
document
.getElementById("marcaProduto")
.value;



let referencia=
document
.getElementById("referenciaProduto")
.value;




let novo={


nome:nome,

marca:marca,

referencia:referencia,

preco:0,

estoque:0,

ean:
gerarEAN()


};



produtos.push(novo);



mostrarProdutos();



alert("Produto cadastrado");


}









// =====================================
// GERADOR EAN
// =====================================


function gerarEAN(){


let numero=

Date.now()
.toString()
.slice(-12);



return "789"+numero;


}
