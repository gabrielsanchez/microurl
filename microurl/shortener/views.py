from django.shortcuts import render_to_response, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
import random, string, json
from shortener.models import Url
from django.http import HttpResponseRedirect, HttpResponse
from django.conf import settings
from django.core.context_processors import csrf
from shortener.base_62_converter import *

def index(request):
    return render_to_response('shortener/index.html')
 
def redirect(request, url_id):
    id = saturate(url_id)
    url = get_object_or_404(Url, pk=id)
    url.clicks += 1
    url.save()
    return HttpResponseRedirect(url.url)
 
@csrf_exempt
def shorten(request):
    url = request.POST.get("url", '')
    if not (url == ''):
        b = Url(url=url)
        b.save()
        url_id = dehydrate(b.id)
        b.url_id = url_id
        b.save()
        response_data = {}
        response_data['url'] = settings.SITE_URL + "/" + url_id
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    return HttpResponse(json.dumps({"error": "error occurs"}),
             content_type="application/json")