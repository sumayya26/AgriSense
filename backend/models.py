"""
Model architecture definitions matching Agrisense.ipynb notebook EXACTLY.

Three trained models:
  - tomato_resnet50.pth   → ResNet-50 (pretrained), 10 classes, 224x224
  - potato_customCNN.pth  → SimpleCNN, 3 classes, 224x224
  - pepperbell_model.pth  → SimpleCNN, 2 classes, 224x224
"""
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models


# ---------------------------------------------------------------------------
# SimpleCNN  –  used for Potato and Pepper Bell
# (matches Cell 21 / 28 of the notebook: 224×224 input)
# ---------------------------------------------------------------------------
class SimpleCNN(nn.Module):
    """Simple 2-conv CNN used for potato_customCNN.pth & pepperbell_model.pth."""
    def __init__(self, num_classes):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        # 224 -> pool -> 112 -> pool -> 56  => 64 * 56 * 56
        self.fc1 = nn.Linear(64 * 56 * 56, 256)
        self.fc2 = nn.Linear(256, num_classes)

    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = x.view(x.size(0), -1)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x


# ---------------------------------------------------------------------------
# ImprovedCNN  –  alternative potato model (128×128 input, from Cell 16)
# ---------------------------------------------------------------------------
class ImprovedCNN(nn.Module):
    """4-conv CNN with BatchNorm (used for potato in some notebook runs)."""
    def __init__(self, num_classes, img_size=128):
        super(ImprovedCNN, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.BatchNorm2d(32), nn.ReLU(), nn.MaxPool2d(2, 2),
            nn.Conv2d(32, 64, 3, padding=1), nn.BatchNorm2d(64), nn.ReLU(), nn.MaxPool2d(2, 2),
            nn.Conv2d(64, 128, 3, padding=1), nn.BatchNorm2d(128), nn.ReLU(), nn.MaxPool2d(2, 2),
            nn.Conv2d(128, 256, 3, padding=1), nn.BatchNorm2d(256), nn.ReLU(), nn.MaxPool2d(2, 2),
        )
        feat_size = img_size // 16  # 4 MaxPool layers each halve the size
        self.classifier = nn.Sequential(
            nn.Linear(256 * feat_size * feat_size, 512),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(512, num_classes),
        )

    def forward(self, x):
        x = self.features(x)
        x = x.view(x.size(0), -1)
        return self.classifier(x)


# ---------------------------------------------------------------------------
# DeepLiteCNN  –  kept for backwards compat but not currently trained
# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------
# DeepLiteCNN  –  Used for many crops (Blueberry, Cherry, Grape, etc.)
# ---------------------------------------------------------------------------
class DeepLiteCNN(nn.Module):
    """Lightweight CNN with AdaptiveAvgPool (input-size agnostic)."""
    def __init__(self, num_classes):
        super(DeepLiteCNN, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.BatchNorm2d(32), nn.ReLU(), nn.MaxPool2d(2, 2),
            nn.Conv2d(32, 64, 3, padding=1), nn.BatchNorm2d(64), nn.ReLU(), nn.MaxPool2d(2, 2),
            nn.Conv2d(64, 128, 3, padding=1), nn.BatchNorm2d(128), nn.ReLU(), nn.MaxPool2d(2, 2),
            nn.Conv2d(128, 256, 3, padding=1), nn.BatchNorm2d(256), nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1)),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Dropout(0.5),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, num_classes),
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x


# ---------------------------------------------------------------------------
# AugmentedCNN / ImprovedCNN (Augmented version from Cell 36)
# ---------------------------------------------------------------------------
class AugmentedCNN(nn.Module):
    def __init__(self, num_classes):
        super(AugmentedCNN, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.BatchNorm2d(32), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1), nn.BatchNorm2d(64), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(64, 128, 3, padding=1), nn.BatchNorm2d(128), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(128, 256, 3, padding=1), nn.BatchNorm2d(256), nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1))
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Dropout(0.6),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        return self.classifier(x)


# ---------------------------------------------------------------------------
# Helper loaders
# ---------------------------------------------------------------------------
def load_resnet50(num_classes, weights_path, device):
    """Load ResNet-50 with custom head."""
    model = models.resnet50(weights=None)
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    model.load_state_dict(torch.load(weights_path, map_location=device, weights_only=True))
    model.to(device).eval()
    return model

def load_efficientnet_b0(num_classes, weights_path, device):
    """Load EfficientNet-B0 with custom head."""
    model = models.efficientnet_b0(weights=None)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, num_classes)
    model.load_state_dict(torch.load(weights_path, map_location=device, weights_only=True))
    model.to(device).eval()
    return model
