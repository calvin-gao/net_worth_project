from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    model = Asset
    list_display = ('name', 'amount', 'user')
    list_filter = ('user', 'name')