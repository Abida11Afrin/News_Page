from django.db import models


class BaseSettingModel(models.Model):
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SiteSetting(BaseSettingModel):
    site_name = models.CharField(max_length=200)
    site_title = models.CharField(max_length=255)
    site_description = models.TextField(blank=True)

    logo = models.ImageField(upload_to="marketing/logo/")
    favicon = models.ImageField(upload_to="marketing/favicon/")

    copyright_text = models.CharField(max_length=255)

    primary_color = models.CharField(max_length=20, default="#0f4c81")
    secondary_color = models.CharField(max_length=20, default="#ffffff")

    class Meta:
        verbose_name = "Site Setting"
        verbose_name_plural = "Site Setting"

    def __str__(self):
        return self.site_name


class TrackingSetting(BaseSettingModel):
    gtm_id = models.CharField(max_length=50, blank=True, verbose_name="Google Tag Manager ID")
    ga4_id = models.CharField(max_length=50, blank=True, verbose_name="Google Analytics GA4 ID")
    meta_pixel_id = models.CharField(max_length=100, blank=True, verbose_name="Meta/Facebook Pixel ID")
    tiktok_pixel_id = models.CharField(max_length=100, blank=True, verbose_name="TikTok Pixel ID")
    google_ads_id = models.CharField(max_length=100, blank=True, verbose_name="Google Ads ID")
    hotjar_id = models.CharField(max_length=100, blank=True, verbose_name="Hotjar ID")
    clarity_id = models.CharField(max_length=100, blank=True, verbose_name="Microsoft Clarity ID")

    class Meta:
        verbose_name = "Tracking Setting"
        verbose_name_plural = "Tracking Setting"

    def __str__(self):
        return "Tracking Settings"


class SEOSetting(BaseSettingModel):
    meta_title = models.CharField(max_length=255)
    meta_description = models.TextField()
    meta_keywords = models.TextField(blank=True)

    canonical_url = models.URLField(blank=True)

    robots_index = models.BooleanField(default=True)
    robots_follow = models.BooleanField(default=True)

    author = models.CharField(max_length=150, blank=True)

    class Meta:
        verbose_name = "SEO Setting"
        verbose_name_plural = "SEO Setting"

    def __str__(self):
        return self.meta_title


class OpenGraphSetting(BaseSettingModel):
    og_title = models.CharField(max_length=255)
    og_description = models.TextField()

    og_image = models.ImageField(
        upload_to="marketing/opengraph/",
        blank=True,
        null=True
    )

    twitter_card = models.CharField(
        max_length=100,
        default="summary_large_image"
    )

    facebook_app_id = models.CharField(
        max_length=100,
        blank=True
    )

    class Meta:
        verbose_name = "Open Graph Setting"
        verbose_name_plural = "Open Graph Setting"

    def __str__(self):
        return self.og_title


class SocialLink(BaseSettingModel):
    facebook = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    youtube = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    telegram = models.URLField(blank=True)
    whatsapp = models.URLField(blank=True)
    messenger = models.URLField(blank=True)
    threads = models.URLField(blank=True)

    class Meta:
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"

    def __str__(self):
        return "Social Links"


class ContactSetting(BaseSettingModel):
    phone_primary = models.CharField(max_length=50, blank=True)
    phone_secondary = models.CharField(max_length=50, blank=True)
    email_primary = models.EmailField(blank=True)
    email_support = models.EmailField(blank=True)
    whatsapp_number = models.CharField(max_length=50, blank=True)
    address = models.TextField(blank=True)
    google_map_url = models.URLField(blank=True)
    office_hours = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = "Contact Setting"
        verbose_name_plural = "Contact Settings"

    def __str__(self):
        return self.email_primary or self.phone_primary or "Contact Settings"


class AdvertisementSetting(BaseSettingModel):
    adsense_publisher_id = models.CharField(max_length=100, blank=True)
    enable_ads = models.BooleanField(default=False)
    header_ad_enabled = models.BooleanField(default=False)
    sidebar_ad_enabled = models.BooleanField(default=False)
    footer_ad_enabled = models.BooleanField(default=False)
    article_ad_enabled = models.BooleanField(default=False)
    sticky_ad_enabled = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Advertisement Setting"
        verbose_name_plural = "Advertisement Settings"

    def __str__(self):
        return self.adsense_publisher_id or "Advertisement Settings"


class GeoSetting(BaseSettingModel):
    country = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    language = models.CharField(max_length=100, blank=True)
    timezone = models.CharField(max_length=100, blank=True)
    currency = models.CharField(max_length=20, blank=True)
    default_locale = models.CharField(max_length=50, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)

    class Meta:
        verbose_name = "Geo Setting"
        verbose_name_plural = "Geo Settings"

    def __str__(self):
        return self.country or "Geo Settings"


class VerificationSetting(BaseSettingModel):
    google_search_console = models.CharField(max_length=255, blank=True)
    bing_webmaster = models.CharField(max_length=255, blank=True)
    facebook_domain_verification = models.CharField(max_length=255, blank=True)
    pinterest_verification = models.CharField(max_length=255, blank=True)
    yandex_verification = models.CharField(max_length=255, blank=True)
    apple_verification = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = "Verification Setting"
        verbose_name_plural = "Verification Settings"

    def __str__(self):
        return "Verification Settings"

