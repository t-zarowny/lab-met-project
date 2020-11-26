from django.contrib.auth.models import User, Group
from django.utils.translation import TranslatorCommentWarning
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.pagination import PageNumberPagination
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

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class PrzyrzadyViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.all()
    serializer_class = serializers.PrzyrzadySerializer
    # pagination_class = StandardResultsSetPagination

class PrzyrzadyD1ViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.all()
    serializer_class = serializers.PrzyrzadySerializerD1
    # pagination_class = StandardResultsSetPagination

class PrzyrzadyD2ViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.all()
    serializer_class = serializers.PrzyrzadySerializerD2
    # pagination_class = StandardResultsSetPagination

class PrzyrzadyD3ViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.all()
    serializer_class = serializers.PrzyrzadySerializerD3
    # pagination_class = StandardResultsSetPagination

class PrzyrzadyFullViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.all()
    serializer_class = serializers.PrzyrzadyFullSerializer
    # pagination_class = StandardResultsSetPagination

class PrzyrzadyNrViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.all()
    serializer_class = serializers.PrzyrzadyNrSerializer
    # pagination_class = StandardResultsSetPagination

class PrzyrzadyPropNrViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.all()
    serializer_class = serializers.PrzyrzadyNrSerializer
    # pagination_class = StandardResultsSetPagination

class PrzyrzadyWzorceViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Przyrzady.objects.filter(wzorzec=True)
    serializer_class = serializers.PrzyrzadySerializerD1
    # pagination_class = StandardResultsSetPagination

class PrzyrzadyDatyViewSet(viewsets.ModelViewSet):
  queryset = models.Przyrzady.objects.all()
  serializer_class = serializers.PrzyrzadyDatySerializer
  # pagination_class = StandardResultsSetPagination

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

class SwiadectwoSprawdzeniaViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.SwiadectwoSprawdzenia.objects.all()
    serializer_class = serializers.SwiadectwoSprawdzeniaSerializer
    filter_fields = ('id','nrSwiadectwa','przedmiot','przedmiotId','metoda','uzyteWzorce','warunkiSrodowiskowe','dataSprawdzenia','dataNastepnejKontroli','wynikSprawdzenia','uwagi','sprawdzajacy','sprawdzenieZewnetrzne','plik')

    def retrieve(self, request, *args, **kwargs):
      instance = self.get_object()
      print('tekst')
      print(instance)
      serializer = self.get_serializer(instance)
      return Response(serializer.data)

class SwiadectwoSprawdzeniaMinViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    # queryset = models.SwiadectwoSprawdzenia.objects.all()

    serializer_class = serializers.SwiadectwoSprawdzeniaMinSerializer

    def get_queryset(self):
      swiadectwa = models.SwiadectwoSprawdzenia.objects.last()
      return swiadectwa

    def list(self, request, *args, **kwargs):
      queryset = self.get_queryset()
      Serializer = serializers.SwiadectwoSprawdzeniaMinSerializer(queryset, many=False)
      return Response(Serializer.data)

class SwiadectwoSprawdzeniaPlikViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.SwiadectwoSprawdzeniaPlik.objects.all()
    serializer_class = serializers.SwiadectwoSprawdzeniaPlikSerializer

class SwiadectwoSprawdzeniaSzablonViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.SwiadectwoSprawdzeniaSzablon.objects.all()
    serializer_class = serializers.SwiadectwoSprawdzeniaSzablonSerializer

