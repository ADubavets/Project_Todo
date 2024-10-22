from django.contrib import admin
from .models import Todo

# Register your models here.
class TodoAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'done', 'published_date')

    list_display_links = ('id', 'title',)
    # поиск по полям: вкладка admin
    search_fields = ['id', 'title', 'description']
    # фильтр: вкладка admin
    list_filter = ['title', 'description', 'published_date']


admin.site.register(Todo, TodoAdmin)
