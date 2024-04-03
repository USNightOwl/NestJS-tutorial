import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "12345",
  database: "spotify-clone",
  entities: ["dist/**/*.entity.js"],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
