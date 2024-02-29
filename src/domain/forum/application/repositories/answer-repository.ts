import { type Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  findById: (id: string) => Promise<Answer | undefined>
  create: (answer: Answer) => Promise<void>
  delete: (answer: Answer) => Promise<void>
}
