from django.db import models


class Ingredient(models.Model):
    title = models.CharField(max_length=50)
    amount = models.IntegerField()

    def __str__(self):
        return f'{self.title} - ({self.amount})'

    class Meta:
        ordering = ('title', )
