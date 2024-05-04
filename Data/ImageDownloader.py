import pandas as pd
import requests
import os

def createMetadataframe():
    df_copy = df.copy()
    df_copy['year'] = df_copy['IMAGE_VERSION_1'].str.extract(r'(?<=https://static.zara.net/photos///)(.*?)(?=/)')
    df_copy['season'] = df_copy['IMAGE_VERSION_1'].str.extract(r'(?<=https://static.zara.net/photos///\d{4}/)(.*?)(?=/)')
    df_copy['productType'] = df_copy['IMAGE_VERSION_1'].str.extract(r'(?<=https://static.zara.net/photos///\d{4}/[a-zA-Z]/)(.*?)(?=/)')
    df_copy['section'] = df_copy['IMAGE_VERSION_1'].str.extract(r'(?<=https://static.zara.net/photos///\d{4}/[a-zA-Z]/\d{1}/)(.*?)(?=/)')

    df_copy['IMGName1'] = df_copy.index.astype(str) + "_1_" + df_copy['year'] + "_" + df_copy['season'] + "_" + df_copy['productType'] + "_" + df_copy['section'] + ".jpg"
    df_copy['IMGName2'] = df_copy.index.astype(str) + "_2_" + df_copy['year'] + "_" + df_copy['season'] + "_" + df_copy['productType'] + "_" + df_copy['section'] + ".jpg"
    df_copy['IMGName3'] = df_copy.index.astype(str) + "_3_" + df_copy['year'] + "_" + df_copy['season'] + "_" + df_copy['productType'] + "_" + df_copy['section'] + ".jpg"

    df_copy.dropna(inplace=True)

    df_copy = removeInvalidRows(df_copy)

    df_copy.to_csv('Data/Metadata.csv', index=False)

def downloadImages():
    for index, row in df.iloc[0:].iterrows():
        downloadImage(row['IMAGE_VERSION_1'], row['IMGName1'])
        downloadImage(row['IMAGE_VERSION_2'], row['IMGName2'])
        downloadImage(row['IMAGE_VERSION_3'], row['IMGName3'])

def downloadImage(image_url, image_name):
    #print(image_url, image_name)
    response = requests.get(image_url)
    if response.status_code == 200:
        with open("Data/Images/" + image_name, 'wb') as f:
            f.write(response.content)
    else:
        print(f"Failed to download image" + image_name)

def removeInvalidRows(df):
    for index, row in df.iterrows():
        img_name_1 = row['IMGName1']
        img_name_2 = row['IMGName2']
        img_name_3 = row['IMGName3']
            
        if not (os.path.exists(f"Data/Images/{img_name_1}") and os.path.exists(f"Data/Images/{img_name_2}") and os.path.exists(f"Data/Images/{img_name_3}")):
            df.drop(index, inplace=True)
    return df;


def preprocessData():
    df.dropna(inplace=True)

if __name__ == '__main__':
    csv_file_path = 'Data/inditextech_hackupc_challenge_images.csv'

    df = pd.read_csv(csv_file_path)

    preprocessData()

    createMetadataframe()

    csv_file_path = 'Data/Metadata.csv'
    df = pd.read_csv(csv_file_path)

    #downloadImages()