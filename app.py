from flask import Flask, render_template
from datetime import datetime, timedelta
import requests
from threading import Timer

OPEN_WEATHER_KEY = 'fec14164a7fd30f21f10fda830ea35dd'
TEMPO_WEATHER = 600
info_POA = {}
info_NH = {}

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
                response_POA = requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat=-29.994722&lon=-51.171111&lang=pt_br&appid={OPEN_WEATHER_KEY}", verify=False)
                response_POA = response_POA.json()

                info_POA["icon"] = f"http://openweathermap.org/img/wn/{response_POA['weather'][0]['icon']}@2x.png"
                info_POA["speed"] = round(3.6*response_POA['wind']['speed'], 1) # converter de m/s para km/h e arredondar para 1 casa decimal
                info_POA["temp"] = kelvinToCelsius(response_POA['main']['temp'])
                info_POA["humidity"] = response_POA['main']['humidity']

                now = datetime.now()
                current_time = now.strftime("%H:%M:%S")
                info_POA["time"] = current_time

                response_NH = requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat=-29.684008529046007&lon=-51.1333604178655&lang=pt_br&appid={OPEN_WEATHER_KEY}", verify=False)
                response_NH = response_NH.json()

                info_NH["icon"] = f"http://openweathermap.org/img/wn/{response_NH['weather'][0]['icon']}@2x.png"
                info_NH["speed"] = round(3.6*response_NH['wind']['speed'], 1)
                info_NH["temp"] = kelvinToCelsius(response_NH['main']['temp'])
                info_NH["humidity"] = response_NH['main']['humidity']
                info_NH["time"] = current_time

            except:
                print("Nao foi possivel conectar-se com o openweather")
timeout()


def ler_status():
    try:
        response = requests.get("https://www.trensurb.gov.br/paginas/operacoes.php", verify=False).json()
        if(response['status-situacao-operacional'] == 1): #operação normal
            return "SISOP-Normal.bmp"
        elif(response['status-situacao-operacional'] == 3): #paralização total 
            return "SISOP-Interrompida.bmp"
        else: #operação com alteração
            return "SISOP-Alteracao.bmp"
    except:
        print("Nao foi possivel conectar-se")
        return None

@app.route("/")
def hello_world():
    imagem = ler_status() 
    return render_template("page.html", imagem = imagem, info_POA = info_POA, info_NH = info_NH)
    