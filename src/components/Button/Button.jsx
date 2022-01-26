import classnames from "classnames";

const Button = ({ children, className }) => {
  return (
    <button className={classnames("button", className)}>{children}</button>
  );
};

export default Button;
