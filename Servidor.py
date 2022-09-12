# Servidor do Sistema
# Chama a Aplicação Flask
# 25_11_2020
# Riboldi

from gevent.pywsgi import WSGIServer
#from yourapplication import app
from app import app
import configuracoes

openWeatherKey, PORTA, IP_HOST = configuracoes.get_config()
PORTA = int(PORTA)

http_server = WSGIServer((IP_HOST, PORTA), app)# PODERÁ AJUSTAR O IP E PORTA
http_server.serve_forever()
