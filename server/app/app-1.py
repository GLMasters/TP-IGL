


from flask import Flask, jsonify , request , session
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
import mysql.connector

#app configuration 
app = Flask(__name__)
CORS(app, support_credentials=True)
app.config["CORS_EXPOSE_HEADERS"] = "*"


db_config = {
    'user': 'user_db',
    'password': 'passwd',
    'host': 'localhost',
    'database': 'doclib',
    'port' : 33006, 
    'auth_plugin': 'mysql_native_password'
}

# Fonction d'enregistrement (register)
def register_function(request):
    try:
        # Récupérer les données du formulaire
        email = request.json['email']
        password = request.json['password']
        id_role = request.json['id_role']
        # Établir une connexion à la base de données
        connection = mysql.connector.connect(**db_config)
        print("request done")

        # Créer un objet curseur pour exécuter des requêtes SQL
        cursor = connection.cursor()

        # Vérifier si l'utilisateur existe déjà
        cursor.execute("SELECT * FROM utilisateur WHERE email = %s", (email))
        user = cursor.fetchone()

        if user is None:
            # Insérer un nouvel utilisateur dans la base de données
            cursor.execute("INSERT INTO utilisateur (email, password, id_role) VALUES (%s, %s, %s)", (email, password, id_role))
            connection.commit()

            # Récupérer l'ID de l'utilisateur nouvellement inséré
            cursor.execute("SELECT LAST_INSERT_ID()")
            user_id = cursor.fetchone()[0]

            # Fermer la connexion et le curseur
            cursor.close()
            connection.close()

            return jsonify({"user_id": user_id, "message": "Enregistrement réussi."})

        else:
            return jsonify({"message": "L'utilisateur existe déjà."})

    except Exception as e:
        return jsonify({"error": str(e)})

# Route pour l'enregistrement
@app.route('/api/user/register', methods=['POST'])
def register():
    print ("here")
    return register_function(request)


