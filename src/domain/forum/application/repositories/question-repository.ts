import { type PaginationParams } from '@/core/repositories/pagination-params'
import { type Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  findById: (id: string) => Promise<Question | undefined>
  findBySlug: (slug: string) => Promise<Question | undefined>
  findManyRecent: (params: PaginationParams) => Promise<Question[]>
  create: (question: Question) => Promise<void>
  delete: (question: Question) => Promise<void>
  save: (question: Question) => Promise<void>
}
