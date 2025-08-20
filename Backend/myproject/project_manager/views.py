from rest_framework import generics 
from django.shortcuts import render
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer   

# Create your views here.
class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        project_id = self.request.query_params.get('project_id')
        if project_id:
            return Task.objects.filter(project_id=project_id)
        return super().get_queryset()

class TaskRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer