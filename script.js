opcoes.onclick = function(){
    pomodoro_settings.classList.add('active');
    overlay.classList.add('active');

}

overlay.onclick = function(){
    pomodoro_settings.classList.remove('active');
    overlay.classList.remove('active');

}

fechar.onclick = function(){
    pomodoro_settings.classList.remove('active');
    overlay.classList.remove('active');

}

// Código do Pomodoro

let p_segundos = 0;
let p_minutos = 0;
let p_horas = 0;
let i_contarSegundos;

pomodoroTime.onkeyup = () => {
    setarTempo(pomodoroTime.value);
}

pomodoroTime.onclick = () => {
    setarTempo(pomodoroTime.value);
}

acao.onclick = () => {
    switch(acao.getAttribute('estado')){
        case 'i':
            acao.setAttribute('estado', 'p')
            acao.innerHTML = 'Parar'
            i_contarSegundos = setInterval(() => {
                contarSegundos(p_segundos);
            }, 100)
        break;
        case 'p':
            acao.setAttribute('estado', 'c');
            acao.innerHTML = 'Continuar';
            i_contarSegundos = clearInterval(i_contarSegundos);
        break;
        case 'c':
            acao.setAttribute('estado', 'p')
            acao.innerHTML = 'Parar'
            i_contarSegundos = setInterval(() => {
                contarSegundos(p_segundos);
            }, 100)
        break;
    }
}

function setarTempo(segundos){
    // Verifica se "segundos" é um número válido
    if(segundos){
        // Verifica se "segundos" é maior que 59
        if(segundos > 59){
            // Caso seja, fazemos o cálculo para definir os minutos e segundos
            let minutos = parseInt(segundos / 60);
            segundos = parseInt(segundos % 60);
            // Ternário para checar se "minutos" é menor que 10. Caso seja, adiciona "0" na frente
            minuto.innerHTML = minutos < 10 ? `0${minutos}` : minutos;
            
            // Atribuindo minutos a uma variável global
            p_minutos = minutos;
            
            // Ternário para checar se "segundos" é menor que 10. Caso seja, adiciona "0" na frente
            segundo.innerHTML = segundos < 10 ? `0${segundos}` : segundos;
            // Atribuindo segundos a uma variável global
            p_segundos = segundos
            return;
        }
        if(minutos > 59){
            let horas = parseInt(minutos / 60);
            minutos = parseInt(minutos % 60);
            hora.innerHTML = horas < 10 ? `0${horas}` : horas;
            p_horas = horas;
            return
        }
        // Ternário para checar se "segundos" é menor que 10. Caso seja, adiciona "0" na frente
        segundo.innerHTML = segundos < 10 ? `0${segundos}` : segundos;
        // Atribuindo segundos a uma variável global
        p_segundos = segundos
    }else{
        minuto.innerHTML = '00';
        segundo.innerHTML = '00';
    }
}

function contarSegundos(){
    if(p_minutos == 0 & p_segundos == 0){
        segundo.innerHTML = '00';
        clearInterval(i_contarSegundos);
        acao.setAttribute('estado', 'i');
        acao.innerHTML = 'Iniciar'
        return;
    }else{
        if(p_segundos == 0){
            p_segundos = 59;
            p_minutos--;
            minuto.innerHTML = p_minutos < 10 ? `0${p_minutos}` : p_minutos;
            segundo.innerHTML = '59';
            return
        }
    }
    p_segundos--;
    segundo.innerHTML = p_segundos < 10 ? `0${p_segundos}` : p_segundos;
}