from fastapi import FastAPI
from Resnet.ImageSearchPredictor import GenerateSimilarImages
import requests
import json
import base64
import os

app = FastAPI()
@app.post("/api/v1/findSimilarImages")
async def findSimilarImages(baseImageUrl: str):
    generator = GenerateSimilarImages(baseImageUrl)
    queryImage, top_8_images_path = generator.generate_similar_images()
    similarImages = ", ".join(top_8_images_path)
    return {"top8Images":similarImages}


@app.post("/api/v1/describeImage")
async def describeImage(ImageUrl: str):
    # API configurations
    asticaAPI_key = '037676E5-4E90-4C3A-B65C-E21DD0D60011934524347EAF5B-3C48-48AB-968E-35AE69184503'  # visit https://astica.ai
    asticaAPI_timeout = 50 # in seconds. "gpt" or "gpt_detailed" require increased timeouts
    asticaAPI_endpoint = 'https://vision.astica.ai/describe'
    asticaAPI_modelVersion = '2.5_full' # 1.0_full, 2.0_full, 2.1_full or 2.5_full

    if 1 == 1:
        asticaAPI_input = ImageUrl # use https image input (faster)
    else:
        asticaAPI_input = get_image_base64_encoding('image.jpg')  # use base64 image input (slower)

    # vision parameters:  https://astica.ai/vision/documentation/#parameters
    asticaAPI_visionParams = 'describe'

    #optional inputs:
    asticaAPI_gpt_prompt = '' # only used if visionParams includes "gpt" or "gpt_detailed"
    asticaAPI_prompt_length = 90 # number of words in GPT response

    asticaAPI_objects_custom_kw = '' # only used if visionParams includes "objects_custom" (v2.5_full or higher)

    # Define payload dictionary
    asticaAPI_payload = {
        'tkn': asticaAPI_key,
        'modelVersion': asticaAPI_modelVersion,
        'visionParams': asticaAPI_visionParams,
        'input': asticaAPI_input,
        'gpt_prompt': asticaAPI_gpt_prompt,
        'prompt_length': asticaAPI_prompt_length,
        'objects_custom_kw': asticaAPI_objects_custom_kw
    }

    # call API function 
    asticaAPI_result = asticaAPI(asticaAPI_endpoint, asticaAPI_payload, asticaAPI_timeout)

    # print API output
    print('\nastica API Output:')
    print(json.dumps(asticaAPI_result, indent=4))
    print('=================')
    print('=================')
    # Handle asticaAPI response
    if 'status' in asticaAPI_result:
        print(asticaAPI_result)
        # Output Error if exists
        if asticaAPI_result['status'] == 'error':
            print('Output:\n', asticaAPI_result['error'])
        # Output Success if exists
        if asticaAPI_result['status'] == 'success':
            if 'caption_GPTS' in asticaAPI_result and asticaAPI_result['caption_GPTS'] != '':
                print('=================')
                print('GPT Caption:', asticaAPI_result['caption_GPTS'])
            if 'caption' in asticaAPI_result and asticaAPI_result['caption']['text'] != '':
                print('=================')
                print('Caption:', asticaAPI_result['caption']['text'])
                description = asticaAPI_result['caption']['text'];
            if 'CaptionDetailed' in asticaAPI_result and asticaAPI_result['CaptionDetailed']['text'] != '':
                print('=================')
                print('CaptionDetailed:', asticaAPI_result['CaptionDetailed']['text'])
            if 'objects' in asticaAPI_result:
                print('=================')
                print('Objects:', asticaAPI_result['objects'])
    else:
        print('Invalid response')

    return {"description": description}


def get_image_base64_encoding(image_path: str) -> str:
    with open(image_path, 'rb') as file:
        image_data = file.read()
    return base64.b64encode(image_data).decode('utf-8')

def asticaAPI(endpoint, payload, timeout):
    response = requests.post(endpoint, data=json.dumps(payload), timeout=timeout, headers={ 'Content-Type': 'application/json', })
    if response.status_code == 200:
        return response.json()
    else:
        return {'status': 'error', 'error': 'Failed to connect to the API.'}

