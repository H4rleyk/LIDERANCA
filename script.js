document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o envio do formulário e recarregamento da página

    // Coleta as respostas
    const respostas = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value,
        q4: document.querySelector('input[name="q4"]:checked')?.value,
        q5: document.querySelector('input[name="q5"]:checked')?.value,
        q6: document.querySelector('input[name="q6"]:checked')?.value,
        q7: document.querySelector('input[name="q7"]:checked')?.value,
        q8: document.querySelector('input[name="q8"]:checked')?.value,
        q9: document.querySelector('input[name="q9"]:checked')?.value,
        q10: document.querySelector('input[name="q10"]:checked')?.value
    };

    // Verifica se todas as perguntas foram respondidas
    if (Object.values(respostas).includes(undefined)) {
        alert("Por favor, responda todas as perguntas.");
        return;
    }

    // Inicializa os pontos para cada estilo de liderança
    let pontosAutocratica = 0;
    let pontosDemocratica = 0;
    let pontosTransformacional = 0;
    let pontosLaissezFaire = 0;
    let pontosCoaching = 0;

    // Define a ponderação para cada resposta
    const ponderacoes = {
        A: { Autocratica: 5, Democratica: 1, Transformacional: 2, LaissezFaire: 3, Coaching: 1 },
        B: { Autocratica: 2, Democratica: 5, Transformacional: 3, LaissezFaire: 4, Coaching: 3 },
        C: { Autocratica: 1, Democratica: 3, Transformacional: 5, LaissezFaire: 4, Coaching: 5 },
        D: { Autocratica: 2, Democratica: 4, Transformacional: 3, LaissezFaire: 5, Coaching: 2 },
        E: { Autocratica: 3, Democratica: 2, Transformacional: 4, LaissezFaire: 1, Coaching: 4 }
    };

    // Soma os pontos com base nas respostas
    for (let pergunta in respostas) {
        if (respostas[pergunta]) {
            let resposta = respostas[pergunta];
            pontosAutocratica += ponderacoes[resposta].Autocratica;
            pontosDemocratica += ponderacoes[resposta].Democratica;
            pontosTransformacional += ponderacoes[resposta].Transformacional;
            pontosLaissezFaire += ponderacoes[resposta].LaissezFaire;
            pontosCoaching += ponderacoes[resposta].Coaching;
        }
    }

    // Determina o tipo de liderança com maior pontuação
    let tipoLideranca = '';
    let maxPontos = Math.max(pontosAutocratica, pontosDemocratica, pontosTransformacional, pontosLaissezFaire, pontosCoaching);

    if (maxPontos === pontosAutocratica) {
        tipoLideranca = 'Liderança Autocrática';
    } else if (maxPontos === pontosDemocratica) {
        tipoLideranca = 'Liderança Democrática';
    } else if (maxPontos === pontosTransformacional) {
        tipoLideranca = 'Liderança Transformacional';
    } else if (maxPontos === pontosLaissezFaire) {
        tipoLideranca = 'Liderança Laissez-faire';
    } else {
        tipoLideranca = 'Liderança Coaching/Transformadora';
    }

    // Definição dos pontos fortes, fracos e a descrição de cada tipo de liderança
    const explicacoes = {
        'Liderança Autocrática': {
            descricao: 'O líder autocrático toma todas as decisões sozinho e gosta de controlar tudo. Ele espera que sua equipe siga suas ordens sem questionamentos, sem dar muita liberdade ou espaço para a colaboração. Esse líder foca em resultados rápidos, muitas vezes impondo regras rígidas e mantendo uma estrutura bem definida. Ele costuma ser mais direto e não oferece muita explicação para as decisões, funcionando melhor em situações de emergência ou quando é necessário agir rapidamente..',
            pontosFortes: 'O líder autocrático é decisivo e assertivo, garantindo que as decisões sejam tomadas rapidamente e que as metas sejam alcançadas sem rodeios. Ele consegue manter o controle total sobre o processo e as ações da equipe, o que é útil em situações de emergência ou quando é necessário um alto grau de disciplina e produtividade. Ele também tende a ser claro nas expectativas, o que minimiza confusão e maximiza a eficiência.',
            pontosFracos: 'Pouca participação da equipe, pode gerar desmotivação.'
        },
        'Liderança Democrática': {
            descricao: 'O líder democrático valoriza a opinião da sua equipe e busca sempre ouvir todos antes de tomar decisões. Ele promove um ambiente de colaboração, onde todos têm voz e a equipe se sente motivada e engajada. Esse líder tenta alcançar o consenso nas decisões, mantendo todos envolvidos e bem informados, o que faz com que as pessoas se sintam mais respeitadas e comprometidas com os resultados do trabalho..',
            pontosFortes: 'O líder democrático promove um ambiente de colaboração e envolvimento, permitindo que todos os membros da equipe participem ativamente das decisões. Isso fortalece o moral do time, já que todos se sentem valorizados e ouvidos. Ele é ótimo para criar um clima de confiança e lealdade, ajudando a aumentar o engajamento e a criatividade, além de fomentar o trabalho em equipe e a comunicação aberta.',
            pontosFracos: 'Pode ser ineficiente em situações que exigem decisões rápidas.'
        },
        'Liderança Transformacional': {
            descricao: 'O líder transformacional é inspirador e motivador, com uma visão clara do futuro que consegue compartilhar de forma empolgante com sua equipe. Ele foca no desenvolvimento individual de cada membro, estimulando-os a ir além do esperado. Esse líder busca inovação, mudança e desafios constantes, encorajando sua equipe a ser criativa e a pensar fora da caixa, o que leva a grandes conquistas e resultados extraordinários..',
            pontosFortes: 'O líder transformacional é inspirador e visionário, focado no desenvolvimento pessoal e no empoderamento de sua equipe. Ele motiva os membros a irem além de suas capacidades, encorajando a inovação e o crescimento contínuo. Seu estilo cria um ambiente positivo e de alto desempenho, onde todos são incentivados a contribuir com suas melhores ideias, sendo um grande motivador para mudanças e adaptações a novos desafios.',
            pontosFracos: 'Pode ser idealista e difícil de implementar.'
        },
        'Liderança Laissez-faire': {
            descricao: 'O líder laissez-faire dá total liberdade à sua equipe, permitindo que todos tomem suas próprias decisões. Ele confia plenamente nas habilidades dos membros da equipe e prefere não interferir, a menos que seja necessário. Esse estilo funciona bem quando a equipe é experiente e sabe o que fazer, mas pode ser problemático se os membros não souberem como se organizar sozinhos, o que pode levar a um trabalho mais desestruturado.',
            pontosFortes: 'O líder laissez-faire acredita na autonomia e na liberdade dos membros da equipe, dando-lhes total controle sobre suas tarefas. Ele confia nas habilidades de sua equipe e oferece o espaço necessário para que as pessoas possam trabalhar da maneira que considerarem mais adequada. Esse estilo funciona bem com equipes altamente qualificadas e autônomas, que têm um forte senso de responsabilidade e precisam de pouca supervisão.',
            pontosFracos: 'Pode faltar controle e direcionamento.'
        },
        'Liderança Coaching/Transformadora': {
            descricao: 'O líder coaching foca no crescimento e desenvolvimento da sua equipe, atuando como um mentor. Ele oferece feedbacks constantes, conselhos e orientação para que todos possam melhorar suas habilidades. Esse líder investe tempo e energia no aprimoramento contínuo de seus colaboradores, ajudando-os a atingir seu potencial máximo e a se tornarem melhores profissionais.',
            pontosFortes: 'O líder coaching é aquele que foca no desenvolvimento individual dos membros da equipe, atuando como mentor. Ele fornece orientação, feedback constante e apoio para ajudar cada pessoa a alcançar seu máximo potencial. Esse estilo é muito eficaz para ajudar os colaboradores a melhorar suas habilidades e aumentar sua confiança, promovendo um ambiente de aprendizado contínuo e crescimento pessoal.',
            pontosFracos: 'Pode ser desafiador em ambientes de alta pressão.'
        }
    };

    // Exibe o resultado logo abaixo do formulário
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');

    resultContainer.innerHTML = `
        <h3>${tipoLideranca}</h3>
        <p>${explicacoes[tipoLideranca].descricao}</p>
        <p><strong>Pontos Fortes:</strong> ${explicacoes[tipoLideranca].pontosFortes}</p>
        <p><strong>Pontos Fracos:</strong> ${explicacoes[tipoLideranca].pontosFracos}</p>
    `;

    // Adiciona o resultado logo abaixo do formulário
    document.getElementById('quizForm').after(resultContainer);

    // Reseta o formulário
    document.getElementById('quizForm').reset();
});

// Adicionar evento para o botão de reinício
document.getElementById('restart-button').addEventListener('click', function() {
    // Remove o resultado e reseta o formulário
    document.getElementById('quizForm').reset();
    const resultContainer = document.querySelector('.result-container');
    if (resultContainer) {
        resultContainer.remove();
    }
});
