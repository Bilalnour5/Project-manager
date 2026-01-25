import django_filters
from .models import Project, Task
class CharInFilter(django_filters.BaseInFilter,django_filters.CharFilter):
    pass

class ProjectFilter(django_filters.FilterSet):
    status = CharInFilter(field_name='status', lookup_expr='in')
    class Meta:
        model = Project
        fields = ['id', 'status', 'deadline']  # Filter projects by status and deadline
        
class TaskFilter(django_filters.FilterSet):
    class Meta:
        model = Task
        fields = ['id', 'project', 'priority', 'status']  # Filter tasks by project, priority, and status 