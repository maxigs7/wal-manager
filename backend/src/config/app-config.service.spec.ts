import { appConfig, databaseConfig } from '@config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {
  let appConfigService: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [databaseConfig, appConfig],
        }),
      ],
      providers: [AppConfigService, ConfigService],
    }).compile();

    appConfigService = module.get<AppConfigService>(AppConfigService);
  });

  it('AppConfigService - should be defined', () => {
    expect(appConfigService).toBeDefined();
  });

  it('should return valid options object', () => {
    const mockReturn = { test: true };
    jest.spyOn(ConfigService.prototype, 'get').mockReturnValue(mockReturn);
    expect(appConfigService.get('any-key')).not.toBeNull();
    expect(appConfigService.get('any-key')).toEqual(mockReturn);
  });

  describe('database config should be returned', () => {
    it('should return valid options object', () => {
      jest
        .spyOn(ConfigService.prototype, 'get')
        .mockReturnValue({ url: 'mock-url' });
      expect(appConfigService.databaseConfig).not.toBeNull();
      expect(appConfigService.databaseConfig.url).toEqual('mock-url');
    });
  });

  describe('app config should be returned', () => {
    it('should return valid options object', () => {
      jest
        .spyOn(ConfigService.prototype, 'get')
        .mockReturnValue({ env: 'development', port: 3000 });
      expect(appConfigService.appConfig).not.toBeNull();
      expect(appConfigService.appConfig.env).toEqual('development');
      expect(appConfigService.appConfig.port).toEqual(3000);
    });

    it('isDevelopment should return true when env is development', () => {
      jest
        .spyOn(ConfigService.prototype, 'get')
        .mockReturnValue({ env: 'development' });
      expect(appConfigService.isDevelopment).toBeTruthy();
    });

    it('isTest should return true when env is test', () => {
      jest
        .spyOn(ConfigService.prototype, 'get')
        .mockReturnValue({ env: 'test' });
      expect(appConfigService.isTest).toBeTruthy();
    });

    it('isProduction should return true when env is production', () => {
      jest
        .spyOn(ConfigService.prototype, 'get')
        .mockReturnValue({ env: 'production' });
      expect(appConfigService.isProduction).toBeTruthy();
    });

    it('isSwaggerEnabled should return false when env is production', () => {
      jest
        .spyOn(ConfigService.prototype, 'get')
        .mockReturnValue({ env: 'production' });
      expect(appConfigService.isSwaggerEnabled).toBeFalsy();
    });
  });
});
