import { getCookie } from "./CookieUtils";
import jwtDecode from "jwt-decode";

export default function getCurrentUser(currentUser) {
  const token = getCookie("x-access-token");
  const decoded = jwtDecode(token);
  currentUser = decoded.username;

  return currentUser;
}
