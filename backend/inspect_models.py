import torch
import os
import json

models_dir = r"c:\Users\Hp\AgriSense\backend\models"
files = [f for f in os.listdir(models_dir) if f.endswith(".pth")]

results = {}

for f in files:
    path = os.path.join(models_dir, f)
    try:
        # Load state dict
        state_dict = torch.load(path, map_location="cpu", weights_only=True)
        keys = list(state_dict.keys())
        
        num_classes = 0
        arch = "unknown"
        
        # Heuristics
        if "fc.weight" in state_dict:
            num_classes = state_dict["fc.weight"].shape[0]
            arch = "ResNet"
        elif "classifier.1.weight" in state_dict:
            num_classes = state_dict["classifier.1.weight"].shape[0]
            if any("features" in k for k in keys):
                arch = "EfficientNet or DeepLite"
            else:
                arch = "Sequential/Classifier"
        elif "classifier.3.weight" in state_dict:
            num_classes = state_dict["classifier.3.weight"].shape[0]
            arch = "DeepLite/Improved(3)"
        elif "classifier.4.weight" in state_dict:
            num_classes = state_dict["classifier.4.weight"].shape[0]
            arch = "Augmented/Improved(4)"
        elif "fc2.weight" in state_dict:
            num_classes = state_dict["fc2.weight"].shape[0]
            arch = "SimpleCNN"

        results[f] = {
            "num_keys": len(keys),
            "arch": arch,
            "num_classes": num_classes,
            "first_key": keys[0],
            "last_key": keys[-1]
        }
        del state_dict
    except Exception as e:
        results[f] = {"error": str(e)}

with open("model_results.json", "w") as f_out:
    json.dump(results, f_out, indent=2)

print("Done. Results saved to model_results.json")
