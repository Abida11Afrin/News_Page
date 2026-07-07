from rest_framework import serializers
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


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = "__all__"


class TrackingSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackingSetting
        fields = "__all__"


class SEOSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SEOSetting
        fields = "__all__"


class OpenGraphSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenGraphSetting
        fields = "__all__"


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = "__all__"


class ContactSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSetting
        fields = "__all__"


class AdvertisementSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvertisementSetting
        fields = "__all__"


class GeoSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeoSetting
        fields = "__all__"


class VerificationSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerificationSetting
        fields = "__all__"
