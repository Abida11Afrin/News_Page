from rest_framework.decorators import api_view
from rest_framework.response import Response
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
from .serializers import (
    SiteSettingSerializer,
    TrackingSettingSerializer,
    SEOSettingSerializer,
    OpenGraphSettingSerializer,
    SocialLinkSerializer,
    ContactSettingSerializer,
    AdvertisementSettingSerializer,
    GeoSettingSerializer,
    VerificationSettingSerializer,
)


def latest_active_response(model, serializer_class):
    setting = model.objects.filter(is_active=True).last()
    serializer = serializer_class(setting)
    return Response(serializer.data)


@api_view(["GET"])
def site_setting(request):
    return latest_active_response(SiteSetting, SiteSettingSerializer)


@api_view(["GET"])
def tracking_setting(request):
    return latest_active_response(TrackingSetting, TrackingSettingSerializer)


@api_view(["GET"])
def seo_setting(request):
    return latest_active_response(SEOSetting, SEOSettingSerializer)


@api_view(["GET"])
def opengraph_setting(request):
    return latest_active_response(OpenGraphSetting, OpenGraphSettingSerializer)


@api_view(["GET"])
def social_link(request):
    return latest_active_response(SocialLink, SocialLinkSerializer)


@api_view(["GET"])
def contact_setting(request):
    return latest_active_response(ContactSetting, ContactSettingSerializer)


@api_view(["GET"])
def advertisement_setting(request):
    return latest_active_response(AdvertisementSetting, AdvertisementSettingSerializer)


@api_view(["GET"])
def geo_setting(request):
    return latest_active_response(GeoSetting, GeoSettingSerializer)


@api_view(["GET"])
def verification_setting(request):
    return latest_active_response(VerificationSetting, VerificationSettingSerializer)
