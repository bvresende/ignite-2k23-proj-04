import type { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findById (id: string): Promise<Question | undefined> {
    const question = this.items.find((item) => item.id.toString() === id)

    if (question === null) {
      return undefined
    }

    return question
  }

  async findBySlug (slug: string): Promise<Question | undefined> {
    const question = this.items.find((item) => item.slug.value === slug)

    if (question === null) {
      return undefined
    }

    return question
  }

  async create (question: Question): Promise<void> {
    this.items.push(question)
  }

  async delete (question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }
}
