/**
 * @description
 * Convert an Asset File to object URI for better performance
 * - A user can use this url as a resource url
 *      - For example it can be used as src of image, video tag.
 *
 * Refer to this link for more detailed information
 * https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
 *
 * @param {File} file  The video file
 * @param {boolean} revoke If true the object uri will be removed after its creation
 * @returns {string} window object url ex. https://blob:video58699
 *
 */
exports.importFileandPreview = (file, revoke) => {
  return new Promise((resolve, _) => {
    window.URL = window.URL || window.webkitURL;
    let preview = window.URL.createObjectURL(file);
    // remove reference
    if (revoke) {
      window.URL.revokeObjectURL(preview);
    }
    setTimeout(() => {
      resolve(preview);
    }, 100);
  });
};

/**
 * @description
 * Idea taken from - https://codepen.io/aertmann/pen/mrVaPx
 * The original functionality of getVideoThumbnail() function is customized as per working code
 * If it didn't work in future then replace it with about links working example
 *
 * @param {File} videoFile The video file
 * @param {number} numberOfThumbnails Number of thumbnails you want to generate
 * @returns {string[]} An array of `base64` images
 *
 */
exports.generateVideoThumbnails = async (
  videoFile,
  numberOfThumbnails = 10
) => {
  let thumbnail = [];
  let fractions = [];
  return new Promise(async (resolve, reject) => {
    if (!videoFile.type.includes("video")) reject("not a valid video file");
    await getVideoDuration(videoFile).then(async (duration) => {
      // divide the video timing into particular timestamps in respective to number of thumbnails
      // ex if time is 10 and numOfthumbnails is 4 then result will be -> 0, 2.5, 5, 7.5 ,10
      // we will use this timestamp to take snapshots
      for (let i = 1; i <= duration; i += duration / numberOfThumbnails) {
        fractions.push(Math.floor(i));
      }
      // reducing the time of last fraction by -2 because, thumbnail of that time
      // was not generating and promise kept in pending status
      let allThumbnailPromises = fractions.map((time, index) =>
        getVideoThumbnail(
          videoFile,
          index >= fractions.length ? time - 2 : time
        )
      );
      await Promise.all(allThumbnailPromises).then((res) => {
        res.forEach((thumb) => {
          thumbnail.push(thumb);
        });
        // Get the middle most thumbnail
        const midThumbnail = thumbnail[Math.floor(arr.length / 2)];
        resolve(midThumbnail);
      });
    });
    reject("something went wrong");
  });
};

/**
 * @description
 * This function takes an VideoFile and Timeframe as input and returns the
 * `base64` image of that particular timeFrame of video.
 * - It create video element and play it at the given time then,
 * - Create an svg element and draws the current frame of video on to svg.
 * - This svg then get converted to dataURI and sent as response.
 *
 * @param {File} file The video file
 * @param {number} videoTimeInSeconds Timeframe of video [at this particular time the thumbnail will be generated]
 * @returns {string} Returns an Array of `base64` Images
 */
exports.getVideoThumbnail = (file, videoTimeInSeconds) => {
  return new Promise((resolve, reject) => {
    if (file.type.match("video")) {
      importFileandPreview(file).then((urlOfFIle) => {
        var video = document.createElement("video");
        var timeupdate = function () {
          if (snapImage()) {
            video.removeEventListener("timeupdate", timeupdate);
            video.pause();
          }
        };
        video.addEventListener("loadeddata", function () {
          if (snapImage()) {
            video.removeEventListener("timeupdate", timeupdate);
            URL.revokeObjectURL(urlOfFIle);
          } else {
            URL.revokeObjectURL(urlOfFIle);
          }
        });
        var snapImage = function () {
          var canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas
            .getContext("2d")
            .drawImage(video, 0, 0, canvas.width, canvas.height);
          var image = canvas.toDataURL();
          var success = image.length > 100000;
          if (success) {
            URL.revokeObjectURL(urlOfFIle);
            resolve(image);
          }
          return success;
        };
        video.addEventListener("timeupdate", timeupdate);
        video.preload = "metadata";
        video.src = urlOfFIle;
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.currentTime = videoTimeInSeconds;
        video.play();
      });
    } else {
      reject("file not valid");
    }
  });
};

/**
 *
 * @param {File} videoFile The video file
 * @returns {number} The duration of the video in seconds
 */
exports.getVideoDuration = (videoFile) => {
  return new Promise((resolve, reject) => {
    if (videoFile) {
      if (videoFile.type.match("video")) {
        importFileandPreview(videoFile).then((url) => {
          let video = document.createElement("video");
          video.addEventListener("loadeddata", function () {
            resolve(video.duration);
          });
          video.preload = "metadata";
          video.src = url;
          // Load video in Safari / IE11
          video.muted = true;
          video.playsInline = true;
          video.play();
        });
      }
    } else {
      reject(0);
    }
  });
};
