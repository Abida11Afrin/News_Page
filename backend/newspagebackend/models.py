from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField

class Page(models.Model):
    title = models.CharField(max_length=200, verbose_name="পাতার নাম")
    image = models.ImageField(upload_to='pages/', verbose_name="ছবি")
    order = models.PositiveIntegerField(default=0, verbose_name="ক্রম")
    is_active = models.BooleanField(default=True, verbose_name="সক্রিয়")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']
        verbose_name = "পাতা"
        verbose_name_plural = "পাতাসমূহ"

    def __str__(self):
        return f"{self.order}. {self.title}"


class HomePageImage(models.Model):
    POSITION_CHOICES = [
        ('left', 'বাম'),
        ('center', 'মাঝখান'),
        ('right', 'ডান'),
    ]
    SIZE_CHOICES = [
        ('small', 'ছোট'),
        ('medium', 'মাঝারি'),
        ('large', 'বড়'),
        ('full', 'পূর্ণ'),
    ]

    image = models.ImageField(upload_to='homepage/', verbose_name="ছবি")
    content = RichTextUploadingField(verbose_name="কন্টেন্ট (CKEditor)", blank=True, null=True)  # ← এটা আছে?
    position = models.CharField(max_length=10, choices=POSITION_CHOICES, default='center', verbose_name="অবস্থান")
    size = models.CharField(max_length=10, choices=SIZE_CHOICES, default='medium', verbose_name="সাইজ")
    order = models.PositiveIntegerField(default=0, verbose_name="ক্রম")
    is_active = models.BooleanField(default=True, verbose_name="সক্রিয়")

    class Meta:
        ordering = ['order']
        verbose_name = "হোম পেজ ছবি"
        verbose_name_plural = "হোম পেজ ছবিসমূহ"

    def __str__(self):
        return f"{self.order}. {self.position} - {self.size}"