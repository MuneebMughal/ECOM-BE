const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
exports.upload = async (req, res) => {
  try {
    const { image } = req.body;
    cloudinary.uploader.upload(
      image,
      { resource_type: "auto", public_id: `${Date.now()}` },
      (error, result) => {
        if (error) {
          return res.status(400).json({
            error,
          });
        } else if (result) {
          return res.status(200).json({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      }
    );
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
exports.remove = (req, res) => {
  try {
    const { id } = req.params;
    cloudinary.uploader.destroy(id, (err, result) => {
      if (err) {
        res.status(400).json({
          message: "Error",
        });
      } else {
        res.status(200).json({
          message: "Done",
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      message: "Error",
    });
  }
};
