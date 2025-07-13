from rest_framework import serializers
from .models import Institution, Student, SchemeOfWork, LessonPlan, RecordOfWork, SupervisorFeedback

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class SchemeOfWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchemeOfWork
        fields = '__all__'

class LessonPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonPlan
        fields = '__all__'

class RecordOfWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecordOfWork
        fields = '__all__'

class SupervisorFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupervisorFeedback
        fields = '__all__'