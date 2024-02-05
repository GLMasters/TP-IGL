from selenium import webdriver
import unittest

class SearchTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome(executable_path='/path/to/chromedriver')

    def tearDown(self):
        self.driver.quit()

    def test_successful_search(self):
        self.driver.get('http://localhost:5173/')

        search_input = self.driver.find_element_by_id('search_input')
        search_button = self.driver.find_element_by_id('search_button')

        # Perform a successful search
        search_input.send_keys('AI')
        search_button.click()

        # Verify that the search results are displayed
        self.assertIn('Search Results', self.driver.page_source)
        # You may add more specific verifications based on your site's behavior

    def test_empty_search(self):
        # Navigate to the homepage or any other relevant page
        self.driver.get('http://localhost:5173/')

        # Locate the search input field and the submit button
        search_input = self.driver.find_element_by_id('search_input')
        search_button = self.driver.find_element_by_id('search_button')

        # Perform an empty search
        search_input.send_keys('')
        search_button.click()

        self.assertIn('Please enter a search query', self.driver.page_source)

if __name__ == '__main__':
    unittest.main()
