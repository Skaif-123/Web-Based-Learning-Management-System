import { Router } from "express";
import multer from "multer";
import { deleteMediaFromCloudinary, uploadMediaToCloudinary } from "../../helpers/cloudinary.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({ success: false, message: "Error uploading file" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Asset Id is required",
      });
    }
    await deleteMediaFromCloudinary(id);
    res.status(200).json({
      success: true,
      data: "Asset Deleted from Cloudinary",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error deleting file" });
  }
});

export default  router ;
