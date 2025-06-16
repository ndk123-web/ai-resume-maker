import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api
import os 
from dotenv import load_dotenv

load_dotenv()

async def upload_image_from_url(file_path, filename):
    
    cloudinary.config(
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"), 
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True,
    )

    try:
        result = cloudinary.uploader.upload(
            file_path,
            public_id=filename,
            unique_filename=False,
            overwrite=True,
            resource_type="auto",
        )

        print("✅ Upload result:", result)

        # ✅ Use secure_url from the result (actual accessible file)
        return result["secure_url"]

    except Exception as e:
        print("❌ Cloudinary upload failed:", str(e))
        return None