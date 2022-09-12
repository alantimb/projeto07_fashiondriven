let nome = prompt("Digite aqui seu nome: ");

if (nome.length === 0) {

    for (let i = 1; nome.length < i; i += 0) {
        alert("Por favor, insira um nome válido.");
        nome = prompt("Digite aqui seu nome: ");
    }
}

let modelo;
let gola;
let tecido;
let link = "";

// função concluída
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

// função concluída
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

// função concluída
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

// função concluída
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

// função concluída
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

// função concluída
function enviaRequisicao(objeto) {
    console.log(objeto);

    const promessa = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", objeto);
    promessa.then(encomendaConfirmada);
    promessa.catch(erroNaEncomenda);
}

// função concluída
function encomendaConfirmada(dadosEnviados) {
    console.log(dadosEnviados.data);
    let pedido = dadosEnviados.data;
    alert(`Parabéns, ${nome}, sua encomenda foi confirmada!\nVocê escolheu uma blusa do modelo ${pedido.model}, de tecido ${pedido.material} e gola ${pedido.neck}.`);
}

function erroNaEncomenda(dadosEnviados) {
    alert("Ops, não conseguimos processar sua encomenda");
    // recarregar página!!
}

fazRequisicao();
function fazRequisicao() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
    promessa.then(mostraRequisicao);
    promessa.catch(erroNaEncomenda);
}

function mostraRequisicao(dadosRecebidos) {
    console.log(dadosRecebidos);
    // mostrar na tela
}