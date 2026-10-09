from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User, Projeto, Tarefa

User = get_user_model()

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id','username')

class ProjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projeto
        fields = ("id","titulo","proprietario")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')

        if request and hasattr(request, "user"):
            if request.user.username != 'admin':
                self.fields['proprietario'] = serializers.HiddenField(default=request.user)
    

class TarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarefa
        fields = ("id","descricao","projeto_atribuido","prioridade")
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')

        if request and hasattr(request, "user"):
            self.fields['projeto_atribuido'].queryset = Projeto.objects.filter(proprietario=request.user)