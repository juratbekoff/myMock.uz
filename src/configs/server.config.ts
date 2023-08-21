export default {
  port: process.env.PORT || 8085,
  info: () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
    // console.log(`server re-started in ${os.uptime()} seconds!`)
  },
  bot_token: process.env.BOT_TOKEN,
};
