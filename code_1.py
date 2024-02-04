from elasticsearch import Elasticsearch
from openai import OpenAI

ELASTIC_PASSWORD = "password"

# Create the client instance
client = Elasticsearch(
    "https://localhost:9200",
    ca_certs="certs/ca/ca.crt",
    basic_auth=("elastic", ELASTIC_PASSWORD)
) 

# Successful response!
client.info()

def addDoc(index,doc):
    res = client.index(index=index,document=doc)
    return res


document = {
    "name": "smail",
    "grade": "1CS"
}

# res = addDoc("students",document)
res = client.get(index="articles", id="WlGsdI0BhO3lzsYNpZYe")

# res = client.post()
# client = OpenAI(api_key="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")
# response = client.chat.completions.create(
#     model="gpt-3.5-turbo",
#         messages= [   
#             {"role": "system", "content": '''\
# Hello there
# ''' 
#             }
#         ]
        
#     )



print(res)