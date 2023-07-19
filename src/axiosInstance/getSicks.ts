/* eslint-disable no-useless-catch */
import client from "./axiosInstance";
// import axios from "axios";

export const getSicks = async (keyword: string) => {
  if (keyword.length === 0) {
    return [];
  }

  try {
    console.info("calling api");
    const response = await client.get(`sick?q=${keyword}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};
