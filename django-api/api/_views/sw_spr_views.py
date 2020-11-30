import django_filters
from rest_framework import viewsets
from api import models
from api._serializers import sw_spr_serializers

class SwiadectwoSprawdzeniaFilter(django_filters.FilterSet):
    # gte - większe równe
    # lte - mniejsze równe
    # gt - większe
    # lt - mniejsze
    min_date = django_filters.DateFilter(field_name="dataSprawdzenia", lookup_expr="gte")
    max_date = django_filters.DateFilter(field_name="dataSprawdzenia", lookup_expr="lte")

    class Meta:
        model = models.SwiadectwoSprawdzenia
        fields = [
            "min_date",
            "max_date",
            "wynikSprawdzenia",
            "przedmiotId",
            "dataSprawdzenia",
        ]

class SwiadectwoSprawdzeniaHarmonogramViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.SwiadectwoSprawdzenia.objects.all().order_by('dataSprawdzenia')
    serializer_class = sw_spr_serializers.SwiadectwoSprawdzeniaHarmonogramSerializer
    filterset_class = SwiadectwoSprawdzeniaFilter
    ordering_fields = ['dataSprawdzenia', 'nrSwiadectwa']
