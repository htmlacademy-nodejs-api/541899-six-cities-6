export const getUserPipeline = (userId: string) => [
  {
    $lookup: {
      from: 'users',
      let: { userId: { $toObjectId: userId } },
      pipeline: [
        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
        { $project: { _id: 0, favorites: 1 } },
      ],
      as: 'users',
    },
  },
  {
    $addFields: {
      user: { $arrayElemAt: ['$users', 0] },
    },
  },
  {
    $unset: ['users'],
  },
];


export const DEFAULT_PIPELINE = [
  {
    $project: {
      _id: 0,
      id: { $toString: '$_id' },
      user: 1,
      location: 1,
      rating: { $ifNull: [{ $avg: '$comments.rating' }, 0] },
      favorites: { $in: ['$_id', { $ifNull: ['$user.favorites', []] }] },
      totalComments: { $size: '$comments' },
      previewImage: 1,
      date: 1,
      isPremium: 1,
      price: 1,
      title: 1,
      description: 1,
      photos: 1,
      commodities: 1,
      type: 1,
      numberOfRooms: 1,
      numberOfGuests: 1,
    },
  },
];


export const COMMENTS_PIPELINE = [
  {
    $lookup: {
      from: 'comments',
      let: { offerId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$$offerId', '$offerId'] } } },
        { $project: { _id: 0, rating: 1 } },
      ],
      as: 'comments',
    },
  },
];

export const AUTHOR_PIPELINE = [
  {
    $lookup: {
      from: 'users',
      localField: 'authorId',
      foreignField: '_id',
      as: 'users',
    },
  },
  {
    $addFields: {
      author: { $arrayElemAt: ['$users', 0] },
    },
  },
  {
    $unset: ['users'],
  },
];

export const getPipeline = (userId?: string) => {
  const userPipeline = userId ? getUserPipeline(userId) : [];

  return [
    ...COMMENTS_PIPELINE,
    ...AUTHOR_PIPELINE,
    ...userPipeline,
    ...DEFAULT_PIPELINE,
  ];
};
