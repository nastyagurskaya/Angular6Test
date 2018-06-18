import { UserboardModule } from './userboard.module';

describe('UserboardModule', () => {
  let userboardModule: UserboardModule;

  beforeEach(() => {
    userboardModule = new UserboardModule();
  });

  it('should create an instance', () => {
    expect(userboardModule).toBeTruthy();
  });
});
