import http from "k6/http";
import { sleep, check } from "k6";
import { pegarBaseURL } from "../utils/variaveis.js";
const postLogin = JSON.parse(open("./fixtures/POSTLogin.json"));

export const options = {
  stages: [
    { duration: "10s", target: 10 }, // Ramp-up to 10 users over 10 seconds
    { duration: "20s", target: 10 }, // Stay at 10 users for 20 seconds
    { duration: "10s", target: 0 }, // Ramp-down to 0 users over 10 seconds
    { duration: "20s", target: 30 }, // Ramp-up to 30 users over 20 seconds
    { duration: "20s", target: 0 }, // Ramp-down to 0 users over 20 seconds
  ],
  thresholds: {
    http_req_duration: ["p(90)<3000", "max<5000"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function login() {
  const url = `${pegarBaseURL()}/login`;
  const payload = JSON.stringify(postLogin);

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "Validar que o status é 200": (r) => r.status === 200,
    "Validar que o token é retornado": (r) => r.json("token") !== undefined,
    "Validar que o token é uma string": (r) =>
      typeof r.json("token") === "string",
    "Validar que o token não é vazio": (r) => r.json("token").length > 0,
  });

  sleep(1);
}
