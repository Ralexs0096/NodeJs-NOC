import { LogEntity } from '../../entities/log.entity';
import {CheckServiceMultiple} from "./check-service-multiple";


describe('check-service useCase', () => {
    const mockRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };const mockRepo2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };const mockRepo3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckServiceMultiple(
        [mockRepo1, mockRepo2, mockRepo3],
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls successCallback when fetch returns true', async () => {
        const wasOK = await checkService.execute('https://google.com');

        expect(wasOK).toBe(true);
        expect(mockRepo1.saveLog).toHaveBeenCalled();
        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalled();
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(successCallback).toHaveBeenCalled();

        expect(errorCallback).not.toHaveBeenCalled();
    });

    it('calls errorCallback when useCase fails', async () => {
        const wasOK = await checkService.execute('any-url-with-no-correct-format');

        expect(wasOK).toBe(false);
        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(successCallback).not.toHaveBeenCalled();

        expect(errorCallback).toHaveBeenCalled();
    });
});
