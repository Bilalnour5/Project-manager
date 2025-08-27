from django.db import models

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length = 100)
    description = models.TextField()
    deadline = models.DateField()
    status = models.CharField(max_length=20, choices=(
        ('planned', 'Planned'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ))
    
class Task(models.Model):
    project = models.ForeignKey(Project, on_delete= models.CASCADE, related_name='tasks')
    name = models.CharField(max_length = 100)
    detail = models.TextField()
    priority = models.CharField(max_length=10, choices=(
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ), default='low')
    time_spent_hours = models.IntegerField(default=0)
    estimated_hours = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=(
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ), default='not_started')