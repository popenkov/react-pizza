import classnames from "classnames";

const Button = ({ children, className }) => {
  return (
    <a href="/cart.html" className={classnames("button", className)}>
      {children}
    </a>
  );
};

export default Button;
