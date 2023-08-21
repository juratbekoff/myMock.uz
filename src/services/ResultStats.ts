import { client } from "../imports";

class ResultStats {
  /**
   * @getBy -- This prefix is used to retrive datas, usuaslly, it returs array of data
   * @findBy -- This prefix is used to search some specific data by params
   **/

  unFilledCount = async (examId: number) => {
    return await client.booking.count({
      where: {
        examId,
        isFilled: false,
      },
    });
  };
  finishedCount = async (examId: number) => {
    return await client.booking.count({
      where: {
        status: "FINISHED",
      },
    });
  };
  notStartedCount = async (examId: number) => {
    return await client.booking.count({
      where: {
        examId,
        status: "NOT_START",
      },
    });
  };
  sendingCount = async (examId: number) => {
    return await client.booking.count({
      where: {
        examId,
        status: "SENDING",
      },
    });
  };
  sentCount = async (examId: number) => {
    return await client.booking.count({
      where: {
        examId,
        isSent: true,
        status: "FINISHED",
      },
    });
  };
  unSentCount = async (examId: number) => {
    return await client.booking.count({
      where: {
        examId,
        isSent: false,
        status: "FINISHED",
      },
    });
  };
}

export const resultStatsService = new ResultStats();
