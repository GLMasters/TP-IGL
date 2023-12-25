

class Article():

    def __init__(self,title,summary,authors,institutions,keywords,content, url, references):
        self.title = title
        self.summary = summary
        self.authors= authors
        self.institutions = institutions
        self.keywords = keywords
        self.content = content
        self.url = url
        self.references = references
    

    def toJSON(self):
        return {
            "title"        : self.title,
            "summary"      : self.summary,
            "authors"      : self.authors,
            "institutions" : self.institutions,
            "keywords"     : self.keywords,
            "content"      : self.content,
            "url"          : self.url,
            "references"   : self.references
        }
