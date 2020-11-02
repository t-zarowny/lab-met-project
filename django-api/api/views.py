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

class GroupInstrumentsFullViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.GroupInstruments.objects.all()
    serializer_class = serializers.GroupInstrumentsFullSerializer

class GrupaKartaPomiarowViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.GrupaKartaPomiarow.objects.all()
    serializer_class = serializers.GrupaKartaPomiarowSerializer

class ObszaryViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Obszary.objects.all()
    serializer_class = serializers.ObszarySerializer

    # def get_serializer_class(self):
    #   serializer_class = self.serializer_class
    #   if self.request.method in ('PUT','PATCH','POST'):
    #     serializer_class = serializers.ObszarySerializerWrite
    #   if self.request.method == 'GET':
    #     serializer_class = serializers.ObszarySerializerRead
    #   return serializer_class

class ObszaryD1ViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Obszary.objects.all()
    serializer_class = serializers.ObszaryD1Serializer

class LokalizacjeViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Lokalizacje.objects.all()
    serializer_class = serializers.LokalizacjeSerializer

class PrzyrzadyViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.all()
    serializer_class = serializers.PrzyrzadySerializer

class PrzyrzadyD1ViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.all()
    serializer_class = serializers.PrzyrzadySerializerD1

class PrzyrzadyD2ViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.all()
    serializer_class = serializers.PrzyrzadySerializerD2

class PrzyrzadyD3ViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.all()
    serializer_class = serializers.PrzyrzadySerializerD3

class PrzyrzadyFullViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.all()
    serializer_class = serializers.PrzyrzadyFullSerializer

class SprawdzeniaPlanoweViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.SprawdzeniaPlanowe.objects.all()
    serializer_class = serializers.SprawdzeniaPlanoweSerializer

class StatusViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Statusy.objects.all()
    serializer_class = serializers.StatusSerializer

class JednostkiBadaneViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.JednostkiBadane.objects.all()
    serializer_class = serializers.JednostkiBadaneSerializer

class JednostkiInterwalViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.JednostkiInterwal.objects.all()
    serializer_class = serializers.JednostkiInterwalSerializer

