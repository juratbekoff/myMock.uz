import { client } from "../imports";
import { booking, result } from "../interfaces";

class Result {
  /**
   * @getBy -- This prefix is used to retrive datas, usuaslly, it returs array of data
   * @findBy -- This prefix is used to search some specific data by params
   **/

  createAndUpdate = async (data: result, bookingId: number) => {
    return await client.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        listening: data.listening,
        reading: data.reading,
        writing: data.writing,
        speaking: data.speaking,
        overall_score: data.overall_score,
        isFilled: true,
      },
    });
  };
  start = async (bookingId: number) => {
    return await client.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "SENDING",
      },
    });
  };
  finishSuccess = async (bookingId: number) => {
    return await client.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        isSent: true,
        status: "FINISHED",
      },
    });
  };
  finishFailue = async (bookingId: number) => {
    return await client.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        isSent: false,
        status: "UNSENT",
      },
    });
  };
  getCounts = async (examId: number) => {
    let sending = await client.booking.count({
      where: {
        examId,
        status: "SENDING",
      },
    });

    let finished = await client.booking.count({
      where: {
        examId,
        status: "FINISHED",
      },
    });

    let unsent = await client.booking.count({
      where: {
        examId,
        status: "UNSENT",
      },
    });

    let not_start = await client.booking.count({
      where: {
        examId,
        status: "NOT_START",
      },
    });

    return { sending, finished, unsent, not_start };
  };
  areAllSent = async (examId: number) => {
    return await client.booking.findMany({
      where: {
        examId,
      },
      select: {
        isSent: true,
      },
    });
  };
}

export const resultService = new Result();
