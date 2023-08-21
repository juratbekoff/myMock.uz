import { MainRoles } from "@prisma/client";
import { client } from "../imports";
import { token } from "../interfaces";

export class Token {
  /**
   * @getBy -- This prefix is used to retrive datas, usually, it returs array of data
   * @findBy -- This prefix is used to search some specific data by params
   **/

  create = async (data: token, role: MainRoles) => {
    return await client.token.create({
      data: {
        adminId: data.adminId,
        organizerId: data.organizerId,
        accessToken: data.accessToken!,
        refreshToken: data.refreshToken!,
        userRole: role,
        lastGeneratedAt: new Date(),
      },
    });
  };
  findByAccessToken = async (accessToken: string) => {
    return await client.token.findUnique({
      where: {
        accessToken,
      },
    });
  };
  findByRefreshToken = async (refreshToken: string) => {
    return await client.token.findUnique({
      where: {
        refreshToken,
      },
    });
  };
  findByRoleId = async (roleId: number, role: MainRoles) => {
    switch (role) {
      case MainRoles.ADMIN:
        return await client.token.findUnique({
          where: {
            adminId: roleId,
          },
        });
      case MainRoles.ORGANIZER:
        return await client.token.findUnique({
          where: {
            organizerId: roleId,
          },
        });
      default:
        return "Unexpected err while sending data to database| token!";
    }
  };
  findById = async (id: number) => {
    return await client.token.findUnique({
      where: {
        id,
      },
    });
  };
  updateByToken = async (token: string, data: token) => {
    return await client.token.update({
      where: {
        accessToken: token,
      },
      data: {
        organizerId: data.organizerId,
        adminId: data.adminId,
      },
    });
  };
  refreshToken = async (
    refreshToken: string,
    newAccessToken: string,
    newRefreshToken: string
  ) => {
    return await client.token.update({
      where: {
        refreshToken,
      },
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        lastGeneratedAt: new Date(),
        isExpired: false,
      },
    });
  };
  deactivateAccessToken = async (accessToken: string) => {
    await client.token.update({
      where: {
        accessToken,
      },
      data: {
        isExpired: true,
      },
    });
  };
}

export const tokenService = new Token();
