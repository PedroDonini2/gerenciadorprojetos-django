from rest_framework import generics, viewsets, permissions
from .models import User, Projeto, Tarefa
from .serializers import UserSerializer, ProjetoSerializer, TarefaSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

class ProjetoViewSet(viewsets.ModelViewSet):
    queryset = Projeto.objects.all()
    serializer_class = ProjetoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.username != 'admin':
            serializer.save(
                proprietario=self.request.user
            )
        else:
            serializer.save()
    
    def get_queryset(self):
        user = self.request.user
        if user.username == 'admin':
            return Projeto.objects.all()
        return Projeto.objects.filter(proprietario=user)

class TarefaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Tarefa.objects.all()

