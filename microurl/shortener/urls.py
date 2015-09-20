from django.conf.urls import patterns, include, url
 
urlpatterns = patterns('shortener.views',
    url('^$', 'index', name='index'),
    url(r'^(?P<url_id>\w)$', 'redirect', name='redirect'),
    url(r'^makeshort/$', 'shorten', name='shorten'),
)