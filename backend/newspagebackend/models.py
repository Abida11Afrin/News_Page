from django.db import models

class Page(models.Model):
    title = models.CharField(max_length=200, verbose_name="পাতার নাম")
    image = models.ImageField(
        upload_to='pages/',
        verbose_name="ছবি"
    )
    order = models.PositiveIntegerField(default=0, verbose_name="ক্রম")
    is_active = models.BooleanField(default=True, verbose_name="সক্রিয়")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']
        verbose_name = "পাতা"
        verbose_name_plural = "পাতাসমূহ"

    def __str__(self):
        return f"{self.order}. {self.title}"