from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token,
    set_access_cookies, jwt_required, get_jwt_identity, unset_access_cookies
)
import json
import os
from dotenv import load_dotenv
import uuid
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from wpRequest import WP_REQUSET



#===== FUNCTINS ======

tem_data = {}

# db section ======

# path of the db (json)
DB_PATH = "db/data.json"

#create the db
def create_db_json() -> None: 
    """create the db (json)"""
    if not os.path.exists(DB_PATH):
        with open(DB_PATH, "w") as f:
            json.dump([], f, indent=4)

    with open(DB_PATH, "r") as f:
        data = f.read()
        if not data:
            with open(DB_PATH, "w") as f:
                json.dump([], f, indent=4)

#get data from db
def get_data_db() -> list: 
    """get data from the db (json) and return it as list"""
    create_db_json()
    with open(DB_PATH, "r") as f:
       data = json.load(f)
    return data

#add data to db
def add_data_db(data: dict) -> None: 
    """add data to the db (json)"""
    
    create_db_json()

    new_data = get_data_db()
    new_data.append(data)
    with open(DB_PATH, "w") as f:
        json.dump(new_data, f, indent=4)

# env section ======

#create env
def create_env_file() -> None:
    """make sure there is env file and it is not empty
    and cteate the secret key"""
    ENV_PATH = ".env"


    def create_secret_key():
        s_key = str(uuid.uuid4())
        return s_key

    secret_key = create_secret_key()
    write_data = f'SECRET_KEY="{secret_key}"\n \
                WP_SECRET_PASSWORD="put ur wp secret password"\n \
                EMAIL="testapiproject69@gmail.com"\n \
                EMAIL_PASS_KEY="kelzcctxtlcqjaan"\n \
                WP_USERNAME="enter ur wp username"'

    if not os.path.exists(ENV_PATH):
        with open(ENV_PATH, "w") as f:
            
            f.write(write_data)

    
    with open(ENV_PATH, "r") as f:
        data = f.read()
        if not data:
            with open(ENV_PATH, "w") as f:
                secret_key = create_secret_key()
                f.write(write_data)


#load secret key
def load_secret_key() -> str:
    """return the secret key as str"""
    create_env_file()
    load_dotenv()
    secret_key = os.getenv("SECRET_KEY")
    return secret_key


#2FA section ======
def two_factor_authentication():
    import random

    list_num = [i for i in range(0, 10)]
    digits = [] 
    for _ in range(2):
        num = str(random.choice(list_num))
        digits.append(num) 
        
    tfa = "".join(digits) 
    return tfa 



def send_email(email, code):
    
    load_dotenv()
    my_email = os.getenv("EMAIL")
    pass_key = os.getenv("EMAIL_PASS_KEY")
    resev_email = email
    
    subject = "2FA"
    msg = MIMEMultipart()
    msg['From'] = my_email
    msg["To"] = resev_email
    msg['Subject'] = subject
    msg.attach(MIMEText(code, 'plain'))
    
    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(my_email, pass_key)
            server.sendmail(my_email, resev_email, msg.as_string())
            return "Verification code has been sent"
    
    except Exception as e:
        return("ERROR:", e)

#===== FLASK =====

app = Flask(__name__)

# configurations
app.config["JWT_SECRET_KEY"] = load_secret_key()
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_SAMESITE"] = "None"
app.config["JWT_COOKIE_SECURE"] = "True"
app.config["JWT_COOKIE_CSRF_PROTECT"] = False



CORS(app, supports_credentials=True)
jwt = JWTManager(app)


#==== ROUTES =====

@app.post("/login")
def login():
    """login, need username and password so it will be post method"""
    # {"Verification": 123456, "temp_id": "....."}
    user_data = request.get_json()


    user_Verification = user_data.get("Verification")
    temp_id = user_data.get("temp_id")
    Verification_code = tem_data[temp_id]
    tem_data.pop(temp_id)
    if user_Verification == Verification_code:
        access_token = create_access_token(identity=str(temp_id))
        res = jsonify({"msg": "log in successful"})
        set_access_cookies(res, access_token)
        return res
        
    return jsonify({"msg": "Verification is worg"})            

@app.post("/tfa_login")
def tfa_login():
    
    #{"un": "ali", "pw": "123"}
    user_data = request.get_json()
    username = user_data.get("username")
    password = user_data.get("password")

    
    data = get_data_db()
    for data_db in data:
        if username == data_db.get("username") and password == data_db.get("password"):
            temp_id = str(data_db.get("id"))
            v_code = two_factor_authentication()
            tem_data[temp_id] = v_code
            msg =  send_email(data_db.get("email"), v_code)
            return jsonify({"msg": msg, "temp_id": temp_id})

    return jsonify({"msg": "username or password is wrong"})


@app.get("/logout")
@jwt_required()
def logout():
    """logout, need nothing so it will be get method"""
    res = jsonify({"msg": "logout successful"})
    unset_access_cookies(res)
    return res




@app.post("/tfa_signup")
def tfa_signup():
    # {"email": "abc@gmail.com"}
    user_email = request.get_json().get("email")
    v_code = two_factor_authentication()
    tem_data[user_email] = v_code
    msg = send_email(user_email, v_code)
    return jsonify({"msg": msg})


@app.post("/signup")
def sign_up():
    """signup, need username email and password so it will be post method"""
    #{"un": "abc", "my_email": "abc@gmail.com", "pw": "123", "Verification": "42626"}
    user_data = request.get_json()

    username = user_data.get("username")
    email = user_data.get("email")
    password = user_data.get("password")
    user_Verification = user_data.get("user_Verification")

    Verification_code = tem_data[email]
    tem_data.pop(email)
    if user_Verification == Verification_code:

        users_db = get_data_db()
        new_id = 0
        if users_db:
            for user in users_db:
                if username == user["username"] or email == user["email"]:
                    return jsonify({"msg": "user exist"})
            new_id = len(users_db) + 1
        new_data = {
            "id": new_id,
            "username": username,
            "email": email,
            "password": password,
            "post": [
                
            ],
            "user": [
                
            ]
        }
        add_data_db(new_data)
        return jsonify({"msg": "user has been added successfully"})
    return jsonify({"msg": "Verification code is not correct"})

@app.get("/get_data")
@jwt_required()
def get_data():
    """get data, need nothing so it will be get method"""
    id = get_jwt_identity()
    print(id)
    db_users = get_data_db()
    for user in db_users:
        if int(id) == user["id"]:
            
            return jsonify({"name": user["username"],"post": user["post"], "user": user["user"]})
        
    return jsonify({"msg": "no data found"})


@app.post("/add_post")
@jwt_required()
def add_post():
    """add post, need the data u want to add so it will be post method"""
    #{"title": "abc", "content": "abc", "status": "publish"}
    data = request.form.get("json")
    json_data = json.loads(data)
    img = request.files.get("img")
    user_id = get_jwt_identity()
    

    title = json_data.get("title")
    content = json_data.get("content")
    status = json_data.get("status")
    load_dotenv()
    username = os.getenv("WP_USERNAME")
    app_password = os.getenv("WP_SECRET_PASSWORD")
    wp = WP_REQUSET(username, app_password)
    new_post = wp.add_post(title, content, status=status, img=img)
    if new_post:
        data_db = get_data_db()
        for user in data_db:
            if user["id"] == int(user_id):
                user["post"].append(new_post)
                
        with open(DB_PATH, "w") as f:
            json.dump(data_db, f, indent=4)
                
                
        return jsonify({"msg": "post added"})
    
    return jsonify({"msg": "Something went wrong"})

@app.delete("/delete_post")
@jwt_required()
def delete_post():
    data = request.get_json()
    post_id_to_del = data.get("postIdWatnToDel")
    user_id = get_jwt_identity()

    load_dotenv()
    username = os.getenv("WP_USERNAME")
    app_password = os.getenv("WP_SECRET_PASSWORD")
    wp = WP_REQUSET(username, app_password)
    del_res = wp.del_post(post_id_to_del)

    deleted_post_id = del_res[0]
    status = del_res[1]

    if status == "trash":
        data_db = get_data_db()
        post_deleted_locally = False

        for user in data_db:
            if user["id"] == int(user_id):
                for post in user["post"]:
                    if post["post_id"] == deleted_post_id:
                        user["post"].remove(post)
                        post_deleted_locally = True
                        break
                if post_deleted_locally:
                    break
        with open(DB_PATH, "w") as f:
            json.dump(data_db, f, indent=4)

        return jsonify({"msg": "Post deleted successfully."}), 200              
        
    return jsonify({"msg": "Failed to delete post from WordPress."}), 400
    
@app.post("/add_user")
@jwt_required()
def add_user():
    """using this end point will let u create user in wp and
      at the same time it will save data of this user in the db (json db)"""
    pass


if __name__ == "__main__":
    app.run(debug=True)
