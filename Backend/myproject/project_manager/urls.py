from django.urls import path
from . import views

app_name = 'project_manager' 

urlpatterns = [
    path('projects/', views.ProjectListCreateView.as_view(), name='project-list'),
    path('projects/<int:pk>/', views.ProjectRetrieveUpdateDestroyView.as_view(), name='project-detail'),
    path('tasks/', views.TaskListCreateView.as_view(), name='task-list'),
    path('tasks/<int:pk>/', views.TaskRetrieveUpdateDestroyView.as_view(), name='task-detail'),
]