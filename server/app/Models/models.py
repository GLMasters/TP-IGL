from app import db


class Utilisateur(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(1024), unique=True, nullable=False)
    password = db.Column(db.String(1024), nullable=False)
    role_id = db.Column(db.Integer , unique = False , nullable = False)#Enum (guest, admin , mod)

    def __repr__(self):
        return f'User#{self.id}. Email : {self.email}'

    def toJSON(self):
        return {
            'id': self.id,
            'email' : self.email,
            'role_id' : self.role_id, 
        }
 