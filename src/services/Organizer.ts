import { log } from "console";
import { client } from "../imports";
import { organizer, orgTrial } from "../interfaces/organizer";
import { token } from "morgan";

class Organizer {
  /**
   * @getBy -- This prefix is used to retrive datas, usuaslly, it returs array of data
   * @findBy -- This prefix is used to search some specific data by params
   **/

  register = async (
    data: organizer,
    orgTrial: orgTrial,
    tokenId: number,
    left_days: number
  ) => {
    return await client.organizer.create({
      data: {
        name: data.name,
        surname: data.surname,
        phone_number: data.phone_number,
        email: data.email,
        password: data.password!,
        account_type: orgTrial.account_type,
        trial_period: orgTrial.trial_period,
        started_date: orgTrial.started_date,
        end_date: orgTrial.end_date!,
        is_active: orgTrial.is_active,
        tokenId,
        left_days,
      },
    });
  };
  findByEmail = async (email: string) => {
    return await client.organizer.findUnique({
      where: {
        email,
      },
      include: {
        Token: true,
      },
    });
  };
  findByPhone = async (phone_number: string) => {
    return await client.organizer.findUnique({
      where: {
        phone_number,
      },
      include: {
        Token: true,
      },
    });
  };
  findById = async (id: number) => {
    return await client.organizer.findUnique({
      where: {
        id,
      },
    });
  };
  findPassword = async (id: number) => {
    return await client.organizer.findUnique({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });
  };
  updateInfo = async (id: number, data: organizer) => {
    const hasUniqueEmail = await client.organizer.findUnique({
      where: {
        email: data.email,
      },
    });

    const hasUniquePhone = await client.organizer.findUnique({
      where: {
        phone_number: data.phone_number,
      },
    });

    const updateData = {
      name: data.name,
      surname: data.surname,
      ...(hasUniqueEmail ? false : { email: data.email }),
      ...(hasUniquePhone ? false : { phone_number: data.phone_number }),
    };

    return await client.organizer.update({
      where: {
        id,
      },
      data: updateData,
    });
  };
  updatePassword = async (id: number, new_password: string) => {
    return await client.organizer.update({
      where: {
        id,
      },
      data: {
        password: new_password,
      },
    });
  };
  getOrgInfo = async (id: number) => {
    return await client.organizer.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        phone_number: true,
        email: true,
        balance: true,
        account_type: true,
        is_active: true,
        trial_period: true,
        started_date: true,
        end_date: true,
        createdAt: true,
        updatedAt: true,
        Token: {
          select: {
            accessToken: true,
            refreshToken: true,
          },
        },
      },
    });
  };
  getInfoByToken = async (token: string) => {
    return await client.token.findUnique({
      where: {
        accessToken: token,
      },
      select: {
        Organizer: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            phone_number: true,
            is_active: true,
            balance: true,
            account_type: true,
            end_date: true,
            started_date: true,
            left_days: true,
          },
        },
      },
    });
  };
}

export const organizerService = new Organizer();
