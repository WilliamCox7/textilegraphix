export default function setSort(sort) {
  let updSort;
  if (this.state.sort === sort) {
    updSort = '';
  } else {
    updSort = sort;
  }
  let newState = Object.assign({}, this.state);
  newState.sort = updSort;
  this.setState(newState, () => this.toggle('showSort'));
}
