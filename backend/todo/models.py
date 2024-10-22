from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    done = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    published_date = models.DateTimeField()

    def __str__(self):
        st = f'{self.title} - {self.description} - {self.published_date}'
        return st
    
    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задача'
        ordering = ['title', 'description', '-published_date']
        