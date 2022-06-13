import ThumbnailGenerator from "video-thumbnail-generator";

export const generateThumbnail = (videoUrl) => {
  const tg = new ThumbnailGenerator({
    sourcePath: videoUrl,
    thumbnailPath: "/tmp/",
    // tmpDir: "/some/writeable/directory", //only required if you can't write to /tmp/ and you need to generate gifs
  });

  const thumb = tg.generate().then((res) => res);

  return thumb;
};
