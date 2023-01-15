import { plainToInstance, ClassConstructor } from 'class-transformer'

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true});
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getAmqpConnectionString({user, password, host}): string {
  return `amqp://${user}:${password}@${host}`;
}
