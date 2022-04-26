from django.db import models

# Create your models here.
class Asset(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='assets')
    name = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return self.name + ", " + str(self.amount)

    class Meta:
        unique_together = ('user', 'name')