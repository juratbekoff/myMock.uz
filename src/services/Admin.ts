import { client } from "../imports";
import { admin } from "../interfaces";

export class Admin {
  create = async (data: admin, tokenId: number, creatorId?: number) => {
    return await client.admin.create({
      data: {
        creatorId,
        name: data.name,
        username: data.username,
        password: data.password,
        roleId: data.roleId,
        tokenId,
      },
    });
  };
  findById = async (id: number) => {
    return await client.admin.findUnique({
      where: {
        id,
      },
      include: {
        Role: true,
      },
    });
  };
  findByUsername = async (username: string) => {
    return await client.admin.findUnique({
      where: {
        username,
      },
      include: {
        Token: true,
      },
    });
  };
  findPassword = async (id: number) => {
    return await client.admin.findUnique({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });
  };
  updateInfo = async (id: number, name: string, username: string) => {
    return await client.admin.update({
      where: {
        id,
      },
      data: {
        name,
        username,
      },
    });
  };
  updatePassword = async (id: number, new_password: string) => {
    return await client.admin.update({
      where: {
        id,
      },
      data: {
        password: new_password,
      },
    });
  };
  getAdminInfo = async (id: number) => {
    return await client.admin.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        username: true,
        balance: true,
        createdAt: true,
        updatedAt: true,
        Token: {
          select: {
            accessToken: true,
            refreshToken: true,
          },
        },
        Role: {
          select: {
            permissions: true,
          },
        },
      },
    });
  };
  getAll = async () => {
    return await client.admin.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };
  deleteOne = async (id: number) => {
    return await client.admin.delete({
      where: {
        id,
      },
    });
  };
}

export const adminService = new Admin();
