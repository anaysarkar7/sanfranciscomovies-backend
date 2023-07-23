import axios from "axios";
import { POSITION_STACK_REVERSE_GEOCODE_URI } from "../constants/dataEndpoints.constant.js";

export default async function reverseGeocode(location) {
  const updatedPositionStackReverseGeocodeUri =
    POSITION_STACK_REVERSE_GEOCODE_URI.replace(
      "{{ACCESS_KEY}}",
      process.env.POSITION_STACK_API_ACCESS_KEY
    ).replace("{{QUERY}}", location);

  const reverseGeocodeResponse = await axios.get(
    updatedPositionStackReverseGeocodeUri
  );
  const reverseGeocodeData = reverseGeocodeResponse.data;
  return reverseGeocodeData.data;
}
