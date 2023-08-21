import { client } from "../imports";
import { payment } from "../interfaces";
import { Provider } from "../constants";

export class Payment {
  /**
   * @getBy -- This prefix is used to retrive datas, usuaslly, it returs array of data
   * @findBy -- This prefix is used to search some specific data by params
   **/

  create = async (data: payment, adminId: number) => {
    return await client.payment.create({
      data: {
        adminId,
        organizerId: data.organizerId,
        amount: data.amount,
        provider: Provider.ADMIN,
      },
    });
  };
  findById = async (id: number) => {
    return await client.payment.findUnique({
      where: {
        id,
      },
    });
  };
  getAll = async () => {
    return await client.payment.findMany();
  };
  getByAuthor = async (adminId: number) => {
    return await client.payment.findMany({
      where: {
        adminId,
      },
    });
  };
  deleteOne = async (id: number) => {
    return await client.payment.delete({
      where: {
        id,
      },
    });
  };
}

export const parmentService = new Payment();
