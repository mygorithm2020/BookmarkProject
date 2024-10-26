export interface ICustomEntity<T> {
  CreateDate: Date;
  constraintEntity(obj: T): void;
}
