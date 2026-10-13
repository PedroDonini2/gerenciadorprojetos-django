from rest_framework import generics, viewsets, permissions
from .models import User, Projeto, Tarefa
from .serializers import UserSerializer, ProjetoSerializer, TarefaSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

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
    
    @action(methods=['get'], detail= True, permission_classes=[permissions.IsAuthenticated])
    def tarefas(self,request,pk = None):
        projeto = self.get_object()

        tarefas = projeto.tarefa_projeto.all()
        serializer = TarefaSerializer(tarefas, many=True)

        return Response(serializer.data)

class TarefaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Tarefa.objects.all()
    


