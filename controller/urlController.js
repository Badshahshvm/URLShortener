const urlModel = require("../modal/url");
const shortId = require("shortid");

const shortenUrl = async (req, res) => {
  try {
    const LongUrl = req.body.longUrl;
    const shortCode = shortId.generate();
    const shortUrl = `http://localhost:4000/${shortCode}`;

    // Save to database:
    const newUrl = new urlModel({
      shortCode: shortCode,
      longUrl: LongUrl, // Corrected to match schema field name
    });
    await newUrl.save();

    res.render("server.ejs", {
      shortUrl: shortUrl,
    });

    console.log("Successfully shortened URL:", shortUrl);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const redirectUrl = async (req, res) => {
  const shortCode = req.params.shortCode;
  // Find in database:
  try {
    const urlRecord = await urlModel.findOne({ shortCode });
    if (urlRecord) {
      res.redirect(urlRecord.longUrl);
    } else {
      res.status(404).send({
        success: false,
        message: "URL not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
};
