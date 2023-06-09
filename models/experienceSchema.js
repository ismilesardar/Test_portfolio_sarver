/**
 * Date: 2/04/2023
 * Subject: Portfolio All Models
 * Auth: Ismile Sardar
 */
const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Experience = mongoose.model("experience", experienceSchema);
module.exports = Experience;
