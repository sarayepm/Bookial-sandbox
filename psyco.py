# Cosas que hacer
# pip install pipenv
# pipenv install flask
# pipenv install psycopg


def submit_to_database(data):
	import psycopg; # type : ignore
	with psycopg.connect(
		host="localhost",
		dbname="postgres", # Name of the database inside the server
		user="postgres", # Located in server > properties
		password="12",
		port=5432
	) as conn:
	
		user_rut = data['rut']
		user_name = data['nombre']
		user_surnames = data['apellido']
		user_password = data['password']
		user_email = data['email']
		user_role = data['cargo']
		# data['curso']

		# Open a cursor to perform database operations
		cur = conn.cursor()
		sentence = """
		  INSERT INTO USERS (user_rut, user_name, user_surnames, user_password, user_email, user_role) 
		  VALUES (%s, %s, %s, %s, %s, %s)
		  RETURNING user_id;"""

		cur.execute(sentence, (user_rut, user_name, user_surnames, user_password, user_email, user_role))
