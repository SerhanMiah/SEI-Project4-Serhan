from django.urls import path


from .views import RegisterView, LoginView, ProfileView, EditProfile

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view()),
  path('profile/', ProfileView.as_view()),
  path('profile/<int:pk>/', EditProfile.as_view())

]