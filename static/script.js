// função "principal", pega horário atual, e atualiza dentro da página HTML. Depois do tempo estipulado de 6 segundos (no setTimeout valor 6000 milisegundos), vai para a função mudar().
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

  setTimeout(function() {
      carregar();
  }, 1000);
  setTimeout(mudar, 8000)
}

carregar()