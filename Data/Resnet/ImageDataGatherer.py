import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input as resnet_preprocess
from tensorflow.keras.models import Model
image.LOAD_TRUNCATED_IMAGES = True


class DataGatherer:

    def __init__(self):

        base_model = ResNet50(weights='imagenet')
        self.model = Model(inputs=base_model.input, outputs=base_model.get_layer('avg_pool').output)

    def extract_features(self, img):

        img = img.resize((224, 224))
        img = img.convert('RGB')

        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)

        x = resnet_preprocess(x)
        features = self.model.predict(x)
        features = features / np.linalg.norm(features)
        return features