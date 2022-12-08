from flask import Flask, render_template, make_response
from datetime import datetime
import requests
from threading import Timer
from configuracoes import get_config


TEMPO_WEATHER = 900
TEMPO_STATUS = 60

#OPEN_WEATHER_KEY = 'fec14164a7fd30f21f10fda830ea35dd'
#PORT=5245
#HOST='127.0.0.1'
openWeatherKey, port, host = get_config()

info_POA = {}
info_NH = {}
status_op = {}

app = Flask(__name__)

def kelvinToCelsius(kelvin):
    return round(kelvin - 273.15)

def newTimer():
        t=Timer(TEMPO_WEATHER, timeout)
        t.start()

def timeout():
        with app.app_context():
            newTimer()
            try:
                response_POA = requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat=-29.994722&lon=-51.171111&lang=pt_br&appid={openWeatherKey}", verify=False)
                response_POA = response_POA.json()

                info_POA["icon"] = f"static/{response_POA['weather'][0]['icon']}@2x.png"
                info_POA["speed"] = round(3.6*response_POA['wind']['speed'], 1) # converter de m/s para km/h e arredondar para 1 casa decimal
                info_POA["temp"] = kelvinToCelsius(response_POA['main']['temp'])
                info_POA["humidity"] = response_POA['main']['humidity']

                now = datetime.now()
                current_time = now.strftime("%H:%M:%S")
                info_POA["time"] = current_time

                response_NH = requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat=-29.684008529046007&lon=-51.1333604178655&lang=pt_br&appid={openWeatherKey}", verify=False)
                response_NH = response_NH.json()

                info_NH["icon"] = f"static/{response_NH['weather'][0]['icon']}@2x.png"
                info_NH["speed"] = round(3.6*response_NH['wind']['speed'], 1)
                info_NH["temp"] = kelvinToCelsius(response_NH['main']['temp'])
                info_NH["humidity"] = response_NH['main']['humidity']
                info_NH["time"] = current_time

            except:
                print("Nao foi possivel conectar-se com o openweather")

timeout()

def newTimer_status():
        t=Timer(TEMPO_STATUS, ler_status)
        t.start()

def ler_status():
    with app.app_context():
        newTimer_status()
        try:
            response = requests.get("https://www.trensurb.gov.br/paginas/operacoes.php", verify=False).json()
            if(response['status-situacao-operacional'] == 1): #operação normal
                status_op["imagem"] = "SISOP-Normal.bmp"
            elif(response['status-situacao-operacional'] == 3): #paralização total 
                status_op["imagem"] = "SISOP-Interrompida.bmp"
            else: #operação com alteração
                status_op["imagem"] = "SISOP-Alteracao.bmp"
        except:
            print("Nao foi possivel conectar-se")

ler_status()

@app.route("/")
def hello_world():
    return render_template("page.html", raspi=False)

@app.route("/raspi")
def raspi():
    return render_template("page.html", raspi=True)
    
@app.route("/status")
def status():
    return status_op, 200

@app.route("/infoPOA")
def infoPOA():
    return info_POA, 200

@app.route("/infoNH")
def infoNH():
    return info_NH, 200

# Função usada para clientes testarem conexão com servidor (ver  o JS das páginas HTML)
@app.route('/pingpong')
def pingpong():
    response = make_response("PingPong Funcionando")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(host=host, port=port, debug=False, threaded=True)