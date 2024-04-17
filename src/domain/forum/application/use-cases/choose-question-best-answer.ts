import { type Either, left, right } from '@/core/either'
import { type Question } from '../../enterprise/entities/question'
import { type AnswersRepository } from '../repositories/answer-repository'
import { type QuestionsRepository } from '../repositories/question-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>

export class ChooseQuestionBestAnswerUseCase {
  constructor (
    private readonly answersRepository: AnswersRepository,
    private readonly questionsRepository: QuestionsRepository
  ) {}

  async execute ({ authorId, answerId }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (answer === undefined) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if (question === undefined) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
