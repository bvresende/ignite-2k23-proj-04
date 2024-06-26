import { type PaginationParams } from '@/core/repositories/pagination-params'
import { type AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  constructor (
    private readonly answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async findById (id: string): Promise<Answer | undefined> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (answer === null) {
      return undefined
    }

    return answer
  }

  async findManyByQuestionId (questionId: string, { page }: PaginationParams): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create (answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete (answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)

    await this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }

  async save (answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer
  }
}
