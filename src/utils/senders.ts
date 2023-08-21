import axios from "axios";
import { resultSender } from "../interfaces";
import { resultService } from "../services";

export const sendResults = async (data: resultSender[]) => {
  try {
    let timeout = 1000;
    let maxRetries = 5;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      let retries = 0;
      let serverResponded = true;

      while (retries < maxRetries) {
        await resultService.start(item.bookingId);

        try {
          await delay(100);
          await axios.post("http://localhost:9090/send", data);
          await resultService.finishSuccess(item.bookingId);
          console.log(`Yuborildi ID: ${item.bookingId}`);
          serverResponded = true;
          break;
        } catch (error) {
          await resultService.finishFailue(item.bookingId);
          if (error instanceof Error) {
            console.log(error.message);
          }
          serverResponded = false;
        }
        retries++;
        if (!serverResponded) {
          await delay(timeout);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
