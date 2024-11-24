import {EmailService} from "../../../presentation/email/email.service";
import {SendEmailLogs} from "./send-email-logs";
import {LogRepository} from "../../repository/log.repository";
import {LogEntity} from "../../entities/log.entity";

describe('SendEmailLogs', () => {
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValueOnce(true),
    }

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('calls sendEmail and SaveLogs', async () => {
        const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockLogRepository)

        const result = await sendEmailLogs.execute('ralexs.acu@gmail.com')
        expect(result).toBe(true)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: 'high',
            message: 'Log email sent',
            origin: 'send-email-logs.ts'
        })
    })

    it('logs in case of error', async () => {
        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValueOnce(false);

        const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockLogRepository)
        const result = await sendEmailLogs.execute('ralexs.acu@gmail.com')
        expect(result).toBe(false);

        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: 'high',
            message: 'Error: Email log not sent',
            origin: 'send-email-logs.ts'
        })
    })
})