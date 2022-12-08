import csv
import os
def get_config():
    path = os.path.dirname(__file__)
    directory = os.path.abspath(os.path.join(os.path.abspath(os.path.join(path, os.pardir)), os.pardir))
    #directory = path
    directory = directory+'/Configurações.csv'
    with open(directory, 'r', newline='') as f:
        reader = csv.reader(f)
        data = list(reader)
    return data[1][0], data[1][1], data[1][2] # OpenWeather key, port e host


if __name__ == "__main__":
    get_config()