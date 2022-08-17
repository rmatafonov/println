import {
  CreationOptional,
  ForeignKey,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute
} from 'sequelize'
import { ForumThemeModel } from './ForumThemeModel'
import { ForumThemeCommentAnswerModel } from './ForumThemeCommentAnswerModel'

interface ForumThemeCommentModel extends Model<
  InferAttributes<ForumThemeCommentModel, { omit: 'answers' }>,
  InferCreationAttributes<ForumThemeCommentModel, { omit: 'answers' }>
> {
  id: CreationOptional<number>
  userId: number
  ownerId: ForeignKey<ForumThemeModel['id']>
  text: string
  owner?: NonAttribute<ForumThemeModel>

  createdAt: CreationOptional<Date>
  updatedAt: CreationOptional<Date>

  getAnswers: HasManyGetAssociationsMixin<ForumThemeCommentAnswerModel>
  adAnswers: HasManyAddAssociationMixin<ForumThemeCommentAnswerModel, number>
  addAnswers: HasManyAddAssociationsMixin<ForumThemeCommentAnswerModel, number>
  setAnswers: HasManySetAssociationsMixin<ForumThemeCommentAnswerModel, number>
  removAnswers: HasManyRemoveAssociationMixin<ForumThemeCommentAnswerModel, number>
  removeAnswers: HasManyRemoveAssociationsMixin<ForumThemeCommentAnswerModel, number>
  haAnswers: HasManyHasAssociationMixin<ForumThemeCommentAnswerModel, number>
  hasAnswers: HasManyHasAssociationsMixin<ForumThemeCommentAnswerModel, number>
  countAnswers: HasManyCountAssociationsMixin
  creatAnswers: HasManyCreateAssociationMixin<ForumThemeCommentAnswerModel, 'ownerId'>

  answers?: NonAttribute<ForumThemeCommentAnswerModel[]>
}

export { ForumThemeCommentModel }
