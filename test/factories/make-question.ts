import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  type QuestionProps
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion (override: Partial<QuestionProps> = {}, id?: UniqueEntityID): Question {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override
    },
    id
  )

  return question
}
