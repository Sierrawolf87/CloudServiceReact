import { Box, withStyles } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux';
import { CSCard, CSCardSkeleton } from '../../../modules/components/CSCard/CSCard';
import { getDisciplineList } from './DisciplineListSlice';

const styles = () => ({
  userList: {
    width: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class DisciplineListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.getDisciplineList(this.props.disciplineList.nextPage);
  }

  // eslint-disable-next-line class-methods-use-this
  windowScroll(e) {
    if ((e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight)
        && this.props.disciplineList.nextPage !== null) {
      this.props.getDisciplineList(this.props.disciplineList.nextPage);
    }
  }

  render() {
    const { classes } = this.props;
    const buttons = [
      {
        actionOnClick: () => { },
        icon: <Edit />,
      },
      {
        actionOnClick: () => { },
        icon: <Delete />,
      },
    ];
    console.log(this.props.disciplineList.disciplineListData);
    if (this.props.disciplineList.loading === false) {
      return (
        <Box className={classes.userList} onScroll={(e) => this.windowScroll(e)}>
          {this.props.disciplineList.disciplineListData.map((item) => (
            <CSCard
              key={item.id}
              header={item.id}
              title={item.shortName}
              signature={item.name}
              body=""
              buttons={buttons}
            />
          ))}
        </Box>
      );
    }
    return (
      <Box className={classes.userList}>
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  disciplineList: state.disciplineList,
});

const mapDispatchToProps = () => (dispatch) => ({
  getDisciplineList: (page, size) => dispatch(getDisciplineList(null, null, page, size)),
});

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisciplineListComponent));
