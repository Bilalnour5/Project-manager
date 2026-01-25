from django.db.models import Count, Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics 
from django.shortcuts import render
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer   
from .filters import ProjectFilter, TaskFilter

# Create your views here.
class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectFilter


    def get_queryset(self):
        return Project.objects.annotate(
            # Count all tasks related to this project
            total_tasks=Count('tasks'),
            
            # Count only tasks where status is 'completed'
            completed_tasks=Count('tasks', filter=Q(tasks__status='completed')),
            
            # Count only tasks where status is NOT completed
            pending_tasks=Count('tasks', filter=~Q(tasks__status='completed'))
        )

class ProjectRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = TaskFilter

    def get_queryset(self):
        """
        Override to apply default filtering.
        """
        # 1. Get the base queryset (all tasks)
        queryset = super().get_queryset()

        # 2. Check if the user is ALREADY asking for a specific status
        status_param = self.request.query_params.get('status')

        # 3. Apply the logic
        if status_param is None:
            # CASE A: No status specified (e.g., /api/tasks/)
            return queryset.exclude(status='completed')
        
        # CASE B: Status IS specified (e.g., /api/tasks/?status=completed)
        # Return the full queryset. 
        # DjangoFilterBackend will handle the actual filtering based on the param.
        return queryset

class TaskRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
