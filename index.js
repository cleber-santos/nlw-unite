/*

// objeto javascript
const participante = {
    nome: "Cleber Santos",
    email: "cleber@email.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 15)
}

//array
let participantes = [
    {
        nome: "Cleber Santos",
        email: "cleber@email.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 15)
    },
]

*/

let participantes = [
    {
        nome: "Cleber Santos",
        email: "cleber@email.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 15)
    },
    {
        nome: "João Neto",
        email: "jneto@email.com",
        dataInscricao: new Date(2023, 2, 18, 17, 20),
        dataCheckIn: null
    },
    {
        nome: "Maria Silva",
        email: "maria@email.com",
        dataInscricao: new Date(2024, 1, 15, 14, 30),
        dataCheckIn: new Date(2024, 2, 20, 18, 45)
    },
    {
        nome: "Carlos Oliveira",
        email: "carlos@email.com",
        dataInscricao: new Date(2023, 11, 10, 10, 0),
        dataCheckIn: new Date(2024, 0, 8, 12, 10)
    },
    {
        nome: "Ana Pereira",
        email: "ana@email.com",
        dataInscricao: new Date(2024, 2, 1, 9, 45),
        dataCheckIn: null
    },
    {
        nome: "Pedro Almeida",
        email: "pedro@email.com",
        dataInscricao: new Date(2023, 8, 5, 16, 10),
        dataCheckIn: new Date(2024, 1, 2, 17, 30)
    },
    {
        nome: "Sara Costa",
        email: "sara@email.com",
        dataInscricao: new Date(2024, 0, 25, 10, 5),
        dataCheckIn: new Date(2024, 1, 28, 14, 25)
    },
    {
        nome: "Ricardo Sousa",
        email: "ricardo@email.com",
        dataInscricao: new Date(2023, 10, 12, 15, 20),
        dataCheckIn: new Date(2024, 1, 10, 18, 30)
    },
    {
        nome: "Mariana Santos",
        email: "mariana@email.com",
        dataInscricao: new Date(2023, 6, 30, 13, 40),
        dataCheckIn: new Date(2024, 1, 28, 16, 55)
    },
    {
        nome: "Luiz Fernandes",
        email: "luiz@email.com",
        dataInscricao: new Date(2024, 2, 12, 8, 15),
        dataCheckIn: new Date(2024, 2, 14, 10, 40)
    }
]

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null) {
        dataCheckIn = `
        <button data-email="${participante.email}" onclick="fazerCheckIn(event)">Confirmar check-in</button>
        `
    }
    
    return `
    <tr>
        <td>
            <strong>${participante.nome}</strong>
            <br>
            <small>${participante.email}</small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""
    
    // estrutura de repetição - loop
    for(let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }
    
    // substituir informações do HTML
    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    //verificar se o participante já existe
    const participanteExiste = participantes.find((p) =>{
        return p.email == participante.email
    })
    if (participanteExiste) {
        alert('E-mail já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]

    atualizarLista(participantes)

    //limpar o formulario
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    //comfirmar se realmente quer o check-in
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
    if (confirm(mensagemConfirmacao) == false) {
        return
    }
    
    //encontrar o participante dentro da lista
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })

    // atualizar o check-in do participante
    participante.dataCheckIn = new Date()

    // atualizar a lista de participantes
    atualizarLista(participantes)
}