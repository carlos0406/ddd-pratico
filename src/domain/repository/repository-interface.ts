export interface RepositoryInterface<T> {
  create: (entity: T) => Promise<void>
  update: (entity: T) => Promise<void>
  find: (id: number) => Promise<T>
  delete: (id: number) => Promise<void>
  findAll: () => Promise<T[]>
}
