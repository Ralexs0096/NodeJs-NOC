import {MongoDatabase} from "../../data/mongodb/init";
import {envs} from "../../config/plugins/envs.plugin";
import mongoose from "mongoose";
import {MongoLogDatasource} from "./mongo-log.datasource";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";
import {LogModel} from "../../data/mongodb/models/log.model";

describe('Mongo log datasource', () => {
    const logDatasource = new MongoLogDatasource();
    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test message',
        origin: 'mongo-log.datasource.test.ts'
    });

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        })
    })

    afterAll(async () => {
        await mongoose.connection.close();
    })

    afterEach(async () => {
        await LogModel.deleteMany();
    })

    it('creates a log', async () => {
        const logSpy = jest.spyOn(console, 'log')

        await logDatasource.saveLog(log)

        expect(logSpy).toHaveBeenCalledWith("Mongo Log created: ", expect.any(String))
    });

    it('gets logs', async () => {
        await logDatasource.saveLog(log)

        const logs = await logDatasource.getLogs(LogSeverityLevel.medium);
        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.medium)
    })
});