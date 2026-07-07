from django.urls import path
from .views import (
    site_setting,
    tracking_setting,
    seo_setting,
    opengraph_setting,
    social_link,
    contact_setting,
    advertisement_setting,
    geo_setting,
    verification_setting,
)

urlpatterns = [
    path("site-settings/", site_setting),
    path("tracking-settings/", tracking_setting),
    path("seo-settings/", seo_setting),
    path("opengraph-settings/", opengraph_setting),
    path("social-links/", social_link),
    path("contact-settings/", contact_setting),
    path("advertisement-settings/", advertisement_setting),
    path("geo-settings/", geo_setting),
    path("verification-settings/", verification_setting),
]
