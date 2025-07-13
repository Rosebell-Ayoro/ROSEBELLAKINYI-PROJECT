from django.db import models

class Institution(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField(blank=True)

class Student(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    attachment_start = models.DateField()
    attachment_end = models.DateField()

class SchemeOfWork(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="schemes")
    week = models.CharField(max_length=255)
    content = models.TextField()
    activities = models.DateTimeField(auto_now_add=True)

class LessonPlan(models.Model):
    scheme = models.ForeignKey(SchemeOfWork, on_delete=models.CASCADE, related_name="lessons")
    date = models.DateField()
    topic = models.CharField(max_length=255)
    objectives = models.TextField()

class RecordOfWork(models.Model):
    lesson = models.ForeignKey(LessonPlan, on_delete=models.CASCADE, related_name="records")
    date_completed = models.DateField()
    activities = models.DateTimeField(auto_now_add=True)
    remarks = models.TextField()

class SupervisorFeedback(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="feedbacks")
    supervisor_name = models.CharField(max_length=255)
    feedback = models.TextField()
    created_at = models.DateField(auto_now_add=True)

class Announcement(models. Model):
    title = models.CharField(max_length=255)
    message = models.TextField()
    date = models.DateField(auto_now_add=True)