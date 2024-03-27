import { type QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { type QuestionComment } from '../../enterprise/entities/question-comment'
import { type Either, right } from '@/core/entities/either'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<null, { questionComments: QuestionComment[] }>

export class FetchQuestionCommentsUseCase {
  constructor (private readonly questionsCommentsRepository: QuestionCommentsRepository) {}

  async execute ({
    questionId,
    page
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionsCommentsRepository.findManyByQuestionId(
      questionId,
      { page }
    )

    return right({ questionComments })
  }
}
