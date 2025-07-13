from rest_framework import routers
from .views import InstitutionViewSet, StudentViewSet, SchemeOfWorkViewSet, LessonPlanViewSet, RecordOfWorkViewSet, SupervisorFeedbackViewSet
from django.contrib import admin
from django.urls import path, include
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'institutions', InstitutionViewSet)
router.register(r'students', StudentViewSet)
router.register(r'schemes', SchemeOfWorkViewSet)
router.register(r'lessons', LessonPlanViewSet)
router.register(r'records', RecordOfWorkViewSet)
router.register(r'feedbacks', SupervisorFeedbackViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
urlpatterns= [
    path('api/home/', views.home_data, name='home-data'),
    path('api/login/', views.login_view, name='login'),
    path('api/register/', views.register, name='register'),
    path('api/announcements/', views.announcement_list, name='announcement-list'),
     path('api/footer/', views.footer_info, name='footer-info'),
]