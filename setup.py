from cx_Freeze import setup, Executable

includefiles = [ 'templates/', 'static/', 'app.py', 'configuracoes.py', 'Configurações.csv']
include = [ 'jinja2', 'jinja2.ext',]

setup(
 name='Tela CCO',
 version = '0.1',
 description = 'Aplicação Flask com tela mostrando horário, previsão do tempo e situação operacional para o CCO',
 options = {'build_exe':   {'include_files':includefiles, 'includes': include,}},
 executables = [Executable('Servidor.py')]
)
