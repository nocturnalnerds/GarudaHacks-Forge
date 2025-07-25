/**
 * Configure enviroment variables
 */
import "dotenv/config";

/////////////////////////////

import chalk from "chalk";
import app from "./app";
import { PORT } from "./config/env";
import cron from 'node-cron';
import { getWordOfTheDay , sentenceOfTheDay} from './controllers/WSOTDController';

/**
 * Start the server instance
 */
app.listen(PORT, () => {
  console.log(`${chalk.blue("[SERVER]")} Running on Port ${PORT}`);
});

cron.schedule('0 6 * * *', async () => {
    const langs = ['jawa', 'bali', 'sunda', 'madura', 'makasar'];
    for (const lang of langs) {
        try {
            const wotd = await getWordOfTheDay(lang);
            const sotd = await sentenceOfTheDay(lang);
        } catch (err) {
            console.error(`Error for ${lang}`, err);
        }
    }
});
