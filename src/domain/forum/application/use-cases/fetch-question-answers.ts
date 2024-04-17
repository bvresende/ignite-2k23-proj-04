import { type Either, right } from '@/core/either'
import { type AnswersRepository } from '../repositories/answer-repository'
import { type Answer } from '@/domain/forum/enterprise/entities/answer'

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswersUseCaseResponse = Either<
null,
{
  answers: Answer[]
}
>

export class FetchQuestionAnswersUseCase {
  constructor (private readonly answersRepository: AnswersRepository) {}

  async execute ({
    questionId,
    page
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page }
    )

    return right({
      answers
    })
  }
}
