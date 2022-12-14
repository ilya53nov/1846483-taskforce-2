import { User, UserRole,City, Review} from '@taskforce/shared-types';
import { hash, verify} from 'argon2';

export class TaskUserEntity implements User {
  public _id: string;
  public avatar: string;
  public dateBirth: Date;
  public email: string;
  public firstname: string;
  public lastname: string;
  public passwordHash: string;
  public refreshTokenHash: string;
  public role: UserRole;
  public city: City;
  public _reviews: Review[];

  constructor(taskUser: User) {
     this.fillEntity(taskUser);
  }

  public toObject() {
    return {...this};
  }

  private async getHash(hashString: string): Promise<string> {
    return await hash(hashString);
  }

  public async setPassword(password: string): Promise<TaskUserEntity> {
    this.passwordHash = await this.getHash(password);
    return this;
  }

  public async setRefreshToken(token: string): Promise<TaskUserEntity> {
    this.refreshTokenHash = await this.getHash(token);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await verify(this.passwordHash, password);
  }

  public async compareRefreshToken(token: string): Promise<boolean> {
    return await verify(this.refreshTokenHash, token);
  }

  public fillEntity(taskUser: User) {
    this._id = taskUser._id;
    this.avatar = taskUser.avatar;
    this.dateBirth = taskUser.dateBirth;
    this.email = taskUser.email;
    this.firstname = taskUser.firstname;
    this.lastname = taskUser.lastname;
    this.passwordHash = taskUser.passwordHash;
    this.refreshTokenHash = taskUser.refreshTokenHash;
    this.role = taskUser.role;
    this.city = taskUser.city;
    this._reviews = taskUser._reviews
  }  
}
