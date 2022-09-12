let nome = prompt("Digite aqui seu nome: ");

if (nome.length === 0) {

    for (let i = 1; nome.length < i; i += 0) {
        alert("Por favor, insira um nome válido.");
        nome = prompt("Digite aqui seu nome: ");
    }
}

// let nome = "abc";

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
    console.log(modelo);
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
    console.log(gola);
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
    console.log(tecido);
    habilitaBotao();
}

// confere e armazena o link
function recebeLink(valor) {
    link = valor;
    if (link[0] === "h" && link[1] === "t" && link[2] === "t" && link[3] === "p" && link[4] === "s" && link[5] === ":" && link[6] === "/" && link[7] === "/" && link.length > 15) {
        console.log(link);
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

                        console.log(link, modelo, gola, tecido, nome);

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

                        console.log(objeto);
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
    console.log(objeto);

    const promessa = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", objeto);
    promessa.then(encomendaConfirmada);
    promessa.catch(erroNaEncomenda);
}

// função concluída
function encomendaConfirmada(dadosEnviados) {
    console.log(dadosEnviados.data);
    // Confirmação do novo pedido criado
    let pedido = dadosEnviados.data;
    alert(`Parabéns, ${nome}, sua encomenda foi confirmada!\nVocê escolheu uma blusa do modelo ${pedido.model}, de tecido ${pedido.material} e gola ${pedido.neck}.`);
    document.location.reload(true);
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
    console.log(recebidos);

    const ultimosPedidos = document.querySelector(".ultimos-pedidos");
    // expõe no rodapé da página os últimos 10 pedidos finalizados
    let camisaRecente = "";
    for (let i = 0; i < 10; i++) {
        console.log(recebidos[i]);
        camisaRecente += `<div class="camisa-div" id="${recebidos[i].id},${recebidos[i].model},${recebidos[i].neck},${recebidos[i].material},${recebidos[i].owner},${recebidos[i].image}" onclick="novaRequisicao(this)">
    <img src=${recebidos[i].image} alt="">
    <h3><b>Criador:</b> ${recebidos[i].owner} </h3>
</div>`;
    }
    ultimosPedidos.innerHTML += camisaRecente;
}

// Seleciona os dados do pedido clicado e os reencaminha para o servidor, sob novo author
function novaRequisicao(data) {
    console.log(data);
    let idClicado = data.id;
    console.log(idClicado);

    array = idClicado.split(",");
    console.log(array);

    let objetoPedido = {
        "model": `${array[1]}`,
        "neck": `${array[2]}`,
        "material": `${array[3]}`,
        "image": `${array[5]}`,
        "owner": `${array[4]}`,
        "author": `${nome}`
    };

    console.log(objetoPedido);

    const promessa = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", objetoPedido);
    promessa.then(novaEncomenda);
    promessa.catch(erroNaEncomenda);
}

// Confirma o pedido realizado após clicar em algum já existente
function novaEncomenda(dadosReenviados) {
    console.log(dadosReenviados.data);
    let pedido = dadosReenviados.data;
    confirm(`Parabéns, ${nome}, sua encomenda foi confirmada!\nVocê escolheu uma blusa do modelo ${pedido.model}, de tecido ${pedido.material} e gola ${pedido.neck}.`);
    document.location.reload(true);
}