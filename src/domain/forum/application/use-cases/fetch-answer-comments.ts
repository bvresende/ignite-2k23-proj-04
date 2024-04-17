import { type AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { type AnswerComment } from '../../enterprise/entities/answer-comment'
import { type Either, right } from '@/core/either'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<null, { answerComments: AnswerComment[] }>

export class FetchAnswerCommentsUseCase {
  constructor (private readonly answersCommentsRepository: AnswerCommentsRepository) {}

  async execute ({
    answerId,
    page
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answersCommentsRepository.findManyByAnswerId(
      answerId,
      { page }
    )

    return right({ answerComments })
  }
}
