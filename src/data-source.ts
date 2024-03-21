import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
});
