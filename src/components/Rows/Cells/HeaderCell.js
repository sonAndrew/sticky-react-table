import PropTypes from 'prop-types';
import React, { PureComponent, Fragment } from 'react';
import { pick } from 'lodash';
import classNames from 'classnames';

import CheckboxCell from '../../CheckboxCell';

import { cellPropKeys } from '../../../constants';

import { getCellStyle } from '../../../util';

export default class HeaderCell extends PureComponent {
  handleDragHandleRef = ref => {
    this.dragHadle = ref;
  };

  handleSort = () => {
    this.props.onSort(pick(this.props, cellPropKeys));
  };

  render() {
    const {
      title,
      style,
      renderer,
      onDragEnd,
      isSortable,
      sortedColumn,
      dataKey,
      isSticky,
      isLastSticky,
      id,
      checkedRows,
      onCheck,
      isCheckbox,
      isAllSelected
    } = this.props;
    const isSorted = sortedColumn && sortedColumn.dataKey === dataKey;
    const sortDir = sortedColumn ? sortedColumn.dir : '';

    return (
      <div
        className={classNames('Sticky-React-Table--Header-Cell', {
          'Sticky-React-Table--is-Sticky--is-Last': isLastSticky
        })}
        style={getCellStyle(style, isSticky)}
        onClick={this.handleSort}
      >
        {isCheckbox ? (
          <CheckboxCell
            id={id}
            renderer={renderer}
            checkedRows={checkedRows}
            onCheck={onCheck}
            isChecked={isAllSelected}
          />
        ) : (
          <Fragment>
            {renderer ? renderer(pick(this.props, cellPropKeys)) : title}
            <div
              className="Sticky-React-Table-Resize-Handler"
              draggable={true}
              onDragEnd={onDragEnd}
              ref={this.handleDragHandleRef}
            />
            {isSortable &&
              isSorted && (
                <div className="Sticky-React-Table-Sort-Icon">
                  {sortDir === 'ASC' ? (
                    <Fragment>&uarr;</Fragment>
                  ) : (
                    <Fragment>&darr;</Fragment>
                  )}
                </div>
              )}
          </Fragment>
        )}
      </div>
    );
  }
}

HeaderCell.defaultProps = {
  isSortable: true
};

HeaderCell.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object.isRequired,
  isSticky: PropTypes.bool,
  isLastSticky: PropTypes.bool,
  renderer: PropTypes.func,
  onDragEnd: PropTypes.func.isRequired,
  onSort: PropTypes.func,
  isSortable: PropTypes.bool,
  sortedColumn: PropTypes.object,
  dataKey: PropTypes.string,
  id: PropTypes.oneOfType([(PropTypes.number, PropTypes.string)]).isRequired,
  checkedRows: PropTypes.array.isRequired,
  onCheck: PropTypes.func.isRequired,
  isCheckbox: PropTypes.bool.isRequired,
  isAllSelected: PropTypes.bool.isRequired
};

HeaderCell.defaultProps = {
  isCheckbox: false
};
