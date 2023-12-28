import ssl
import smtplib
from Models.models import Token, db
from config import SECRET_KEY, EMAIL, EMAIL_PASSWORD

def isBlacklisted(token):
    tokens = [str(i) for i in db.session.query(Token).all()]

    return (token in tokens)

def blacklistToken(token):
    if (not isBlacklisted(token)):
        token = Token( token=token )
        db.session.add(token)
        db.session.commit()



def send_verif_code(mail,code):
    port = 587  # For starttls
    smtp_server = "smtp.gmail.com"
    sender_email = EMAIL
    receiver_email = mail
    email_password = EMAIL_PASSWORD

    message = f"Subject: Hello there\n\nyour verif code: {code}"

    context = ssl.create_default_context()
    with smtplib.SMTP(smtp_server, port) as server:
        server.ehlo()  # Can be omitted
        server.starttls(context=context)
        server.ehlo()  # Can be omitted
        server.login(sender_email, email_password)
        server.sendmail(sender_email, receiver_email, message)