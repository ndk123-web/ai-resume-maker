import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api
import os 


async def upload_image_from_url(file_path,filename):
    
    cloudinary.config(
        cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"), 
        api_key=os.getenv("CLOUDINARY_API_KEY"),
        api_secret=os.getenv("CLOUDINARY_API_SECRET"),
        secure=True
    )
    result = cloudinary.uploader.upload(
        file_path,
        public_id=filename,
        unique_filename=False,
        overwrite=True,
        resource_type="raw"
    )

    src_url = CloudinaryImage(filename).build_url()
    print("Image URL: ", src_url)
    return src_url
