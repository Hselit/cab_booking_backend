import { UnitSystem } from "./node_modules/@googlemaps/google-maps-services-js/src/common";
import { Client } from "@googlemaps/google-maps-services-js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const client = new Client({});

export const getDistance = async (origin: string, destination: string) => {
  try {
    const response = await client.distancematrix({
      params: {
        origins: [origin],
        destinations: [destination],
        key: process.env.KEY!,
        units: UnitSystem.metric,
      },
    });
    console.log("Success ", response.data);
  } catch (error) {
    console.log(error);
  }
};

// getDistance("Madurai", "Bengaluru");

const getDist = async () => {
  try {
    const url = "https://api.distance.tools/api/v2/distance/route";
    const response = await axios.post(
      url,
      {
        route: [
          {
            name: "9.9252, 78.1198",
            country: "IND",
          },
          {
            name: "12.9629, 77.5775",
            country: "IND",
          },
        ],
      },
      {
        headers: {
          "X-Billing-Token": process.env.API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(JSON.stringify(response.data.steps, null, 2));
  } catch (error) {
    console.log(error);
  }
};

getDist();
