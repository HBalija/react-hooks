from rest_framework import viewsets

from ingredient.models import Ingredient
from ingredient.serializers import IngredientSerializer


class IngredientViewSet(viewsets.ModelViewSet):

    serializer_class = IngredientSerializer

    def get_queryset(self):
        queryset = Ingredient.objects.all()

        title_qs = self.request.query_params.get('title')
        if title_qs:
            queryset = queryset.filter(title__icontains=title_qs)

        return queryset
