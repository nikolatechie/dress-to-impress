# Dress to Impress

Dress to Impress is a web application that allows users to virtually try on clothes without needing to visit a store in person. Developed during the **HackUPC**, a 36-hour hackathon in Barcelona, it was part of a challenge organised by *Inditex*. The original challenge was to find the most similar pieces of clothing to the ones you like, in an online store. We enhanced this with a feature enabling users to try on clothes virtually by uploading a picture of themselves, where a machine learning model overlays the garment onto the user.

## Features

- **Virtual Try-On**: Upload a photo and see how clothes look on you.
- **Similarity Search**: Find clothing items similar to your chosen pieces.
- **User-Friendly Interface**: Easy and intuitive navigation.
- **Machine Learning Integration**: Advanced ML models for accurate virtual try-ons.

## Development process

Frontend was built using **React.js** + **Typescript**. Backend was developed mostly using **Java Spring Boot**, but we also utilised **Python FastAPI** that allows communication with the ML model. We chose **ResNet** image recognition model as its performance turned out to be better than VGG and Xception. 

## Acknowledgments

- **HackUPC**: For organising the hackathon where this project was conceived.
- **Inditex**: For providing the challenge and inspiration for this project.

## Contributors

Special thanks to the following contributors:

- Nikola Grujic ([@nikolatechie](https://www.github.com/nikolatechie))
- Vladan Cvjetkovic ([@cvele0](https://www.github.com/cvele0))
- Milan Jovanovic ([@MJovanovic40](https://www.github.com/MJovanovic40))
- Lukas Pottner ([@Potti1234](https://www.github.com/Potti1234))

---

Thank you for using Dress to Impress! Enjoy your virtual shopping experience.

![Demo](./demo.gif)
