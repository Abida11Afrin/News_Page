from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField


class Page(models.Model):
    title = models.CharField(max_length=200, verbose_name="Page Name")
    image = models.ImageField(upload_to='pages/', verbose_name="Image")
    order = models.PositiveIntegerField(default=0, verbose_name="Order")
    is_active = models.BooleanField(default=True, verbose_name="Active")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']
        verbose_name = "Page"
        verbose_name_plural = "Pages"

    def __str__(self):
        return f"{self.order}. {self.title}"


class HomePageImage(models.Model):
    POSITION_CHOICES = [
        ('left', 'Left'),
        ('center', 'Center'),
        ('right', 'Right'),
    ]
    SIZE_CHOICES = [
        ('small', 'Small'),
        ('medium', 'Medium'),
        ('large', 'Large'),
        ('full', 'Full'),
    ]

    title = models.CharField(max_length=100, default='Home Page', verbose_name="Page Name")
    image = models.ImageField(upload_to='homepage/', verbose_name="Image", blank=True, null=True)
    content = RichTextUploadingField(verbose_name="Content (CKEditor)", blank=True, null=True)
    position = models.CharField(max_length=10, choices=POSITION_CHOICES, default='center', verbose_name="Position")
    size = models.CharField(max_length=10, choices=SIZE_CHOICES, default='medium', verbose_name="Size")
    order = models.PositiveIntegerField(default=0, verbose_name="Order")
    is_active = models.BooleanField(default=True, verbose_name="Active")

    class Meta:
        ordering = ['order']
        verbose_name = "Center Content"
        verbose_name_plural = "Center Content"

    def __str__(self):
        return self.title
