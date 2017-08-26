export let fakeVideoApi = {
  _list: [{
    _id: 1,
    name: 'Video 1',
    ratings: [1,2,3],
    description: 'test video number 1'
  }, {
    _id: 2,
    name: 'Video 2',
    ratings: [2,3,4],
    description: 'test video number 2'
  }, {
    _id: 3,
    name: 'Video 3',
    ratings: [3,4,5],
    description: 'test video number 3'
  }],

  list(skip?: Number, limit?: Number) {
    return Promise.resolve(this._list);
  },

  avgRating(ratings: Array<number>) {
    return 5;
  }
}
