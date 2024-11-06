import mongoose from 'mongoose';
import { MongoDatabase } from './mongodb/init';

describe('init MongoDB', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  it('connects to mongo db', async () => {
    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!
    });

    expect(connected).toBe(true);
  });

  it('throws an error', async () => {
    try {
      const connected = await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: 'some-url-connection-'
      });
      expect(connected).toBe(undefined);
    } catch (error) {}
  });
});
