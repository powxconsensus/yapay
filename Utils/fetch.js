import axios from "axios";

export const apiFetcher = async (
  id,
  params,
  method
) => {
  try {
    const response = await axios.post(
      "https://3f0f-14-195-9-98.ngrok-free.app",
      {
        id,
        params,
        method,
      },
      {
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }
    );
    // console.log("asdasd",response);
    return { response: response.data ,status : response.status};
  } catch (e) {
    console.error(`Error while fetching the data - ${e}`);
    return { response: e};
  }
};
