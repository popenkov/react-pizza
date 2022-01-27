import classnames from "classnames";
import PropTypes from "prop-types";

const Button = ({ children, className }) => {
  return (
    <button className={classnames("button", className)}>{children}</button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
