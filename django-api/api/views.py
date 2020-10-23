from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework.response import Response
from api import serializers
from api import models

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer

class UserPassViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserPassSerializer

class UserObszarViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserObszarSerializer

class GroupInstrumentsViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.GroupInstruments.objects.all()
    serializer_class = serializers.GroupInstrumentsSerializer

class GrupaKartaPomiarowViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.GrupaKartaPomiarow.objects.all()
    serializer_class = serializers.GrupaKartaPomiarowSerializer

class ObszaryViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Obszary.objects.all()
    serializer_class = serializers.ObszarySerializer

class LokalizacjeViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Lokalizacje.objects.all()
    serializer_class = serializers.LokalizacjeSerializer

class PrzyrzadyViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.all()
    serializer_class = serializers.PrzyrzadySerializer

class SprawdzeniaPlanoweViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.SprawdzeniaPlanowe.objects.all()
    serializer_class = serializers.SprawdzeniaPlanoweSerializer

