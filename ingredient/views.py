from rest_framework import viewsets

from ingredient.models import Ingredient
from ingredient.serializers import IngredientSerializer


class IngredientViewSet(viewsets.ModelViewSet):

    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()
