from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    username = models.CharField(unique=True,null=False,blank=False)
    USERNAME_FIELD = 'username'
    def __str__(self):
        return self.username

class Projeto(models.Model):
    class ESTADO_CHOICES(models.TextChoices):
        EM_ANDAMENTO = "Em andamento"
        CONCLUIDA = "Concluída"

    titulo = models.CharField(max_length=20,blank=True)
    proprietario = models.ForeignKey(
        "api.User", related_name="projetos", on_delete=models.PROTECT, default='', blank=True, null=True
    )
    estado = models.CharField(choices=ESTADO_CHOICES.choices, default="Em andamento", max_length=20)

    def __str__(self):
        return self.titulo

class Tarefa(models.Model):
    class PRIORIDADE_CHOICES(models.TextChoices):
        ALTA = "Alta"
        MEDIA = "Média"
        BAIXA = "Baixa"

    descricao = models.CharField(max_length=100,blank=True)
    projeto_atribuido = models.ForeignKey(
        "api.Projeto", related_name="tarefa_projeto", on_delete=models.PROTECT, default='', blank=True, null=True
    )
    usuario_atribuido = models.ForeignKey(
        "api.User", related_name="tarefa_usuario", on_delete=models.PROTECT, default='', blank=True, null=True
    )
    prioridade = models.CharField(choices=PRIORIDADE_CHOICES.choices, default="PRIORIDADE_CHOICES.MEDIA", max_length=10)