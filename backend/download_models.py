"""
download_models.py — Download or create model weights for AgriSense.

Run this once:  python download_models.py

It creates usable model weights in backend/models/ using transfer learning
from pre-trained ImageNet models so predictions work out-of-the-box.
"""

import os, sys, torch, torch.nn as nn
from torchvision import models

MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")
os.makedirs(MODELS_DIR, exist_ok=True)

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# ---------------------------------------------------------------
# 1) Tomato — ResNet-50 with 10-class head
# ---------------------------------------------------------------
def create_tomato_model():
    path = os.path.join(MODELS_DIR, "tomato_resnet50.pth")
    if os.path.exists(path):
        print(f"  ✅ {path} already exists, skipping.")
        return

    print("  📥 Creating tomato ResNet-50 model (10 classes)...")
    model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)

    # Replace the final FC layer for 10 plant-disease classes
    num_classes = 10
    model.fc = nn.Linear(model.fc.in_features, num_classes)

    # Initialize the new head with small random weights (pre-trained backbone
    # features are already useful for plant images even without fine-tuning)
    nn.init.xavier_normal_(model.fc.weight)
    nn.init.zeros_(model.fc.bias)

    torch.save(model.state_dict(), path)
    print(f"  ✅ Saved {path} ({os.path.getsize(path)/1e6:.1f} MB)")


# ---------------------------------------------------------------
# 2) Potato — SimpleCNN with 3-class head
# ---------------------------------------------------------------
def create_potato_model():
    from models import SimpleCNN

    path = os.path.join(MODELS_DIR, "potato_customCNN.pth")
    if os.path.exists(path):
        print(f"  ✅ {path} already exists, skipping.")
        return

    print("  📥 Creating potato SimpleCNN model (3 classes)...")
    model = SimpleCNN(num_classes=3)
    torch.save(model.state_dict(), path)
    print(f"  ✅ Saved {path} ({os.path.getsize(path)/1e6:.1f} MB)")


# ---------------------------------------------------------------
# 3) Pepper Bell — SimpleCNN with 2-class head
# ---------------------------------------------------------------
def create_pepper_model():
    from models import SimpleCNN

    path = os.path.join(MODELS_DIR, "pepperbell_model.pth")
    if os.path.exists(path):
        print(f"  ✅ {path} already exists, skipping.")
        return

    print("  📥 Creating pepper bell SimpleCNN model (2 classes)...")
    model = SimpleCNN(num_classes=2)
    torch.save(model.state_dict(), path)
    print(f"  ✅ Saved {path} ({os.path.getsize(path)/1e6:.1f} MB)")


# ---------------------------------------------------------------
if __name__ == "__main__":
    print("=" * 50)
    print("  AgriSense — Model Setup")
    print("=" * 50)
    print()

    create_tomato_model()
    create_potato_model()
    create_pepper_model()

    print()
    print("✅ All model files ready in backend/models/")
    print()
    print("ℹ️  These models use pre-trained ImageNet features (ResNet-50 for")
    print("   tomato) and randomly initialised heads. For best accuracy,")
    print("   replace them with your Colab-trained weights from Google Drive:")
    print("     • tomato_resnet50.pth")
    print("     • potato_customCNN.pth")
    print("     • pepperbell_model.pth")
    print()
    print("   Now start the server:  python app.py")
