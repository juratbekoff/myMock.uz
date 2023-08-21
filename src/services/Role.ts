import { client } from "../imports";
import { role } from "../interfaces";
import { Permissions } from "../constants";

export class Role {
  create = async (data: role, adminId: number) => {
    return await client.role.create({
      data: {
        name: data.name,
        permissions: data.permissions,
        creatorId: adminId,
      },
    });
  };
  getAll = async () => {
    return await client.role.findMany();
  };
  findById = async (id: number) => {
    return await client.role.findUnique({
      where: {
        id,
      },
    });
  };
  deleteOne = async (id: number) => {
    return await client.role.delete({
      where: {
        id,
      },
    });
  };
  createAsCeo = async () => {
    let { ALL } = Permissions;

    return await client.role.create({
      data: {
        name: "CEO",
        permissions: [ALL],
      },
    });
  };
  findByName = async (name: string) => {
    return await client.role.findUnique({
      where: {
        name,
      },
    });
  };
}

export const roleService = new Role();
