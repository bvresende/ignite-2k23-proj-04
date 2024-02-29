import type { AnswersRepository } from '@/domain/forum/application/repositories/answer-repository'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async findById (id: string): Promise<Answer | undefined> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (answer === null) {
      return undefined
    }

    return answer
  }

  async create (answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete (answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)
  }
}
