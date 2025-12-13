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
                
    def add_user(self) -> dict:
        """using this method will let u create user and it will
          return some data of the user was created as dict"""
        pass