import pandas as pd
import numpy as np
from keras.preprocessing import image
from ImageDataGatherer import DataGatherer
image.LOAD_TRUNCATED_IMAGES = True
import os
import datetime

if __name__ == '__main__':

    data = pd.read_csv("Data/Metadata.csv")

    images_dir = "Data/Images/"


    index_values = np.arange(1, 5000)
    modelImages = data.iloc[index_values]['IMGName1']

    data_gather = DataGatherer()

    # dictionary to store the features and index of the image
    image_features_vgg = {}
    weights_to_save = []
    index_to_save = []
    total_images = len(index_values)
    for i, (idx, img_path) in enumerate(zip(index_values, modelImages)):
        if (i + 1) % 100 == 0:
            current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            print("{} images left at {}".format(total_images - (i + 1), current_time))
        # Extract features and store in a dictionary
        img = image.load_img(images_dir + img_path)
        feature = data_gather.extract_features(img)
        image_features_vgg[idx] = feature
        weights_to_save.append(feature)
        index_to_save.append(idx)

    weights_to_save_arr = np.asarray(weights_to_save)
    index_to_save_arr = np.asarray(index_to_save)

    if os.path.exists('vgg_trained_features.npy') and os.path.exists('vgg_trained_index.npy'):
        old_weights = np.load('vgg_trained_features.npy')
        old_index = np.load('vgg_trained_index.npy')
        weights_to_save_arr = np.concatenate((old_weights, weights_to_save_arr), axis=0)
        index_to_save_arr = np.concatenate((old_index, index_to_save_arr), axis=0)

    np.save('vgg_trained_features.npy', weights_to_save_arr)
    np.save('vgg_trained_index.npy', index_to_save_arr)
