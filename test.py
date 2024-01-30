import requests

# Specify the URL where the Flask server is running
url = 'http://localhost:8000/api/article/uploadfile'

# Path to the file you want to upload
file_path = '/home/f100w/Downloads/Article_12.pdf'
proxies = {
    'http': 'http://127.0.0.1:8080/',
}
# Open the file in binary mode
with open(file_path, 'rb') as file:
    # Construct the files parameter for the request
    files = {'file': file}
    
    # Make the POST request
    response = requests.post(url, files=files, proxies=proxies)

# Check the response from the server
if response.status_code == 200:
    print("File uploaded successfully")
else:
    print("File upload failed")