from django.contrib import admin
from .models import (
    SiteSetting,
    TrackingSetting,
    SEOSetting,
    OpenGraphSetting,
    SocialLink,
    ContactSetting,
    AdvertisementSetting,
    GeoSetting,
    VerificationSetting,
)


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ("site_name", "site_title", "is_active", "updated_at")
    list_editable = ("is_active",)


@admin.register(TrackingSetting)
class TrackingSettingAdmin(admin.ModelAdmin):
    list_display = ("gtm_id", "ga4_id", "is_active", "updated_at")
    list_editable = ("is_active",)


@admin.register(SEOSetting)
class SEOSettingAdmin(admin.ModelAdmin):
    list_display = ("meta_title", "robots_index", "robots_follow", "is_active", "updated_at")
    list_editable = ("is_active",)


@admin.register(OpenGraphSetting)
class OpenGraphSettingAdmin(admin.ModelAdmin):
    list_display = (
        "og_title",
        "twitter_card",
        "is_active",
        "updated_at",
    )

    list_editable = ("is_active",)


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("facebook", "instagram", "youtube", "is_active", "updated_at")
    list_editable = ("is_active",)


@admin.register(ContactSetting)
class ContactSettingAdmin(admin.ModelAdmin):
    list_display = ("phone_primary", "email_primary", "whatsapp_number", "is_active", "updated_at")
    list_editable = ("is_active",)


@admin.register(AdvertisementSetting)
class AdvertisementSettingAdmin(admin.ModelAdmin):
    list_display = ("adsense_publisher_id", "enable_ads", "is_active", "updated_at")
    list_editable = ("is_active",)


@admin.register(GeoSetting)
class GeoSettingAdmin(admin.ModelAdmin):
    list_display = ("country", "city", "language", "timezone", "is_active", "updated_at")
    list_editable = ("is_active",)


@admin.register(VerificationSetting)
class VerificationSettingAdmin(admin.ModelAdmin):
    list_display = ("google_search_console", "bing_webmaster", "is_active", "updated_at")
    list_editable = ("is_active",)
