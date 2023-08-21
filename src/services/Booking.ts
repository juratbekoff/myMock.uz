import { client } from "../imports";
import { booking } from "../interfaces";

class Booking {
  /**
   * @getBy -- This prefix is used to retrive datas, usuaslly, it returs array of data
   * @findBy -- This prefix is used to search some specific data by params
   **/

  create = async (data: booking, organizerId: number) => {
    let { listening, reading, writing, speaking } = data;

    let isFilled = listening && reading && writing && speaking ? true : false;

    return await client.booking.create({
      data: {
        examId: data.examId,
        organizerId,
        name: data.name,
        surname: data.surname!,
        phone_number: data.phone_number,
        reading: data.reading || null,
        listening: data.listening || null,
        writing: data.writing || null,
        speaking: data.speaking || null,
        overall_score: data.overall_score || null,
        isFilled,
      },
    });
  };
  findById = async (id: number) => {
    return await client.booking.findUnique({
      where: {
        id,
      },
    });
  };
  findByOrganizerId = async (organizerId: number) => {
    return await client.booking.findMany({
      where: {
        organizerId,
      },
    });
  };
  getAll = async () => {
    return await client.booking.findMany({
      select: {
        id: true,
        phone_number: true,
        organizerId: true,
        name: true,
        surname: true,
        examId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };
  getByExamId = async (examId: number) => {
    return await client.booking.findMany({
      where: {
        examId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  };
  getWithResults = async () => {
    return await client.booking.findMany();
  };
  getByUnfilled = async () => {
    return await client.booking.findMany({
      where: {
        isFilled: false,
      },
      select: {
        id: true,
        examId: true,
        organizerId: true,
      },
    });
  };
  delete = async (id: number) => {
    return await client.booking.delete({
      where: {
        id,
      },
    });
  };
  update = async (id: number, data: booking) => {
    return await client.booking.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        surname: data.surname,
        phone_number: data.phone_number,
        listening: data.listening,
        reading: data.reading,
        writing: data.writing,
        speaking: data.speaking,
        overall_score: data.overall_score,
      },
    });
  };
  changeToFilled = async (id: number) => {
    return await client.booking.update({
      where: {
        id,
      },
      data: {
        isFilled: true,
      },
    });
  };
  changeToUnFilled = async (id: number) => {
    return await client.booking.update({
      where: {
        id,
      },
      data: {
        isFilled: false,
      },
    });
  };
}

export const bookingService = new Booking();
