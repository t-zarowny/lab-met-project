from django.urls import include, path
from rest_framework import routers
from api import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'grupy', views.GroupInstrumentsViewSet)
router.register(r'karta-pomiarow', views.GrupaKartaPomiarowViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)