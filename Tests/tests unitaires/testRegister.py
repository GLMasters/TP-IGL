import unittest
from app import app

class TestRegisterFunction(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_register_endpoint(self):
        data = {'email': 'cherguelaine.oussama@gmail.com', 'password': 'secretPassword1234'}

        # Envoi de la requête POST à /api/auth/register
        response = self.app.post('/api/auth/register', data=data)

        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Utilisateur enregistre avec succes', response.data)

if __name__ == '__main__':
    unittest.main()
