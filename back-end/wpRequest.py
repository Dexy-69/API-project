import requests
import json

class WP_REQUSET:

    def get_from_wp(self) -> list:
        """it will send requset to the wordPress api and get the info of the posts"""
        url = "http://localhost/wordpress/wp-json/wp/v2/posts"

        res = requests.get(url)
        print(res)
        data = res.json()
        print(json.dumps(data, indent=4))
        for i in data:
            res_img = requests.get(f"http://localhost/wordpress/wp-json/wp/v2/media/{i.get("featured_media")}")
            img = res_img.json() 
            posts_info = {
                "id": i.get("id"),
                "title": i["title"].get("rendered"),
                "link": i.get("link"),
                "content": i["content"].get("rendered"),
                "featured_media": f"{img.get("link")}",
                "modified_gmt": f"{i.get("modified_gmt")}"
            }

        return json.dumps(posts_info, indent=4)