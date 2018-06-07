export default function setFilter(filter) {
  if (this.props.filter === filter) {
    filter = '';
  }
  this.props.setFilter(filter);
}
