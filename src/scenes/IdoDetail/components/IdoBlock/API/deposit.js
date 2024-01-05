import axios from "axios";

export function saveParticipation(ido_id, wallet) {
  return axios.post(process.env.REACT_APP_API_URL + "save-participation", {
    ido: ido_id,
    wallet: wallet,
  });
}
