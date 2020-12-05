from rest_framework import viewsets, status
from api import models
from api import serializers
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated, SAFE_METHODS

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class Weryfikacja(viewsets.ModelViewSet):
  permission_classes = [AllowAny|ReadOnly]
  queryset = models.Przyrzady.objects.all().order_by('dataNastepnejKontroli')
  serializer_class = serializers.PrzyrzadyFullSerializer
  print('cron dziala')
