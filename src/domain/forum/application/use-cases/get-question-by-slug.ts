import { type QuestionsRepository } from '../repositories/question-repository'
import { type Question } from '../../enterprise/entities/question'
import { type Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { type NotAllowedError } from './errors/not-allowed-error'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>

export class GetQuestionBySlugUseCase {
  constructor (private readonly questionsRepository: QuestionsRepository) {}

  async execute ({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (question === undefined) {
      return left(new ResourceNotFoundError())
    }

    return right({ question })
  }
}
