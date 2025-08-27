from rest_framework import serializers
from .models import Project, Task 


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Task
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    task_count = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Project
        fields = '__all__'

    def get_task_count(self, obj):
        # Make sure your Task model has related_name='tasks'
        return obj.tasks.count()