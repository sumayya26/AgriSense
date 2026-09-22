"""Quick test: POST test_leaf.jpg to the predict endpoint."""
import http.client, json, os

filepath = os.path.join(os.path.dirname(__file__), "test_leaf.jpg")
boundary = "----TestBoundary123"

with open(filepath, "rb") as f:
    img_data = f.read()

body = (
    f"--{boundary}\r\n"
    f'Content-Disposition: form-data; name="image"; filename="test_leaf.jpg"\r\n'
    f"Content-Type: image/jpeg\r\n\r\n"
).encode() + img_data + f"\r\n--{boundary}--\r\n".encode()

conn = http.client.HTTPConnection("localhost", 5000)
conn.request(
    "POST", "/api/predict", body,
    {"Content-Type": f"multipart/form-data; boundary={boundary}"},
)
resp = conn.getresponse()
result = json.loads(resp.read())
print(json.dumps(result, indent=2))
