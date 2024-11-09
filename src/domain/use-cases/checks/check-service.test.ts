import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';

describe('check-service useCase', () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();
  const checkService = new CheckService(
    mockRepository,
    successCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls successCallback when fetch returns true', async () => {
    const wasOK = await checkService.execute('https://google.com');

    expect(wasOK).toBe(true);
    expect(mockRepository.saveLog).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(successCallback).toHaveBeenCalled();

    expect(errorCallback).not.toHaveBeenCalled();
  });

  it('calls errorCallback when useCase fails', async () => {
    const wasOK = await checkService.execute('any-url-with-no-correct-format');

    expect(wasOK).toBe(false);
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(successCallback).not.toHaveBeenCalled();

    expect(errorCallback).toHaveBeenCalled();
  });
});
