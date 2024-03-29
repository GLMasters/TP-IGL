from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship,DeclarativeBase
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from flask_bcrypt import generate_password_hash, check_password_hash

Base = declarative_base()

class dbBase(DeclarativeBase):
    pass
db = SQLAlchemy(model_class=dbBase)

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role_id = Column(Integer, nullable=False)

    favorites = relationship('Favorite', back_populates='user')
    moderators = relationship('Moderator', back_populates='user')
    
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

class Favorite(Base):
    __tablename__ = 'favorites'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    article_id = Column(String(255), nullable=False)

    user = relationship('User', back_populates='favorites')
    
    def __repr__(self):
        return f'Favorite#{self.id} - User#{self.user_id} - Article#{self.article_id}'

    def toJSON(self):
        return {
            'id': self.id,
            'user_id' : self.user_id,
            'article_id' : self.article_id, 
        }

class Moderator(Base):
    __tablename__ = 'moderators'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(255))
    address = Column(String(255))
    user_id = Column(Integer, ForeignKey('users.id'), unique=True, nullable=False)

    user = relationship('User', back_populates='moderators')
    
    def __repr__(self):
        return f"Mod#{self.id};Name#{self.name}"
    
    def toJSON(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "phone": self.phone,
            "address": self.address,
            "email": self.email
        }

class TempUser(Base):
    __tablename__ = 'temp_users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    code = Column(Integer, nullable=False)
    creation_timestamp = Column(TIMESTAMP, nullable=False)
    
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

class Article():

    def __init__(self,title,summary,authors,institutions,keywords,content, references):
        self.title = title
        self.summary = summary
        self.authors= authors
        self.institutions = institutions
        self.keywords = keywords
        self.content = content
        self.references = references
        self.approved = False
        self.url=None
        self.id=None
    
    def set_url(self,url):
        self.url = url
    
    def set_id(self,id):
        self.id = id
    
    def set_approved(self,val):
        self.approved = val
    
    def toJSON(self):
        obj = {
            "title"        : self.title,
            "summary"      : self.summary,
            "authors"      : self.authors,
            "institutions" : self.institutions,
            "keywords"     : self.keywords,
            "content"      : self.content,
            "references"   : self.references,
            "approved": self.approved
        }
        
        if self.url:
            obj['url'] = self.url
            
        if self.id:
            obj['id'] = self.id
        
        return obj