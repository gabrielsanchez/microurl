from django.db import models

class Url(models.Model):
    url_id = models.TextField(max_length=6)
    url = models.URLField(max_length=200)
    pub_date = models.DateTimeField(auto_now=True)
    clicks = models.IntegerField(default=0)
 
    def __str__(self):
        return self.url