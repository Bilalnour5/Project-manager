from django.db import models

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length = 100)
    description = models.TextField()
    deadline = models.DateField()

class Task(models.Model):
    project = models.ForeignKey(Project, on_delete= models.CASCADE)
    name = models.CharField(max_length = 100)
    detail = models.TextField()
    is_completed = models.BooleanField(default=False)