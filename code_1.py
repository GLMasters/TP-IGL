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

# def addDoc(index,doc):
#     res = client.index(index=index,document=doc)
#     return res


document = {
    "name": "smail",
    "grade": "1CS"
}

# res = addDoc("students",document)

def update(id):
    res = client.get(index="articles", id=id)

    new_doc = res['_source']
    
    new_doc['approved'] = False

    # print(new_doc)
    res= client.update(index="articles", id=id, doc=new_doc)

ids = ["_v0rdo0BbJKVEZMd0w2a","__0sdo0BbJKVEZMdQA2b", "AP0tdo0BbJKVEZMdCQ5l"]

# for i in ids:
#     update(i)

# res = client.delete(index="articles", id="_v0rdo0BbJKVEZMd0w2a")

res = client.get(index="articles",id="ncbpeI0BgsF-XUC2qgoc")
print(res)
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