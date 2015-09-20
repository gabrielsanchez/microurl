from django.contrib import admin
from shortener.models import Url
 
class UrlAdmin(admin.ModelAdmin):
    list_display = ('id', 'url_id','url','pub_date', 'clicks')
    ordering = ('-pub_date',)
 
admin.site.register(Url, UrlAdmin)