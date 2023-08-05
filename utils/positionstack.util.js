import axios from "axios";
import { POSITION_STACK_FORWARD_GEOCODE_URI } from "../constants/dataEndpoints.constant.js";

export default async function forwardGeocode(location) {
  const updatedPositionStackForwardGeocodeUri =
    POSITION_STACK_FORWARD_GEOCODE_URI.replace(
      "{{ACCESS_KEY}}",
      process.env.POSITION_STACK_API_ACCESS_KEY
    ).replace("{{QUERY}}", location);

  const forwardGeocodeResponse = await axios.get(
    updatedPositionStackForwardGeocodeUri
  );
  const forwardGeocodeData = forwardGeocodeResponse.data;
  return forwardGeocodeData.data;
}
