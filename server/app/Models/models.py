from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, DeclarativeBase
from sqlalchemy.ext.declarative import declarative_base
from flask_login import UserMixin
from flask_bcrypt import generate_password_hash, check_password_hash


Base = declarative_base()

class dbBase(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=dbBase)

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    #id = db.Column(db.Integer, primary_key=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role_id = Column(Integer, nullable=False)

    # Define a relationship to the Favorites table
    favorites = relationship('Favorite', back_populates='user')
    #favorites = db.relationship('Favorite', backref='user')

    def __repr__(self):
        return f'User#{self.id} - Email: {self.email} - role: {self.role_id}'

    def toJSON(self):
        return {
            'id': self.id,
            'email' : self.email,
            'role_id' : self.role_id, 
        }
    def get_id(self):
        return str(self.id)
    
    def set_password(self, password):
        self.password = password

    def set_hashed_password(self, password):
        self.password = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

class TempUser(Base):
    __tablename__ = 'temp_users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    code = Column(Integer, nullable=False)
    creation_timestamp = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP", nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password).decode('utf-8')
    
    def __repr__(self):
        return f'User#{self.id} - Email: {self.email} - code: {self.code}'

    def toJSON(self):
        return {
            'id': self.id,
            'email' : self.email,
        }
    def get_id(self):
        return str(self.id)

    


class Favorit(Base):
    __tablename__ = 'favorites'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    article_id = Column(String(255), nullable=False)

    # Define a relationship to the Users table
    user = relationship('User', back_populates='favorites')

    def __repr__(self):
        return f'Favorite#{self.id} - User#{self.user_id} - Article#{self.article_id}'

    def toJSON(self):
        return {
            'id': self.id,
            'user_id' : self.user_id,
            'article_id' : self.article_id, 
        }

class Token(Base):
    __tablename__ = "tokens_blacklist"

    id = Column(Integer, primary_key=True, autoincrement=True)
    token = Column(String(512), nullable=False)

    def __repr__(self):
        return self.token
    
    def toJSON(self):
        return {
            'token': self.token
        }