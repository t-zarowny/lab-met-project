from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from api.models import GroupInstruments, GrupaKartaPomiarow
from api.serializers import UserSerializer, GroupInstrumentsSerializer, GrupaKartaPomiarowSerializer
from rest_framework.views import APIView


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupInstrumentsViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = GroupInstruments.objects.all()
    serializer_class = GroupInstrumentsSerializer

class GrupaKartaPomiarowViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = GrupaKartaPomiarow.objects.all()
    serializer_class = GrupaKartaPomiarowSerializer