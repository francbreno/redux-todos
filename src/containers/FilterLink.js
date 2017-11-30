// import { connect } from 'react-redux';
//
// import { setVisibilityFilter } from '../actions/visibilityFilter';
//
// const Link = ({ active, children, onClick }) =>  {
//   if (active) {
//     return <span>{children}</span>;
//   }
//
//   return (
//     <a
//       href="#"
//       onClick={e => {
//         e.preventDefault();
//         onClick();
//       }}>
//       {children}
//     </a>
//   );
// }
//
// const mapStateToProps = (state, ownProps) => ({
//   active: ownProps.filter === state.visibilityFilter,
// });
//
// const mapDispatchToProps = (dispatch, ownProps) => ({
//   onClick: () => {
//     dispatch(setVisibilityFilter(ownProps.filter))
//   },
// });
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Link);
import React from 'react';
import { NavLink } from 'react-router-dom';

import { SHOW_ALL } from '../constants/visibilityFilter';

const FilterLink = ({ filter, children }) => (
  <NavLink
    to={filter === SHOW_ALL ? `/${SHOW_ALL}` : `/${filter}`}
    activeStyle={{
      fontWeight: 'bold',
      color: 'red'
    }}
  >
    {children}
  </NavLink>
);

export default FilterLink;
