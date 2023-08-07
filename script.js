settingsButton.onclick = function(){
    settingsWindow.classList.add('active');
    overlay.classList.add('active');

}

overlay.onclick = function(){
    settingsWindow.classList.remove('active');
    overlay.classList.remove('active');

}

closeSettings.onclick = function(){
    settingsWindow.classList.remove('active');
    overlay.classList.remove('active');
}

let p_segundos = 0;
let p_minutos = 0;
let p_horas = 0;
let i_contarSegundos;

settingsApplyButton.onclick = () => {
    setarTempo(pomodoroTime.value * 60);
    settingsWindow.classList.remove('active');
    overlay.classList.remove('active');
}

color1.onclick = () => {
    var objColor = document.getElementById('loadingCircle');
    var cor = {
        'stroke': '#fa716b'
    };
    Object.assign(objColor.style, cor);
}

color2.onclick = () => {
    var objColor = document.getElementById('loadingCircle');
    var cor = {
        'stroke': '#6ff3f8'
    };
    Object.assign(objColor.style, cor);
}

color3.onclick = () => {
    var objColor = document.getElementById('loadingCircle');
    var cor = {
        'stroke': '#d981f9'
    };
    Object.assign(objColor.style, cor);
}

acao.onclick = () => {
    switch(acao.getAttribute('estado')){
        case 'i':
            acao.setAttribute('estado', 'p')
            acao.innerHTML = 'Parar'
            i_contarSegundos = setInterval(() => {
                contarSegundos(p_segundos);
            }, 1000);
            var obj = document.getElementById('loadingCircle');
            let timerValue = pomodoroTime.value * 60
            let animDuration = timerValue.toString();
            var animar = {
                'animation-name': 'timerAnim',
                'animation-duration': animDuration.concat('s'),
                'animation-timing-function': 'linear',
                'animation-play-state': 'running'
            };
            Object.assign(obj.style, animar);
        break;
        case 'p':
            acao.setAttribute('estado', 'c');
            acao.innerHTML = 'Continuar';
            i_contarSegundos = clearInterval(i_contarSegundos);
            var obj = document.getElementById('loadingCircle');
            var animar = {
                'animation-play-state': 'paused'
            };
            Object.assign(obj.style, animar);
        break;
        case 'c':
            acao.setAttribute('estado', 'p')
            acao.innerHTML = 'Parar'
            i_contarSegundos = setInterval(() => {
                contarSegundos(p_segundos);
            }, 1000)
            var obj = document.getElementById('loadingCircle');
            var animar = {
                'animation-play-state': 'running'
            };
            Object.assign(obj.style, animar);
        break;
    }
}

function setarTempo(segundos){
    if(segundos){
        if(segundos > 59){
            let minutos = parseInt(segundos / 60);
            segundos = parseInt(segundos % 60);
            minuto.innerHTML = minutos < 10 ? `0${minutos}` : minutos;
            p_minutos = minutos;
            segundo.innerHTML = segundos < 10 ? `0${segundos}` : segundos;
            p_segundos = segundos
            if(minutos > 59){
                let horas = parseInt(minutos / 60);
                minutos = parseInt(minutos % 60);
                hora.innerHTML = horas < 10 ? `0${horas}` : horas;
                p_horas = horas;
                minuto.innerHTML = minutos < 10 ? `0${minutos}` : minutos;
                p_minutos = minutos;
            }
            return;
        }
        segundo.innerHTML = segundos < 10 ? `0${segundos}` : segundos;
        p_segundos = segundos
    }else{
        minuto.innerHTML = '00';
        segundo.innerHTML = '00';
    }
}

function contarSegundos(){
    if(p_horas == 0 & p_minutos == 0 & p_segundos == 0){
        segundo.innerHTML = '00';
        clearInterval(i_contarSegundos);
        acao.setAttribute('estado', 'i');
        acao.innerHTML = 'Iniciar'
        return;
    }else{
        if(p_segundos == 0){
            if(p_minutos > 0){
                p_minutos--;
                p_segundos = 60;
                segundo.innerHTML = '60';
            }else{
                p_horas--;
                p_minutos = 59
                minuto.innerHTML = '59';
                p_segundos = 60;
                segundo.innerHTML = '60';
            }
        }
    }
    p_segundos--;
    segundo.innerHTML = p_segundos < 10 ? `0${p_segundos}` : p_segundos;
    minuto.innerHTML = p_minutos < 10 ? `0${p_minutos}` : p_minutos;
    hora.innerHTML = p_horas < 10 ? `0${p_horas}` : p_horas;

}