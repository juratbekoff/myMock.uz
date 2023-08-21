import { client } from "../imports";
import { exam } from "../interfaces";

export class Exam {
  /**
   * @getBy -- This prefix is used to retrive datas, usuaslly, it returs array of data
   * @findBy -- This prefix is used to search some specific data by params
   **/

  create = async (data: exam, organizerId: number) => {
    return await client.exams.create({
      data: {
        organizerId,
        name: data.name,
        cost: data.cost,
        exam_type: data.exam_type,
        date: data.date,
      },
    });
  };
  findById = async (id: number) => {
    return await client.exams.findUnique({
      where: {
        id,
      },
    });
  };
  getExams = async () => {
    return await client.exams.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  };
  getByAuthor = async (organizerId: number) => {
    return await client.exams.findMany({
      where: {
        organizerId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  };
  deleteOne = async (id: number) => {
    return await client.exams.delete({
      where: {
        id,
      },
    });
  };
  updateById = async (id: number, data: exam) => {
    return await client.exams.update({
      where: {
        id,
      },
      data: {
        organizerId: data.organizerId,
        name: data.name,
        cost: data.cost,
        exam_type: data.exam_type,
        date: data.date,
      },
    });
  };
}

export const examservice = new Exam();
