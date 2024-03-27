import { type Either, right } from '@/core/entities/either'
import { type AnswersRepository } from '../repositories/answer-repository'
import { type Answer } from '@/domain/forum/enterprise/entities/answer'

interface FetchAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchAnswersUseCaseResponse = Either<null, { answers: Answer[] }>

export class FetchAnswersUseCase {
  constructor (private readonly answersRepository: AnswersRepository) {}

  async execute ({
    questionId,
    page
  }: FetchAnswersUseCaseRequest): Promise<FetchAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page }
    )

    return right({ answers })
  }
}
