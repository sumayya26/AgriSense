import requests
import os

# Base URL
BASE_URL = "http://localhost:5000/api"

def test_health():
    print("Checking backend health...")
    try:
        resp = requests.get(f"{BASE_URL}/health")
        print(f"Health: {resp.json()}")
        return resp.json().get("status") == "ok"
    except Exception as e:
        print(f"FAILED to connect to backend: {e}")
        return False

def test_predict_auto():
    print("\nTesting 'auto' prediction...")
    # Using the existing test leaf image
    img_path = os.path.join(os.path.dirname(__file__), "test_leaf.jpg")
    if not os.path.exists(img_path):
        print(f"Test image not found at {img_path}")
        return

    with open(img_path, "rb") as f:
        files = {"image": f}
        data = {"crop_type": "auto"}
        resp = requests.post(f"{BASE_URL}/predict", files=files, data=data)
    
    result = resp.json()
    print(f"Response: {result}")
    
    if result.get("success"):
        print(f"✅ Auto-predict successful: {result['prediction']['disease']} ({result['prediction']['confidence']}%)")
    elif result.get("low_confidence"):
        print(f"ℹ️ Low confidence handled correctly: {result['error']}")
    else:
        print(f"❌ Auto-predict failed: {result.get('error')}")

def test_predict_manual():
    print("\nTesting manual crop prediction (potato)...")
    img_path = os.path.join(os.path.dirname(__file__), "test_leaf.jpg")
    with open(img_path, "rb") as f:
        files = {"image": f}
        data = {"crop_type": "potato"}
        resp = requests.post(f"{BASE_URL}/predict", files=files, data=data)
    
    result = resp.json()
    print(f"Response: {result}")
    if result.get("success") or result.get("low_confidence"):
        print(f"✅ Manual predict test passed (got response).")
    else:
        print(f"❌ Manual predict test failed: {result.get('error')}")

if __name__ == "__main__":
    if test_health():
        test_predict_auto()
        test_predict_manual()
    else:
        print("\nSkipping tests because backend is down.")
        print("Please start the backend: cd backend && python app.py")
