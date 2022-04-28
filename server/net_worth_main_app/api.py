from rest_framework import permissions, generics, status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import *

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })
        
class AssetListAPI(generics.ListCreateAPIView):
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated,]
    pagination_class = None

    def get_queryset(self):
        return self.request.user.assets.order_by('id')
    
    def create(self, request, *args, **kwargs):
        is_many = isinstance(request.data, list)
        if not is_many:
            return super().create(request, *args, **kwargs)
        else:
            request.user.assets.all().delete()
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class AssetDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated,]
    pagination_class = None

    def get_queryset(self):
        return self.request.user.assets.all()
    
    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        name = self.kwargs.get('name')
        obj = queryset.filter(name=name).first()
        if obj is None:
            raise serializers.ValidationError("Asset not found.")
        return obj