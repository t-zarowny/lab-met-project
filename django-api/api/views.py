from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from api.models import GroupInstruments, GrupaKartaPomiarow
from api.serializers import UserSerializer, GroupInstrumentsSerializer, GrupaKartaPomiarowSerializer


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
