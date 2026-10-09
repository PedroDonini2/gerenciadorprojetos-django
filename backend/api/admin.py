from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Projeto

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'is_staff']
    search_fields = ['username']

@admin.register(Projeto)
class CustomProjetoAdmin(admin.ModelAdmin):
    model = Projeto
    list_display = ['titulo']
    search_fields = ['titulo']

admin.site.register(User, CustomUserAdmin)