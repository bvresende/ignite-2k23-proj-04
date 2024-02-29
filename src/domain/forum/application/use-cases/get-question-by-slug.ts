import { type QuestionsRepository } from '../repositories/question-repository'
import { type Question } from '../../enterprise/entities/question'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor (private readonly questionsRepository: QuestionsRepository) {}

  async execute ({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (question === undefined) {
      throw new Error('Question is not found')
    }

    return { question }
  }
}
