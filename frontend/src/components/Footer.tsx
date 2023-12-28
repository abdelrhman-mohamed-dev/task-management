import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="p-8">
      Built by{" "}
      <Link to={""} className="text-muted-foreground">
        Abdelrhman
      </Link>
      . The source code is available on{" "}
      <Link
        to={"https://github.com/abdelrhman-mohamed-dev"}
        className="text-muted-foreground"
      >
        GitHub
      </Link>
      .
    </div>
  );
};

export default Footer;
