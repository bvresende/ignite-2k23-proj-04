import { type PaginationParams } from '@/core/repositories/pagination-params'
import { type AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { type AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
implements AnswerCommentsRepository {
  public items: AnswerComment[] = []

  async create (answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }

  async delete (answerComment: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answerComment.id)

    this.items.splice(itemIndex, 1)
  }

  async findById (id: string): Promise<AnswerComment | undefined> {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (questionComment === null) {
      return undefined
    }

    return questionComment
  }

  async findManyByAnswerId (answerId: string, { page }: PaginationParams): Promise<AnswerComment[]> {
    const answerComment = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComment
  }
}
