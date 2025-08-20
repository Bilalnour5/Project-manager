from rest_framework import serializers
from .models import Project, Task 


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Task
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model= Project
        fields='__all__'