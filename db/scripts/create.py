from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


# This is temp

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role_id = Column(Integer, nullable=False)

    # Define a relationship to the Favorites table
    favorites = relationship('Favorite', back_populates='user')

    def __repr__(self):
        return f'User#{self.id} - Email: {self.email} - role: {self.role_id}'

    def toJSON(self):
        return {
            'id': self.id,
            'email' : self.email,
            'role_id' : self.role_id, 
        }

class Favorite(Base):
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
            'article_id' : self.article_id_id, 
        }   
 