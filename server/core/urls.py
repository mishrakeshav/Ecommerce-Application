
from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls



urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/',include('users.urls')),
    path('api/',include('ecomm.urls')),
    path('admin/', admin.site.urls),
    path('docs/', include_docs_urls(title='Ecomm')),
    path('schema/', get_schema_view(
        title="Starter Template API",
        description="Starter Template",
        version="1.0.0"
    ), name='openapi-schema'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
