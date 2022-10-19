// Ajax
import ajax from "../utils/axios.utils";
// Fetching Profile
export const fetchProfile = async () => {
  const { data: response } = await ajax.get("/api/me/profile");

  return response.data;
};
