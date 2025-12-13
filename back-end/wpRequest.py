import requests
import json

class WP_REQUSET:
    def __init__(self, username, application_password):
        self.username = username
        self.application_password = application_password

    
    def add_post(self, title:str, content:str, img:str = None, status:str = None) -> dict:
        """Using this method will create posts by passing some values and it will 
        return dict with some data of the post like (id, time post created, title post, content, link of the post...)"""
       
        # if there is img 
        if not img:
            url = "http://localhost/wordpress/wp-json/wp/v2/posts"
            data = {
                "title": title,
                "content": content,
                "status": status
            }
            res = requests.post(url, json=data, auth=(self.username, self.application_password))
            if res.status_code == 201:
                wp_res = res.json()
                post = {
                    "post_id": wp_res["id"],
                    "featured_media": "None",
                    "title": wp_res["title"].get("rendered"),
                    "content": wp_res["content"].get("rendered"),
                    "modified_gmt": wp_res.get("modified_gmt"),
                    "link": wp_res.get("link")
                }
                return post

            if img:
                # if there
                pass

            print("error", res.status_code, res.text)

    def del_post(self, post_id: int) -> list:
        """using this method will let u delete any post with it's id and it will return
         list with id and status of the post was deleted"""
        url = f"http://localhost/wordpress/wp-json/wp/v2/posts/{post_id}"
        res = requests.delete(
            url,
            auth=(self.username, self.application_password)
        )
        if res.status_code == 200:
            del_res = res.json()
            psot_id_deleted = del_res.get("id")
            status = del_res.get("status")

            list_to_del_the_post_from_json_db = [psot_id_deleted, status]

            if status == "trash":
                return list_to_del_the_post_from_json_db
                
    def add_user(self, wp_username, wp_email, wp_password) -> dict:
        """using this method will let u create user and it will
          return some data of the user was created as dict"""
        
        url = "http://localhost/wordpress/wp-json/wp/v2/users"

        new_user_in_wp = {
            "username": wp_username,
            "email": wp_email,
            "password": wp_password
        }

        res = requests.post(
            url,
            auth=(self.username, self.application_password),
            json=new_user_in_wp
            )
        
        data = res.json()
        if not data.get("message"):
            new_user_will_added_to_the_db = {
                "user_id": data.get("id"),
                "username": data.get("username"),
                "email": data.get("email"),
                "password": wp_password
            }
            return new_user_will_added_to_the_db
        return data.get("message")

    def del_user(self, user_id) -> bool:
        """using this method will let u delete user by the id of this user and
        it will return True if the user deleted"""

        url = f"http://localhost/wordpress/wp-json/wp/v2/users/{user_id}?reassign=1&force=true"
        
    

        res = requests.delete(url,
                               auth=(self.username, self.application_password)
                               )

        
        data = res.json()
        return data.get("deleted")
        
