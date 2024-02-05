import unittest
from app import app

class TestAuthFlow(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_user_login(self):
        login_data = {'email': 'chergueliane.oussama@gmail.com', 'password': 'passwordKeySami1234'}
        login_response = self.app.post('/api/auth/login', data=login_data)
        self.assertEqual(login_response.status_code, 200)

        login_result = login_response.json
        self.assertIn('token', login_result)
        token = login_result['token']

        self.token = token

    def test_get_articles(self):
        # Assurez-vous que le token est disponible depuis le test précédent
        if not hasattr(self, 'token'):
            self.fail("Le token n'est pas disponible. Assurez-vous que le test_user_login a réussi.")

        # Envoi de la requête GET protégée à l'aide du token
        headers = {'Authorization': f'Bearer {self.token}'}
        protected_response = self.app.get('/api/articles/approved', headers=headers)

        self.assertEqual(protected_response.status_code, 200)
        self.assertEqual(protected_response.result , True)
        self.assertIn(b'Donnees protegees', protected_response.data)

if __name__ == '__main__':
    unittest.main()
