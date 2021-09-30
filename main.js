let cartas = [
  (carta1 = {
    nome: 'Dead Fishing',
    imagem: 'Dead Fishing.jpg',
    atributos: {
      ataque: 7,
      defesa: 5,
      magia: 5
    }
  }),
  (carta2 = {
    nome: 'Death Man',
    imagem: 'Death Man.jpg',
    atributos: {
      ataque: 6,
      defesa: 6,
      magia: 5
    }
  }),
  (carta3 = {
    nome: 'Magic',
    imagem: 'Magic.jpg',
    atributos: {
      ataque: 6,
      defesa: 1,
      magia: 10
    }
  }),
  (carta4 = {
    nome: 'Mortal Commander',
    imagem: 'Mortal Commander.jpg',
    atributos: {
      ataque: 2,
      defesa: 9,
      magia: 10
    }
  }),
  (carta5 = {
    nome: 'Slave',
    imagem: 'Slave.jpg',
    atributos: {
      ataque: 0,
      defesa: 9,
      magia: 2
    }
  }),
  (carta6 = {
    nome: 'Witches',
    imagem: 'Witches.jpg',
    atributos: {
      ataque: 2,
      defesa: 2,
      magia: 10
    }
  })
]

// Inicio
let cartaMaquina
let cartaJogador
let placar = [0, 0]
exibirPlacar()
//

function sortearCarta() {
  zerarCarta('carta-jogador')
  zerarCarta('carta-maquina')

  let numeroDaCarta = parseInt(Math.random() * 6)
  cartaMaquina = cartas[numeroDaCarta]
  cartaJogador = cartas[numeroDaCarta]

  while (cartaJogador == cartaMaquina) {
    numeroDaCarta = parseInt(Math.random() * 6)
    cartaJogador = cartas[numeroDaCarta]
  }

  document.getElementById('btnSortear').disabled = true
  document.getElementById('btnJogar').disabled = false
  exibirCartaJogador()
}

function obtemAtributoSelecionado() {
  let radioAtributo = document.getElementsByName('atributo')
  for (let i = 0; i < radioAtributo.length; i++) {
    if (radioAtributo[i].checked) {
      return radioAtributo[i].value
    }
  }
}

function jogar() {
  let atributoSele = obtemAtributoSelecionado()
  let divResultado = document.getElementById('resultado')

  while (isNaN(atributoSele)) {
    if (
      cartaJogador.atributos[atributoSele] >
      cartaMaquina.atributos[atributoSele]
    ) {
      placar[0]++
      htmlResultado =
        "<p class='resultado-final'>Venceu 🔪, clique novamente para sortear!</p>"
      break
    } else if (
      cartaJogador.atributos[atributoSele] <
      cartaMaquina.atributos[atributoSele]
    ) {
      placar[1]++
      htmlResultado =
        "<p class='resultado-final'>Perdeu 💀, clique novamente para sortear!</p>"
      break
    } else if (
      isNaN(cartaJogador.atributos[atributoSele]) ||
      isNaN(cartaMaquina.atributos[atributoSele])
    ) {
      htmlResultado = "<p class='resultado-final'>Selecione um atributo !!!</p>"
      divResultado.innerHTML = htmlResultado
      return
    } else {
      htmlResultado =
        "<p class='resultado-final'>Empatou, clique novamente para sortear!</p>"
      break
    }
  }
  divResultado.innerHTML = htmlResultado

  document.getElementById('btnJogar').disabled = true
  document.getElementById('btnSortear').disabled = false
  exibirCartaMaquina()
  exibirPlacar()
}

function exibirCartaJogador() {
  let divCartaJogador = document.getElementById('carta-jogador')
  divCartaJogador.style.backgroundImage = `url("assets/${cartaJogador.imagem}")`
  // divCartaJogador.style.backgroundImage = "url(" + cartaJogador.imagem + ")"
  let moldura =
    '<img src="assets/card1.png" style=" width: inherit; height: inherit; position: absolute;">'
  let tagHTML = "<div id='opcoes' class='carta-status'>"

  let opcoesTexto = ''
  for (let atributo in cartaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      ' : ' +
      cartaJogador.atributos[atributo] +
      '<br>'
  }
  let nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`

  divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + '</div>'
}

function exibirCartaMaquina() {
  let divCartaMaquina = document.getElementById('carta-maquina')
  divCartaMaquina.style.backgroundImage = `url("assets/${cartaMaquina.imagem}")`
  // divCartaJogador.style.backgroundImage = "url(" + cartaJogador.imagem + ")"
  let moldura =
    '<img src="assets/card1.png" style=" width: inherit; height: inherit; position: absolute;">'
  let tagHTML = "<div id='opcoes' class='carta-status'>"

  let opcoesTexto = ''
  for (let atributo in cartaMaquina.atributos) {
    opcoesTexto +=
      "<p type='text' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      ' : ' +
      cartaMaquina.atributos[atributo] +
      '</p>'
  }
  let nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`

  divCartaMaquina.innerHTML = moldura + nome + tagHTML + opcoesTexto + '</div>'
}

function exibirPlacar() {
  var placarJogador = document.getElementById('pJogador')
  var placarComputador = document.getElementById('pMaquina')
  console.log(placarJogador)
  placarJogador.innerHTML = `Jogador: ${placar[0]} 😖`
  placarComputador.innerHTML = `Computador: ${placar[1]} 💀`
}

function zerarCarta(id) {
  var idCarta = document.getElementById(id)
  var idCartaTexto =
    '<img src="assets/card2.png" style="width: inherit; height: inherit; position: absolute;">'
  idCarta.innerHTML = idCartaTexto
}
