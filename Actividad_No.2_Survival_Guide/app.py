from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/reglas')
def reglas():
    return render_template('camara_reglas.html')

@app.route('/notas')
def notas():
    return render_template('oraculo_notas.html')

@app.route('/skills')
def skills():
    return render_template('skills.html')

@app.route('/timeline')
def timeline():
    return render_template('linea_tiempo.html')

@app.route('/win')
def win():
    return render_template('you_win.html')

if __name__ == '__main__':
    print("Iniciando servidor en http://0.0.0.0:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
