import { books } from "../data/books.js";
import fetch from "node-fetch";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// Helper: generate random UUID
const randomUUID = () => crypto.randomUUID();

// Helper: generate random 16 hex (buat android-id)
const randomHex = () => crypto.randomBytes(8).toString("hex");

// GET /books
export const getBooks = (req, res) => {
  try {
    let { page = 1, limit = 10, tags, genre } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let filtered = [...books];

    if (tags) {
      const tagList = tags.split(",").map((t) => t.trim().toLowerCase());
      filtered = filtered.filter((book) =>
        book.tags?.some((tag) => tagList.includes(tag.toLowerCase()))
      );
    }

    if (genre) {
      const genreList = genre.split(",").map((g) => g.trim().toLowerCase());
      filtered = filtered.filter((book) =>
        book.genre?.some((g) => genreList.includes(g.toLowerCase()))
      );
    }

    const total = filtered.length;
    const results = filtered.slice((page - 1) * limit, page * limit);

    res.json({
      success: true,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// GET /books/:id/play
export const getPlayVideo = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    // Generate random values
    const deviceId = randomUUID();
    const androidId = "ffffffff" + randomHex();
    const timestamp = Date.now();

    const url = `https://sapi.dramaboxdb.com/drama-box/chapterv2/batch/load?timestamp=${timestamp}`;

    const options = {
      method: "POST",
      headers: {
        tn: `Bearer ${process.env.DRAMABOX_BEARER}`,
        pline: "ANDROID",
        version: "430",
        vn: "4.3.0",
        userid: "278954933",
        cid: "DAUAG1050187",
        "package-name": "com.storymatrix.drama",
        apn: "2",
        "device-id": deviceId,
        "android-id": androidId,
        language: "in",
        "current-language": "in",
        p: "43",
        "local-time":
          new Date().toISOString().replace("T", " ").slice(0, 23) + " +0000",
        "time-zone": "+0000",
        md: "Redmi Note 7",
        ov: "9",
        mf: "XIAOMI",
        tz: "0",
        brand: "Xiaomi",
        srn: "1080x2340",
        ins: timestamp.toString(),
        mbid: "10000000000",
        mchid: "DAUAG1050187",
        nchid: "DRA1000042",
        lat: "0",
        build: "Build/PQ3A.190801.002",
        locale: "in_ID",
        "over-flow": "new-fly",
        instanceid: randomUUID(),
        "country-code": "ID",
        "store-source": "store_google",
        afid: timestamp.toString(),
        is_vpn: "0",
        is_root: "1",
        is_emulator: "0",
        "active-time": "34764",
        "content-type": "application/json; charset=UTF-8",
        host: "sapi.dramaboxdb.com",
        connection: "Keep-Alive",
        "accept-encoding": "gzip",
        "user-agent": "okhttp/4.10.0",
      },
      body: JSON.stringify({
        boundaryIndex: 0,
        comingPlaySectionId: -1,
        index: -1,
        currencyPlaySource: "discover_175_rec",
        needEndRecommend: 0,
        currencyPlaySourceName: "首页发现_Untukmu_推荐列表",
        preLoad: false,
        rid: "",
        pullCid: "",
        loadDirection: 0,
        startUpKey: randomUUID(),
        bookId: id,
      }),
    };

    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`External API error: ${response.status}`);

    const data = await response.json();
    if (data.success) {
      res.json({
        success: true,
        respon: data,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Error fetching play video",
        error: "External API error",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching play video",
      error: err.message,
    });
  }
};
