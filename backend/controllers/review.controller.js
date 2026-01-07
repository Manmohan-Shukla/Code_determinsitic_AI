import Review from "../schema/review.code.schema.js";
import failure_chance from "../services/review_service/review.failure_chance.js";
import chatgpt from "../services/llm_call.js";
import { build_prompt } from "../services/prompt/review.prompt_build1.js";
import static_analyzer from "../services/review_service/review.static_analysis.js";
import hashCode from "../utils/review.hash.js";
import mongoose from "mongoose";

export async function analyzecode(req, res) {
  // firstly we have to check whether given data is valid or not
  try {
    const { language, constraints = "", code } = req.body;
    if (!language || !code) {
      return res.status(400).json({
        error: "Language and code both are required",
      });
    }
    const codeHash = hashCode(code);
    if (code.length > 15000) {
      return res.status(400).json({
        error: "Code is too long",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const existing = await Review.findOne({
      codeHash,
      language,
      constraints,
    });

    if (existing) {
      return res.json({
        cached: true,
        explanation: existing.response,
        static_info: existing.static_info,
        failure_info: existing.failure_info,
      });
    }

    const static_info = static_analyzer(code);
    // console.log(static_info);

    const failure_info = failure_chance(static_info, constraints);

    const prompt = build_prompt(
      code,
      language,
      static_info,
      failure_info,
      constraints
    );
    // console.log(prompt);
    const response = await chatgpt(prompt);
    // console/.log(response);

    const review = await Review.create({
      user: req.user._id,
      language,
      constraints,
      codeHash,
      static_info,
      failure_info,
      response,
      model: process.env.OPENAI_MODEL,
    });

    return res.status(200).json({
      cached: false,
      static_info,
      failure_info,
      response,
      id: review._id,
    });
  } catch (err) {
    console.error("AnalyzeCode error:", err);
  }
  return res.status(500).json({
    error: "Internal server error during analysis",
  });
}

export async function getHistory(req, res) {
  try {
    // auth middleware guarantees req.user exists
    const userId = req.user._id;

    const reviews = await Review.find({ user: userId })
      .sort({ createdAt: -1 })
      .select(
        "language constraints static_info failure_info response model createdAt"
      );

    return res.status(200).json({
      count: reviews.length,
      reviews,
    });
  } catch (err) {
    console.error("getReviewHistory error:", err);
    return res.status(500).json({
      error: "Failed to fetch review history",
    });
  }
}

export async function getId(req, res) {
  try {
    const { id } = req.params;

    // Validate ObjectId early
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid review id",
      });
    }

    const review = await Review.findOne({
      _id: id,
      user: req.user._id, // 🔒 ownership check
    });

    if (!review) {
      return res.status(404).json({
        error: "Review not found",
      });
    }

    return res.status(200).json({
      review,
    });
  } catch (err) {
    console.error("getReviewById error:", err);
    return res.status(500).json({
      error: "Failed to fetch review",
    });
  }
}
