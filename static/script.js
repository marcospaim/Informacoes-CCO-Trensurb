key = "fec14164a7fd30f21f10fda830ea35dd"
IntervaloOpenweather = 9000000

setInterval(carregar, 1000);

function carregar() {
  document.body.style.cursor="none"
  var today = new Date()
  var month = today.getMonth()+1
  var day = today.getDate()
  var hours = today.getHours()
  var min = today.getMinutes()
  var sec = today.getSeconds()
  var dia_semana = today.getDay()

  var semana = new Array(6)
  semana[0]='Domingo'
  semana[1]='Segunda-Feira'
  semana[2]='Terça-Feira'
  semana[3]='Quarta-Feira'
  semana[4]='Quinta-Feira'
  semana[5]='Sexta-Feira'
  semana[6]='Sábado'


  if (hours<10)
      hours=`0${hours}`
  if (min<10)
      min=`0${min}`
  if (sec<10)
      sec=`0${sec}`

  if (month<10)
      month=`0${month}`
  if (day<10)
      day=`0${day}`

  var hor = document.getElementById("hor").innerText=`${hours}:${min}:${sec}`
  var d_date = document.getElementById("calendario").innerText=`${day}/${month}/${today.getFullYear()} - ${semana[dia_semana]}`
}

carregar()

function buscarStatusOperacao()
{
    fetch(`https://www.trensurb.gov.br/paginas/operacoes.php`)
                    .then((res) => {
                        if (res.status !== 200) {
                            console.log(res.status);
                            return
                        }
                        res.json().then((data) => {
                                console.log(data)
                                trataStatusOperacao(data)
                            })
                            .catch((err) => console.log(err))
                    })
}

function trataStatusOperacao(data) {
    var status = data["status-situacao-operacional"];
    switch (status) {
		case 1:
            document.getElementById("imagem-status").src= "static/SISOP-Normal.bmp"
        case 3:
            document.getElementById("imagem-status").src= "static/SISOP-Interrompida.bmp"
        default:
            document.getElementById("imagem-status").src= "static/SISOP-Alteracao.bmp"
    }
}
buscarStatusOperacao()
setInterval(buscarStatusOperacao, 60000);

function buscarTempoPOA()
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=-29.994722&lon=-51.171111&lang=pt_br&appid=${key}`)
                    .then((res) => {
                        if (res.status !== 200) {
                            console.log(res.status);
                            return
                        }
                        res.json().then((data) => {
                                console.log(data)
                                weather_info_POA(data)
                            })
                            .catch((err) => console.log(err))
                    })
}
function buscarTempoNH()
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=-29.684008529046007&lon=-51.1333604178655&lang=pt_br&appid=fec14164a7fd30f21f10fda830ea35dd`)
                    .then((res) => {
                        if (res.status !== 200) {
                            console.log(res.status);
                            return
                        }
                        res.json().then((data) => {
                                console.log(data)
                                weather_info_NH(data)
                            })
                            .catch((err) => console.log(err))
                    })
}

function weather_info_POA(data){
    var today = new Date()
    var hours = today.getHours()
    var min = today.getMinutes()
    var sec = today.getSeconds()
    document.getElementById("POA-temp").innerText= `${Math.round(data.main.temp - 273.15)} º`
    document.getElementById("POA-wind").innerText= `Ventos: ${Math.round(3.6*data.wind.speed)} km/h`
    document.getElementById("POA-humidity").innerText= `Umidade: ${data.main.humidity}%`
    document.getElementById("POA-img").src= `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.getElementById("POA-atualizado").innerText= `Atualizado às ${hours}:${min}:${sec}`
}

function weather_info_NH(data){
    var today = new Date()
    var hours = today.getHours()
    var min = today.getMinutes()
    var sec = today.getSeconds()
    document.getElementById("NH-temp").innerText= `${Math.round(data.main.temp - 273.15)} º`
    document.getElementById("NH-wind").innerText= `Ventos: ${Math.round(3.6*data.wind.speed)} km/h`
    document.getElementById("NH-humidity").innerText= `Umidade: ${data.main.humidity}%`
    document.getElementById("NH-img").src= `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.getElementById("NH-atualizado").innerText= `Atualizado às ${hours}:${min}:${sec}`
}

buscarTempoPOA()
setInterval(buscarTempoPOA, IntervaloOpenweather);
buscarTempoNH()
setInterval(buscarTempoNH, IntervaloOpenweather);
