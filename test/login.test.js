import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  iterations: 50, //executar o teste 50 vezes, 1 por segundo
  thresholds: {
    http_req_duration: ["p(90)<10", "max<1"], // 90% das requisições devem ser menores que 10ms
    http_req_failed: ["rate<0.01"], // Menos de 1% das requisições devem falhar
  },
};

export default function () {
  const url = "http://localhost:3000/login";
  const payload = JSON.stringify({
    username: "julio.lima",
    senha: "123456",
  });

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
