from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def _str_(self):
        return self.title
