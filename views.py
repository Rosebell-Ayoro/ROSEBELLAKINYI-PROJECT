from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.contrib.auth.decorators import login_required
from models import Announcement
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .models import Institution, Student, SchemeOfWork, LessonPlan, RecordOfWork, SupervisorFeedback
from .serializers import (
    InstitutionSerializer, StudentSerializer, SchemeOfWorkSerializer,
    LessonPlanSerializer, RecordOfWorkSerializer, SupervisorFeedbackSerializer
)
from .firebase_helper import push_realtime_update

class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class SchemeOfWorkViewSet(viewsets.ModelViewSet):
    queryset = SchemeOfWork.objects.all()
    serializer_class = SchemeOfWorkSerializer

class LessonPlanViewSet(viewsets.ModelViewSet):
    queryset = LessonPlan.objects.all()
    serializer_class = LessonPlanSerializer

class RecordOfWorkViewSet(viewsets.ModelViewSet):
    queryset = RecordOfWork.objects.all()
    serializer_class = RecordOfWorkSerializer

    def perform_create(self, serializer):
        instance = serializer.save()

        push_realtime_update(f"students/{instance.lesson.scheme.student.id}/records", {
            "lesson": instance.lesson.topic,
            "date_completed": str(instance.date_completed),
            "remarks": instance.remarks
        })

class SupervisorFeedbackViewSet(viewsets.ModelViewSet):
    queryset = SupervisorFeedback.objects.all()
    serializer_class = SupervisorFeedbackSerializer

    def perform_create(self, serializer):
        instance = serializer.save()

        push_realtime_update(f"students/{instance.student.id}/feedbacks", {
            "supervisor": instance.supervisor_name,
            "feedback": instance.feedback,
            "created_at": str(instance.created_at)
        })

@login_required
def home_data(request):
    user_info = {
        "username": request.user.username,
        "email": request.user.email,
    }
    return JsonResponse({"user": user_info})

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True, 'message': 'Logged in successfully'})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)
    return JsonResponse({'error': 'POST request required'}, status=400) 
  
def announcement_list(request):
    announcements = Announcement.objects.all().order_by('-date')
    data = [
        {"title": a.title, "message": a.message, "date": a.date}
        for a in announcements
    ]
    return JsonResponse(data, safe=False)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        if User.objects.filter(username=username).exists():
            return JsonResponse({'success': False, 'error': 'Username taken'}, status=400)
        user = User.objects.create_user(username=username, password=password, email=email)
        return JsonResponse({'success': True, 'message': 'User registered'})
    
def footer_info(request):
    return JsonResponse({"year": 2025, "company": "Your Company"})    