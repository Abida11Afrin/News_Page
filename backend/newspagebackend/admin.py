from django.contrib import admin
from django.utils.html import format_html
from .models import Page
from .models import Page, HomePageImage

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ['order', 'title', 'preview', 'is_active']
    list_editable = ['order', 'is_active']
    list_display_links = ['title']
    ordering = ['order']

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width:65px; height:90px; object-fit:cover; border-radius:4px;" />',
                obj.image.url
            )
        return "—"
    preview.short_description = "প্রিভিউ"

@admin.register(HomePageImage)
class HomePageImageAdmin(admin.ModelAdmin):
    list_display = ['order', 'preview', 'position', 'size', 'is_active']
    list_editable = ['order', 'position', 'size', 'is_active']
    list_display_links = ['preview']
    ordering = ['order']

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width:50px; height:60px; object-fit:cover; border-radius:4px;" />',
                obj.image.url
            )
        return "—"
    preview.short_description = "প্রিভিউ"