import mongoose from "mongoose";
const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  release_year: {
    type: Number,
    required: false,
  },
  locations: {
    type: String,
    required: false,
  },
  fun_facts: {
    type: String,
    required: false,
  },
  production_company: {
    type: String,
    required: false,
  },
  distributor: {
    type: String,
    required: false,
  },
  director: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: false,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  actor_1: {
    type: String,
    required: false,
  },
  actor_2: {
    type: String,
    required: false,
  },
  actor_3: {
    type: String,
    required: false,
  },
});

export default mongoose.model("movie", MovieSchema);
