# Import libraries
import numpy as np
import pandas as pd
from ImageDataGatherer import DataGatherer
from PIL import Image
import requests
from io import BytesIO

class GenerateSimilarImages:

    # Constructor
    def __init__(self, image_url):
        self.image_url = image_url
        self.feature_extractor = DataGatherer()

    # Method to generate predictions
    def generate_similar_images(self):

        # load the numpy weights
        saved_features = np.load("vgg_trained_features.npy")
        saved_index = np.load("vgg_trained_index.npy")

        # Load the data
        data = pd.read_csv('Data/Metadata.csv')

        '''
        Read the image URL
        '''

        queryImage = Image.open(self.image_url)

        queryImage_features = self.feature_extractor.extract_features(queryImage)

        similarity_index = {}
        for i, feat in zip(saved_index, saved_features):

            distance = np.sum((queryImage_features - feat) ** 2) ** 0.5
            similarity_index[i] = distance

        similarity_index_sorted = sorted(similarity_index.items(), key = lambda x : x[1])
        top_8_indexes = [idx for idx, _ in similarity_index_sorted][ : 8]

        top_8_images_path = data.iloc[top_8_indexes]['IMGName1'].values

        return queryImage, top_8_images_path
    