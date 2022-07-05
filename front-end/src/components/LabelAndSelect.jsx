import React from 'react';
import PropTypes from 'prop-types';

function LabelAndSelect({
  labelContent,
  selectId,
  optionsContent,
  onChangeEvent,
}) {
  return (
    <label htmlFor={selectId}>
      {labelContent}
      <br />
      <select
        id={selectId}
        onChange={onChangeEvent}
      >
        {
          optionsContent && optionsContent.map(({ optionContent, optionValue }) => (
            <option
              key={`${optionContent}-${optionValue}`}
              value={optionValue}
            >
              {optionContent}
            </option>
          ))
        }
      </select>
    </label>
  );
}

LabelAndSelect.propTypes = {
  labelContent: PropTypes.string.isRequired,
  selectId: PropTypes.string.isRequired,
  optionsContent: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onChangeEvent: PropTypes.func,
};

LabelAndSelect.defaultProps = {
  onChangeEvent: () => '',
};

export default LabelAndSelect;
