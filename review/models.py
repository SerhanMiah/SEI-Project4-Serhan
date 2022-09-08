from django.db import models


# Create your models here.
class Review(models.Model):
    text = models.TextField(max_length=300) 
    created_at = models.DateTimeField(auto_now_add=True) 
    
    theatre = models.ForeignKey(
        "venue.Theatre", 
        related_name="review",
        on_delete = models.CASCADE 
    )

# ! this looks promising! 
class Like(models.Model):
    pass
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="users")
    # post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="posts")
    # alreadyLiked = models.BooleanField(default=False)

    # def __str__(self):
    #     return f"{self.user} liked {self.post}"