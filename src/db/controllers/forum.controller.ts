/* eslint-disable no-shadow */
import { Forum } from '../init'

export const findAll = (req: any, res: any) => {
  Forum.findAll()
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.'
      });
    });
}
