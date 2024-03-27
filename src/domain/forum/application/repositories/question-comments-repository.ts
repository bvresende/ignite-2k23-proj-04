import { type PaginationParams } from '@/core/repositories/pagination-params'
import { type QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  findById: (questionCommentId: string) => Promise<QuestionComment | undefined>
  findManyByQuestionId: (questionId: string, params: PaginationParams) => Promise<QuestionComment[]>
  create: (questionComment: QuestionComment) => Promise<void>
  delete: (questionComment: QuestionComment) => Promise<void>
}
