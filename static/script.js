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
    fetch(`http://127.0.0.1:5000/status`)
                    .then((res) => {
                        if (res.status !== 200) {
                            console.log(res.status);
                            return
                        }
                        res.json().then((data) => {
                                console.log(data)
                                document.getElementById("imagem-status").src= `static/${data.imagem}`
                                //trataStatusOperacao(data)
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
    fetch(`http://127.0.0.1:5000/infoPOA`)
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
    fetch(`http://127.0.0.1:5000/infoNH`)
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
    if (hours<10)
      hours=`0${hours}`
    if (min<10)
        min=`0${min}`
    if (sec<10)
        sec=`0${sec}`

    document.getElementById("POA-temp").innerText= `${data.temp} º`
    document.getElementById("POA-wind").innerText= `Ventos: ${data.speed} km/h`
    document.getElementById("POA-humidity").innerText= `Umidade: ${data.humidity}%`
    document.getElementById("POA-img").src= `${data.icon}`
    document.getElementById("POA-atualizado").innerText= `Atualizado às ${data.time}`
}

function weather_info_NH(data){
    var today = new Date()
    var hours = today.getHours()
    var min = today.getMinutes()
    var sec = today.getSeconds()
    if (hours<10)
      hours=`0${hours}`
    if (min<10)
        min=`0${min}`
    if (sec<10)
        sec=`0${sec}`

    document.getElementById("NH-temp").innerText= `${data.temp} º`
    document.getElementById("NH-wind").innerText= `Ventos: ${data.speed} km/h`
    document.getElementById("NH-humidity").innerText= `Umidade: ${data.humidity}%`
    document.getElementById("NH-img").src= `${data.icon}`
    document.getElementById("NH-atualizado").innerText= `Atualizado às ${data.time}`
}

buscarTempoPOA()
setInterval(buscarTempoPOA, IntervaloOpenweather);
buscarTempoNH()
setInterval(buscarTempoNH, IntervaloOpenweather);
