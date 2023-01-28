import {
  CreationOptional,
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
import { ForumThemeCommentModel } from './ForumThemeCommentModel'

interface ForumThemeModel extends Model<InferAttributes<ForumThemeModel, { omit: 'comments' }>, InferCreationAttributes<ForumThemeModel, { omit: 'comments' }>> {
  id: CreationOptional<number>
  userId: number
  title: string

  createdAt: CreationOptional<Date>
  updatedAt: CreationOptional<Date>

  getComments: HasManyGetAssociationsMixin<ForumThemeCommentModel>
  addComment: HasManyAddAssociationMixin<ForumThemeCommentModel, number>
  addComments: HasManyAddAssociationsMixin<ForumThemeCommentModel, number>
  setComments: HasManySetAssociationsMixin<ForumThemeCommentModel, number>
  removeComment: HasManyRemoveAssociationMixin<ForumThemeCommentModel, number>
  removeComments: HasManyRemoveAssociationsMixin<ForumThemeCommentModel, number>
  hasComment: HasManyHasAssociationMixin<ForumThemeCommentModel, number>
  hasComments: HasManyHasAssociationsMixin<ForumThemeCommentModel, number>
  countComments: HasManyCountAssociationsMixin
  createComment: HasManyCreateAssociationMixin<ForumThemeCommentModel, 'ownerId'>

  comments?: NonAttribute<ForumThemeCommentModel[]>
}

export { ForumThemeModel }
