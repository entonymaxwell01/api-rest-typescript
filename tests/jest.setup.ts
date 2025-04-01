import supertest from "supertest";
import { server } from "../src/server/Server";

export const testSever = supertest(server);
