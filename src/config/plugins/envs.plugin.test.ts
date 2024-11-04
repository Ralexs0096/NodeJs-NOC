import { envs } from './envs.plugin';

describe('envs.plugins.ts', () => {
  it('returns an object', () => {
    expect(envs).toEqual({
      PORT: 3000,
      EMAIL_SERVICE: 'gmail',
      MAILER_EMAIL: 'ralexs.acu@gmail.com',
      MAILER_SECRET_KEY: '2342345eui23.i2',
      PROD: false,
      MONGO_URL: 'mongodb://user:mongo-loco@localhost:27017/',
      MONGO_DB_NAME: 'NOC_TEST',
      MONGO_USER: 'user',
      MONGO_PASS: 'mongo-loco'
    });
  });

  it('returns an error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';
    try {
      await import('./envs.plugin');
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain(`"PORT" should be a valid integer`);
    }
  });
});
