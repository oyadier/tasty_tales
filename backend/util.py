 #!/usr/bin/env python3
from io import BytesIO
from PIL import Image
from pydantic import BaseModel
from typing import Optional
import base64


def image_to_bytes(image_path: str, size: tuple) -> str:
    """Convert and resize an image to a base64 encoded string."""
    with Image.open(image_path) as img:
        # Resize the image using LANCZOS
        img = img.resize(size, Image.LANCZOS)
        img_byte_arr = BytesIO()
        img.save(img_byte_arr, format='PNG')  # Ensure format is PNG
        img_byte_arr.seek(0)
        return base64.b64encode(img_byte_arr.getvalue()).decode('utf-8')

def bytes_to_image(img_str: str) -> Optional[Image.Image]:
    """Convert a base64 encoded string back to an image."""
    try:
        img_bytes = base64.b64decode(img_str)
        return Image.open(BytesIO(img_bytes))
    except Exception as e:
        print(f"Error converting string to image: {e}")
        return None


# Example usage:
# image_path = "path/to/your/image.png"  # Replace with your image path
# resize_size = (100, 100)  # New size (width, height)
# image_bytes = image_to_bytes(image_path, resize_size)

# Validate and store using Pydantic
# image_data = ImageData(image_bytes=image_bytes)

# Convert back to an image
# converted_image = bytes_to_image(image_data.image_bytes)

# Optionally show the image
# if converted_image:
#     converted_image.show()
     

# # Example usage:
# image_path = "path/to/your/image.png"  # Replace with your image path
# resize_size = (100, 100)  # New size (width, height)
# image_bytes = image_to_bytes(image_path, resize_size)

# # Validate and store using Pydantic
# image_data = ImageData(image_bytes=image_bytes)

# # Convert back to an image
# converted_image = bytes_to_image(image_data.image_bytes)

# # Optionally show the image
# if converted_image:
#     converted_image.show()

# import io
# from PIL import Image
# import matplotlib.pyplot as plt
# import base64
# from typing import Optional

# def image_to_bytes(image_path: str, size: tuple[int, int]) -> Optional[str]:
#     try:
#         # Open the image
#         image = Image.open(image_path)
        
#         # Convert to PNG if it's not already
#         if image.format != 'PNG':
#             image = image.convert('RGBA')
        
#         # Resize the image
#         image.thumbnail(size, Image.BICUBIC)
#         image_format = image_path.split('.')[-1].upper()
#         # Save to BytesIO as PNG
#         img_byte = io.BytesIO()
#         image.save(img_byte, format='PNG')
#         img_byte.seek(0)  # Reset the BytesIO object position to the beginning
        
#         # Encode to base64
#         base64_encoded = base64.b64encode(img_byte.getvalue()).decode('utf-8')
#         return base64_encoded
#     except Exception as e:
#         print(f"Error converting image to string: {e}")
#         return None

# def bytes_to_image(base64_str: str) -> Optional[dict]:
#     try:
#         # Decode base64 string to bytes
#         img_bytes = base64.b64decode(base64_str)
        
#         # Create image from bytes
#         res_image = Image.open(io.BytesIO(img_bytes))
        
#         # Ensure it's PNG
#         if res_image.format != 'PNG':
#             res_image = res_image.convert('RGBA')
        
#         # Display image (optional)
#         plt.imshow(res_image)
#         plt.axis('off')
#         plt.show()
        
#         # Convert image to serializable format
#         img_byte = io.BytesIO()
#         res_image.save(img_byte, format='PNG')
#         img_byte.seek(0)
#         img_base64 = base64.b64encode(img_byte.getvalue()).decode('utf-8')
        
#         return {
#             "format": "PNG",
#             "mode": res_image.mode,
#             "size": res_image.size,
#             "data": img_base64
#         }
#     except Exception as e:
#         print(f"Error converting string to image: {e}")
#         return None

# # # Example usage
# # if __name__ == "__main__":
# #     # Convert image to string
# #     encoded_img = image_to_string("path_to_your_image.png", (300, 300))
    
# #     if encoded_img:
# #         print("Image encoded successfully")
        
# #         # Convert string back to image
# #         image_data = str_to_image(encoded_img)
        
# #         if image_data:
# #             print("Image decoded successfully")
# #             print(f"Format: {image_data['format']}")
# #             print(f"Mode: {image_data['mode']}")
# #             print(f"Size: {image_data['size']}")
# #             print(f"Base64 data length: {len(image_data['data'])}")