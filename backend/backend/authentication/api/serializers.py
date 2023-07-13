from rest_framework import serializers
from authentication.models import Account

# user register serializer


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id','name', 'email', 'password')

    def create(self, validated_data):
        print("user serializer", validated_data)
        name = validated_data['name']
        email = validated_data['email']
        password = validated_data['password']

        user = Account.objects.create_user(
            name=name,
            email=email,
            password=password
        )
        return user

# user serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ( 'id','name', 'email', 'password', 'image')
