import {
  Op,
  fn,
  col,
  where as sequelizeWhere,
} from 'sequelize'

import ActorModel from '../../../data/models/actor.model.js'

const getMoviesQueryOptions = ({
  actor,
  title,
  search,
  sort = 'id',
  order: orderDirection = 'ASC',
  limit = 20,
  offset = 0,
}) => {
  let where = {}
  let include = []

  if (search) {
    const term = `%${search.toLowerCase()}%`

    include = [{
      model: ActorModel,
      as: 'actors',
      through: { attributes: [] },
      required: false,
    }]

    where = {
      [Op.or]: [
        sequelizeWhere(
          fn('lower', col('Movie.title')),
          { [Op.like]: term }
        ),
        sequelizeWhere(
          fn('lower', col('actors.name')),
          { [Op.like]: term }
        ),
      ],
    }
  } else {
    if (actor) {
      include = [{
        model: ActorModel,
        as: 'actors',
        where: sequelizeWhere(
          fn('lower', col('actors.name')),
          { [Op.like]: `%${actor.toLowerCase()}%` }
        ),
        through: { attributes: [] },
      }]
    }

    if (title) {
      where = sequelizeWhere(
        fn('lower', col('Movie.title')),
        { [Op.like]: `%${title.toLowerCase()}%` }
      )
    }
  }

  return {
    where,
    include,
    order: [[sort, orderDirection]],
    limit,
    offset,
    distinct: true,
    col: 'id',
    subQuery: false,
    group: ['Movie.id'],
  }
}

export default getMoviesQueryOptions
