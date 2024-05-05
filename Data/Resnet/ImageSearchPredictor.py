# Import libraries
import numpy as np
import pandas as pd
from Resnet.ImageDataGatherer import DataGatherer
from PIL import Image
import requests
from io import BytesIO
import os

class GenerateSimilarImages:

    # Constructor
    def __init__(self, image_url):
        self.image_url = image_url
        self.feature_extractor = DataGatherer()

    # Method to generate predictions
    def generate_similar_images(self):

        # load the numpy weights
        project_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        saved_features_path = os.path.join(project_path, "Data/Resnet/vgg_trained_features.npy")
        saved_features = np.load(saved_features_path)
        saved_index_path = os.path.join(project_path, "Data/Resnet/vgg_trained_index.npy")
        saved_index = np.load(saved_index_path)

        # Load the data
        data_path = os.path.join(project_path, "Data/Metadata.csv")
        data = pd.read_csv(data_path)

        '''
        Read the image URL
        '''

        response = requests.get(self.image_url)
        queryImage = Image.open(BytesIO(response.content))

        queryImage_features = self.feature_extractor.extract_features(queryImage)

        similarity_index = {}
        for i, feat in zip(saved_index, saved_features):

            distance = np.sum((queryImage_features - feat) ** 2) ** 0.5
            similarity_index[i] = distance

        similarity_index_sorted = sorted(similarity_index.items(), key = lambda x : x[1])
        top_8_indexes = [idx for idx, _ in similarity_index_sorted][ : 30]

        top_8_images_path = data.iloc[top_8_indexes]['IMAGE_VERSION_1'].values

        top_8_images_path = list(set(top_8_images_path) - set([self.image_url]))
        top_8_images_path = top_8_images_path[:8]

        return queryImage, top_8_images_path
    