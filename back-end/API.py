from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token,
    set_access_cookies, jwt_required, get_jwt_identity
)
import json
import os
from dotenv import load_dotenv
import uuid



#===== FUNCTINS ======

# db section ======

# path of the db (json)
DB_PATH = "data.json"

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
def get_data() -> list: 
    """get data from the db (json) and return it as list"""
    create_db_json()
    with open(DB_PATH, "r") as f:
       data = json.load(f)
    return data

#add data to db
def add_data(data) -> None: 
    """add data to the db (json)"""
    
    create_db_json()

    new_data = get_data()
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


    if not os.path.exists(ENV_PATH):
        with open(ENV_PATH, "w") as f:
            secret_key = create_secret_key()
            f.write(f'SECRET_KEY="{secret_key}"\n \
            WP_SECRET_PASSWORD="put ur wp secret password"')

    
    with open(ENV_PATH, "r") as f:
        data = f.read()
        print(data)
        if not data:
            with open(ENV_PATH, "w") as f:
                secret_key = create_secret_key()
                f.write(f'SECRET_KEY="{secret_key}"\n \
                WP_SECRET_PASSWORD="put ur wp secret password"')


#load secret key
def load_secret_key() -> str:
    """return the secret key as str"""
    create_env_file()
    load_dotenv()
    secret_key = os.getenv("SECRET_KEY")
    return secret_key




#===== FLASK =====

app = Flask(__name__)

# configurations
app.config["JWT_SECRET_KEY"] = load_secret_key()
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]


CORS(app, supports_credentials=True)
jwt = JWTManager(app)


#==== ROUTES =====

@app.post("/login")
def login():
    """login, need username and password so it will be post method"""
    pass


@app.get("/logout")
@jwt_required()
def logout():
    """logout, need nothing so it will be get method"""
    pass



@app.post("/signup")
def sign_up():
    """signup, need username email and password so it will be post method"""
    pass

@app.get("/get_data")
@jwt_required()
def get_data():
    """get data, need nothing so it will be get method"""
    pass


@app.post("/add_data")
@jwt_required()
def add_data():
    """add data, need the data u want to add so it will be post method"""
    pass

if __name__ == "__main__":
    app.run(debug=True)
