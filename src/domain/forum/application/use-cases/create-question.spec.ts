import { expect, test } from 'vitest'
import { type QuestionsRepository } from '../repositories/question-repository'
import { type Question } from '../../enterprise/entities/question'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionsRepository = {
  create: async (question: Question) => {}
}

test('create an question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  const question = await createQuestion.execute({
    authorId: '1',
    content: 'content',
    title: 'title'
  })

  expect(question.question.content).toEqual('content')
})
