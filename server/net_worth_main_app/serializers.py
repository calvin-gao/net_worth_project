from asyncore import read
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Asset
    
class AssetSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = self.context['request'].user
        prev_asset = Asset.objects.filter(user=user, name=validated_data['name'])
        if prev_asset.exists():
            prev_asset = prev_asset.first()
            prev_asset.amount = validated_data['amount']
            prev_asset.save(update_fields=['amount'])
            return prev_asset
        else:
            asset = Asset.objects.create(user=user, **validated_data)
        return asset
    
    def update(self, instance, validated_data):
        user = self.context['request'].user
        prev_asset = Asset.objects.filter(user=user, name=validated_data['name'])
        if prev_asset.exists():
            prev_asset.first().delete()
        return super().update(instance, validated_data)
    
    class Meta:
        model = Asset
        fields = ('id', 'name', 'amount')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user
        
class UserSerializer(serializers.ModelSerializer):
    assets = AssetSerializer(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'assets')

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Details.")