export default function setSort(sort) {
  let updSort;
  if (this.state.sort === sort) updSort = '';
  else updSort = sort;
  this.setState({ sort: updSort });
}
