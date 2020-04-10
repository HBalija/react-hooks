from django.urls import path

from ingredient.views import IngredientViewSet


ingredient_list = IngredientViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
ingredient_detail = IngredientViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})


urlpatterns = [
    path('ingredients/', ingredient_list, name='bookmark-list'),
    path('ingredients/<int:pk>/', ingredient_detail, name='bookmark-detail'),
]
