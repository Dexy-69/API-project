import requests
import json

class WP_REQUSET:
    def __init__(self, username, application_password):
        self.username = username
        self.application_password = application_password


    def get_posts(self, post_ids: list) -> list:
        """Using this method will return every post you create by passing the id of the post"""
        list_post = []
        for post in post_ids:
            

            res = requests.get(f"http://localhost/wordpress/wp-json/wp/v2/posts/{post}")
            
            post = res.json()
            res_img = requests.get(f"http://localhost/wordpress/wp-json/wp/v2/media/{post.get("featured_media")}")
            img = res_img.json() 
            posts_info = {
            "id": post.get("id"),
            "title": post["title"].get("rendered"),
            "link": post.get("link"),
            "content": post["content"].get("rendered"),
            "featured_media": f"{img.get("link")}",
            "modified_gmt": f"{post.get("modified_gmt")}"
            }

            list_post.append(posts_info)
        return list_post
    
    def add_post(self, title:str, content:str, img:str = None, status:str = "publish") -> int:
        """Using this method will create posts by passing some values and it will return the id of the post
        you create"""
       
        

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
                return wp_res.get("id")

            else:
                print("error", res.status_code, res.text)