from rest_framework import serializers
from models import Project, Task 


class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model: Task
        fields:['name', 'detail', 'iscompleted']

class ProjectSerializer(serializers.ModelSerializer):
    tasks = TasksSerializer()
    class Meta:
        model: Project
        fields:['name', 'description', 'deadline' 'tasks']