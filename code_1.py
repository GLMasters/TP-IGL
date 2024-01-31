from elasticsearch import Elasticsearch

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

#res = addDoc("students",document)

res = client.get(id="4V7QXo0B5XKAVr7ImivD", index="articles")



print(res)
