import randomstring from "randomstring";
import { tokenService } from "../services";
import { MainRoles } from "@prisma/client";

const generateTokens = async (role: MainRoles) => {
  let accessToken = randomstring.generate({ length: 199 });
  let refreshToken = randomstring.generate({ length: 199 });
  let tokenData = { accessToken, refreshToken };
  let generate = await tokenService.create(tokenData, role);

  return generate;
};

const tokenFormatter = (token: string) => {
  return token && token.split(" ")[1];
};

export { generateTokens, tokenFormatter };
