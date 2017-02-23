import RNFS from 'react-native-fs';
import { RNS3 } from 'react-native-aws3';
import config from '../../local.config.json';

const CONFIG = {
  GOOGLE: {
    API_KEY: config.GOOGLE_API_KEY
  }
};

export default class ImagesUtil {

  static async encodeBase64(imageUrl) {
    return RNFS.readFile(imageUrl, 'base64');
  }
  /*
    upload image to AWS S3
    @params
      image : native image file path or url
      name  : file name you want to upload
    @returns
    {
      image: String,  // original image path
      url: String,    // aws image url
      name: String    // file name this is created on AWS S3
    }
   */
  static upload(image, name = 'new-file-name') {
    const file = {
      uri: image,
      name: `${name}.jpg`,
      type: 'image/jpeg'
    };

    const options = {
      keyPrefix: config.AWS.S3.PREFIX,
      bucket: config.AWS.S3.BUCKET,
      region: config.AWS.S3.REGION,
      accessKey: config.AWS.ACCESS_KEY,
      secretKey: config.AWS.SECRET_KEY,
      successActionStatus: config.AWS.S3.SUCCESS_STATUS
    };

    return new Promise((resolve, reject) => {
      RNS3.put(file, options).then(res => {
        if (res.status !== options.successActionStatus) {
          return reject(new Error('Failed to upload image to S3'));
        }
        return resolve({
          image,
          url: res.body.postResponse.location,
          name: res.body.postResponse.key
        });
      });
    });
  }

  static colorToHex(colorObj) {
    return `#${colorObj.red.toString(16)}${colorObj.green.toString(16)}${colorObj.blue.toString(16)}`;
  }
  /*
   @Return JSON
   {
   red: String,    // 0 ~ 255
   green: String,  // 0 ~ 255
   blue: String    // 0 ~ 255
   }
   */
  static getColorFromImage(imageUrl) {

    const address = `https://vision.googleapis.com/v1/images:annotate?key=${CONFIG.GOOGLE.API_KEY}`;

    const body = {
      requests: [{
        image: {
          content: ''
        },
        features: [
          {
            type: 'IMAGE_PROPERTIES',
            maxResults: 10
          }
        ]
      }]
    };

    return ImagesUtil.encodeBase64(imageUrl)
      .then(base64image => {
        body.requests[0].image.content = base64image;
        return fetch(address, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(res => {
            if (!res.ok) {
              throw Error('No result');
            }
            return res.json();
          })
          .then(obj => obj.responses[0].imagePropertiesAnnotation.dominantColors.colors[0].color)
          .catch(() => {
            return {
              red: 0,
              green: 0,
              blue: 0
            };
          })
          .then(ImagesUtil.colorToHex);
      });
  }

  /*
   @Return JSON
   {
   desc: String // text in the image
   }
   */
  static getTextFromImage(imageUrl) {

    const address = `https://vision.googleapis.com/v1/images:annotate?key=${CONFIG.GOOGLE.API_KEY}`;

    const body = {
      requests: [{
        image: {
          content: ''
        },
        features: [
          {
            type: 'TEXT_DETECTION',
            maxResults: 10
          }
        ]
      }]
    };

    return ImagesUtil.encodeBase64(imageUrl)
      .then(data => {
        body.requests[0].image.content = data;
        return fetch(address, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        .then(res => {
          if (!res.ok) {
            throw Error('No result');
          }
          return res.json();
        })
        .then((obj) => {
          return { desc: obj.responses[0].textAnnotations[0].description };
        })
        .catch(() => {
          return {};
        });
      });
  }
}
