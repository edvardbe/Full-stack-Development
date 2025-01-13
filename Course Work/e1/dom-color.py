import cv2
import json
import numpy as np
from PIL import Image
import requests
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt



def fetch_image_from_url(url):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Raise an error for bad status codes
        image_data = np.asarray(bytearray(response.content), dtype="uint8")
        image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert from BGR to RGB
        return image
    except requests.RequestException as e:
        print(f"Error fetching image from URL {url}: {e}")
        return None

def find_dominant_colors(url, k=5):
    # Load image

    image = Image.open(url)
    image = np.array(image)
         # Convert from BGR to RGB

    # Reshape image into a 2D array of pixels
    pixels = image.reshape((-1, 3))

    # Apply K-means clustering
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(pixels)

    # Get the cluster centers (dominant colors)
    dominant_colors = np.array(kmeans.cluster_centers_, dtype='uint8')

    # Display the image and dominant colors
    """ visualize_dominant_colors(image, dominant_colors) """
    return dominant_colors

def visualize_dominant_colors(image, dominant_colors):
    # Display the original image
    plt.figure(figsize=(10, 6))
    plt.subplot(1, 2, 1)
    plt.imshow(image)
    plt.axis('off')
    plt.title('Original Image')

    # Create a color palette
    palette = np.zeros((50, 300, 3), dtype='uint8')
    steps = 300 // len(dominant_colors)
    for i, color in enumerate(dominant_colors):
        palette[:, i * steps:(i + 1) * steps, :] = color

    # Display the color palette
    plt.subplot(1, 2, 2)
    plt.imshow(palette)
    plt.axis('off')
    plt.title('Dominant Colors')

    plt.show()

def rgb_to_hex(rgb):
    """Convert an RGB tuple to a hex color code."""
    return "#{:02x}{:02x}{:02x}".format(*rgb)


# Example usage
with open('resources/image-info.json') as f:
    data_json = json.load(f)

for image in data_json["images"]:
    if isinstance(image, dict) and "src" in image:
        image_path = "resources/"+ image["src"]    
    k = 5  # Number of dominant colors to find
    dominant_colors = find_dominant_colors(image_path, k)
    dom_color = dominant_colors[0]
    json_update = {
        "dominant_color": dom_color.tolist()
    }
    print(f"Dominant Colors (RGB) for {image["src"]}: \n", dominant_colors)

    # Convert the dominant colors to hex codes
    hex_colors = [rgb_to_hex(color) for color in dominant_colors]
    print(f"Dominant Colors (Hex) for {image["src"]}:\n", hex_colors, "\n")

    
