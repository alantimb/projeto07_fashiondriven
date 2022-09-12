let nome = prompt("Digite aqui seu nome: ");

while (nome === null || nome.length === 0) {
    alert("Por favor, insira um nome válido.");
    nome = prompt("Digite aqui seu nome: ");
}

let modelo;
let gola;
let tecido;
let link = "";


// Seleciona o tipo de modelo
function selecionaOpcaoDeModelo(click) {
    const opcaoSelecionada = document.querySelector(".modelos .selecionado");

    if (opcaoSelecionada !== null) {
        opcaoSelecionada.classList.remove("selecionado");
    }

    click.classList.add("selecionado");
    modelo = click.id;
    habilitaBotao();
}

// Seleciona o tipo de gola
function selecionaOpcaoDeGola(click) {
    const opcaoSelecionada = document.querySelector(".golas .selecionado");

    if (opcaoSelecionada !== null) {
        opcaoSelecionada.classList.remove("selecionado");
    }

    click.classList.add("selecionado");
    gola = click.id;
    habilitaBotao();
}

// Seleciona o tipo de tecido
function selecionaOpcaoDeTecido(click) {
    const opcaoSelecionada = document.querySelector(".tecidos .selecionado");

    if (opcaoSelecionada !== null) {
        opcaoSelecionada.classList.remove("selecionado");
    }

    click.classList.add("selecionado");
    tecido = click.id;
    habilitaBotao();
}

// confere e armazena o link
function recebeLink(valor) {
    link = valor;
    if (link[0] === "h" && link[1] === "t" && link[2] === "t" && link[3] === "p" && link[4] === "s" && link[5] === ":" && link[6] === "/" && link[7] === "/" && link.length > 15) {
        habilitaBotao();
    }
    else {
        alert("Por favor, insira um link válido para a imagem de referência,\n começando por 'https://'.");
    }
}

// habilita o botão após confirmação das etapas anteriores
function habilitaBotao() {
    const botaoConfirmacao = document.querySelector(".botao");

    if (botaoConfirmacao.classList.contains("botao-desativado") === true) {
        if (modelo !== undefined) {
            if (gola !== undefined) {
                if (tecido !== undefined) {
                    if (link !== "") {
                        botaoConfirmacao.classList.remove("botao-desativado");
                        botaoConfirmacao.classList.add("botao-clicado");

                        const objeto = {
                            "model": `${modelo}`,
                            "neck": `${gola}`,
                            "material": `${tecido}`,
                            "image": `${link}`,
                            "owner": `${nome}`,
                            "author": `${nome}`
                        };

                        // Dados preenchidos enviados para o axios.post
                        if (botaoConfirmacao.classList.contains("botao-clicado")) {
                            const button = document.querySelector("button");
                            button.onclick = function () { enviaRequisicao(objeto) };
                        }
                    }
                }
            }
        }
    }
}

// Envia a requisição após clicar no botão
function enviaRequisicao(objeto) {
    const promessa = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", objeto);
    promessa.then(encomendaConfirmada);
    promessa.catch(erroNaEncomenda);
}

// Encaminha dados para o servidor
function encomendaConfirmada(dadosEnviados) {
    // Confirmação do novo pedido criado
    let pedido = dadosEnviados.data;
    alert(`Parabéns, ${nome}, sua encomenda foi confirmada!\nVocê escolheu uma blusa do modelo ${pedido.model}, de tecido ${pedido.material} e gola ${pedido.neck}.`);
    document.location.reload(true);
    // atualizar rodapé
}

// Mensagem em caso de erro no processamento da encomenda + retorna para o início
function erroNaEncomenda(dadosEnviados) {
    alert("Ops, não conseguimos processar sua encomenda");
    document.location.reload(true);
}

// Busca as encomendas do servidor ao inicializar o servidor
fazRequisicao();
function fazRequisicao() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
    promessa.then(mostraRequisicao);
    promessa.catch(erroNaEncomenda);
}

// Recolhe os dados ao iniciar/atualizar a página para exibição no rodapé
function mostraRequisicao(dadosRecebidos) {
    let recebidos = dadosRecebidos.data;

    const ultimosPedidos = document.querySelector(".ultimos-pedidos");
    // expõe no rodapé da página os últimos 10 pedidos finalizados
    let camisaRecente = "";
    for (let i = 0; i < 10; i++) {
        camisaRecente += `<div class="camisa-div" data-dados="${recebidos[i].id},${recebidos[i].model},${recebidos[i].neck},${recebidos[i].material},${recebidos[i].owner},${recebidos[i].image}" onclick="novaRequisicao(this)">
    <img src=${recebidos[i].image} alt="">
    <h3><b>Criador:</b> ${recebidos[i].owner} </h3>
</div>`;
    }
    ultimosPedidos.innerHTML += camisaRecente;
}

// Seleciona os dados do pedido clicado e os reencaminha para o servidor, sob novo author
function novaRequisicao(data) {
    let idClicado = data.getAttribute("data-dados");
    array = idClicado.split(",");

    let objetoPedido = {
        "model": `${array[1]}`,
        "neck": `${array[2]}`,
        "material": `${array[3]}`,
        "image": `${array[5]}`,
        "owner": `${nome}`,
        "author": `${array[4]}`
    };

    const promessa = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", objetoPedido);
    promessa.then(novaEncomenda);
    promessa.catch(erroNaEncomenda);
}

// Confirma o pedido realizado após clicar em algum já existente
function novaEncomenda(dadosReenviados) {
    let pedido = dadosReenviados.data;
    confirm(`Parabéns, ${nome}, sua encomenda foi confirmada!\nVocê escolheu uma blusa do modelo ${pedido.model}, de tecido ${pedido.material} e gola ${pedido.neck}.`);
    document.location.reload(true);
    // atualizar rodapé
}