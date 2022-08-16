import {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute
} from 'sequelize'
import { ForumThemeCommentModel } from './ForumThemeCommentModel'

export interface ForumThemeCommentAnswerModel extends Model<
  InferAttributes<ForumThemeCommentAnswerModel>,
  InferCreationAttributes<ForumThemeCommentAnswerModel>
> {
  id: CreationOptional<number>
  userId: number
  ownerId: ForeignKey<ForumThemeCommentModel['id']>
  text: string
  owner?: NonAttribute<ForumThemeCommentModel>
  createdAt: CreationOptional<Date>
  updatedAt: CreationOptional<Date>
}
