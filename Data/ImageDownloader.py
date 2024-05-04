import pandas as pd
import requests

def createMetadataframe():
    df_copy = df.copy()
    df_copy['year'] = df_copy['IMAGE_VERSION_1'].str.extract(r'(?<=https://static.zara.net/photos///)(.*?)(?=/)')
    df_copy['season'] = df_copy['IMAGE_VERSION_1'].str.extract(r'(?<=https://static.zara.net/photos///\d{4}/)(.*?)(?=/)')
    df_copy['productType'] = df_copy['IMAGE_VERSION_1'].str.extract(r'(?<=https://static.zara.net/photos///\d{4}/[a-zA-Z]/)(.*?)(?=/)')
    df_copy['section'] = df_copy['IMAGE_VERSION_1'].str.extract(r'(?<=https://static.zara.net/photos///\d{4}/[a-zA-Z]/\d{1}/)(.*?)(?=/)')

    df_copy['IMGName1'] = df_copy.index.astype(str) + "_1_" + df_copy['year'] + "_" + df_copy['season'] + "_" + df_copy['productType'] + "_" + df_copy['section'] + ".jpg"
    df_copy['IMGName2'] = df_copy.index.astype(str) + "_2_" + df_copy['year'] + "_" + df_copy['season'] + "_" + df_copy['productType'] + "_" + df_copy['section'] + ".jpg"
    df_copy['IMGName3'] = df_copy.index.astype(str) + "_3_" + df_copy['year'] + "_" + df_copy['season'] + "_" + df_copy['productType'] + "_" + df_copy['section'] + ".jpg"

    df_copy.to_csv('Data/Metadata.csv', index=False)

def downloadImages():
    for index, row in df.iloc[320:450].iterrows():
        downloadImage(row['IMAGE_VERSION_1'], row['IMGName1'])
        downloadImage(row['IMAGE_VERSION_2'], row['IMGName2'])
        downloadImage(row['IMAGE_VERSION_3'], row['IMGName3'])

def downloadImage(image_url, image_name):
    print(image_url, image_name)
    response = requests.get(image_url)
    if response.status_code == 200:
        with open("Data/Images/" + image_name, 'wb') as f:
            f.write(response.content)
    else:
        print(f"Failed to download image" + image_name)

def preprocessData():
    df.dropna(subset=['IMAGE_VERSION_1', 'IMAGE_VERSION_2', 'IMAGE_VERSION_3'], inplace=True)

if __name__ == '__main__':
    csv_file_path = 'Data/inditextech_hackupc_challenge_images.csv'

    df = pd.read_csv(csv_file_path)

    preprocessData()

    createMetadataframe()

    csv_file_path = 'Data/Metadata.csv'
    df = pd.read_csv(csv_file_path)

    downloadImages()