# ce test est dédié pour le test de login

from selenium import webdriver
import unittest

class AuthenticationTest(unittest.TestCase):
    def setUp(self):
        # Configure Flask for testing (if needed)
        # app.config['TESTING'] = True
        # self.app = app.test_client()

        # Start Chrome WebDriver
        self.driver = webdriver.Chrome(executable_path='/path/to/chromedriver')

    def tearDown(self):
        # Clean up after the test
        self.driver.quit()

    def test_successful_authentication(self):
        # Navigate to the login page
        # need to confirm that the backend works
        self.driver.get('http://localhost:5173/')

        # Locate username and password input fields, and the submit button
        search_input = self.driver.find_element_by_id('email')
        submit_button = self.driver.find_element_by_id('submit_button')
        search_input.send_keys('lo_cherguelaine@esi.dz')

        submit_button.click()

        # verification that we are in the home page
        self.assertIn('Résulats', self.driver.page_source)


if __name__ == '__main__':
    unittest.main()
