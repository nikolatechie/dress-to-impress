from fastapi import FastAPI
from Resnet.ImageSearchPredictor import GenerateSimilarImages

app = FastAPI()
@app.post("/api/v1/findSimilarImages")
async def findSimilarImages(baseImageUrl: str):
    generator = GenerateSimilarImages(baseImageUrl)
    queryImage, top_8_images_path = generator.generate_similar_images()
    similarImages = ", ".join(top_8_images_path)
    return {"top8Images":similarImages}