from flask import Flask, render_template, redirect, request, session; # type: ignore
from psyco import submit_to_database;
app = Flask(__name__)
app.secret_key = "qwerasdfzxcv"

@app.route('/')
def root():
	return render_template('public/register.html', title="Root")

@app.route('/form', methods=['POST'])
def form():
	print(request.form)
	session['nombre'] = request.form['nombre']
	session['apellido'] = request.form['apellido']
	session['rut'] = request.form['rut']
	session['email'] = request.form['email']
	session['cargo'] = request.form['cargo']
	# session['curso'] = request.form['curso']
	session['password'] = request.form['password']

	print(session)

	submit_to_database(session)
	return redirect('/login')

@app.route('/login')
def exito():
	return render_template('public/login.html')



if __name__ == "__main__":
	app.run(debug = True)