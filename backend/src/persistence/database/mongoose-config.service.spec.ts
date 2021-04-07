import { AppConfigService, IDatabaseConfig } from '@config';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseConfigService } from './mongoose-config.service';

class AppConfigServiceMock {
  get databaseConfig(): IDatabaseConfig {
    return {
      url: 'mock-url',
      name: 'mock-name',
      user: 'mock-user',
      password: 'mock-password',
    };
  }
}

describe('MongooseConfigService', () => {
  let mongooseConfigService: MongooseConfigService;

  beforeEach(async () => {
    const AppConfigServiceProvider = {
      provide: AppConfigService,
      useClass: AppConfigServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [MongooseConfigService, AppConfigServiceProvider],
    }).compile();

    mongooseConfigService = module.get<MongooseConfigService>(
      MongooseConfigService,
    );
  });

  it('MongooseConfigService - should be defined', () => {
    expect(mongooseConfigService).toBeDefined();
  });

  describe('createMongooseOptions', () => {
    it('should return valid options object', () => {
      const options = mongooseConfigService.createMongooseOptions();
      expect(options).not.toBeNull();
      expect(options.uri).toEqual('mock-url');
    });
  });
});
