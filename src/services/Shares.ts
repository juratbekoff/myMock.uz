import { client } from "../imports";

export class Share {
  /**
   * @getBy -- This prefix is used to retrive datas, usuaslly, it returs array of data
   * @findBy -- This prefix is used to search some specific data by params
   **/

  create = async (adminId: number, shareAmount: number) => {
    return await client.admin.update({
      where: {
        id: adminId,
      },
      data: {
        hasShares: true,
        ownShares: shareAmount,
      },
    });
  };
  getShareholders = async () => {
    return await client.admin.findMany({
      where: {
        hasShares: true,
      },
      select: {
        id: true,
        name: true,
        username: true,
        balance: true,
        hasShares: true,
        ownShares: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };
  getAvailableShares = async () => {
    const getShareholders = await client.admin.findMany({
      where: { hasShares: true },
      select: { ownShares: true },
    });
    const sumOwnedShares = getShareholders.reduce(
      (acc, shareholder) => acc + (shareholder.ownShares || 0),
      0
    );
    return Math.max(100 - sumOwnedShares, 0);
  };
}

export const shareService = new Share();
