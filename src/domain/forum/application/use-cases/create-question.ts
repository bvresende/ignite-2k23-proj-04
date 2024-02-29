import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { type QuestionsRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor (private readonly questionsRepository: QuestionsRepository) {}

  async execute ({ authorId, title, content }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      content,
      title,
      authorId: new UniqueEntityID(authorId)
    })

    await this.questionsRepository.create(question)

    return { question }
  }
}
