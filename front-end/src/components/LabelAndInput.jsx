import React from 'react';
import PropTypes from 'prop-types';

function LabelAndInput({
  labelContent,
  inputId,
  inputType,
  onChangeEvent,
}) {
  return (
    <label htmlFor={inputId}>
      {labelContent}
      <br />
      <input
        type={inputType}
        id={inputId}
        onChange={onChangeEvent}
      />
    </label>
  );
}

LabelAndInput.propTypes = {
  labelContent: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  onChangeEvent: PropTypes.func,
};

LabelAndInput.defaultProps = {
  onChangeEvent: () => '',
};

export default LabelAndInput;
