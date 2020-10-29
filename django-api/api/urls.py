from django.urls import include, path
from rest_framework import routers
from api import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'users-pass', views.UserPassViewSet)
router.register(r'usersObszar', views.UserObszarViewSet)
router.register(r'grupy', views.GroupInstrumentsViewSet)
router.register(r'karta-pomiarow', views.GrupaKartaPomiarowViewSet)
router.register(r'obszary', views.ObszaryViewSet)
router.register(r'obszary-d1', views.ObszaryD1ViewSet)
router.register(r'lokalizacje', views.LokalizacjeViewSet)
router.register(r'przyrzady', views.PrzyrzadyViewSet)
router.register(r'przyrzady-d1', views.PrzyrzadyD1ViewSet)
router.register(r'przyrzady-d2', views.PrzyrzadyD2ViewSet)
router.register(r'przyrzady-d3', views.PrzyrzadyD3ViewSet)
router.register(r'przyrzady-full', views.PrzyrzadyFullViewSet)
router.register(r'sprawdzenia-planowane', views.SprawdzeniaPlanoweViewSet)
router.register(r'statusy', views.StatusViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)