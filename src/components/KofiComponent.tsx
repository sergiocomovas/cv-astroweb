import { h } from 'preact';

const KofiWidget = ({ text = "PROPINAS", color = "#29abe0", id = "R6R52N4QJ/donate" }) => {
  const widgetStyle = {
    fontFamily: "'Quicksand', Helvetica, Century Gothic, sans-serif",
    color: "#fff",
    letterSpacing: "-0.15px",
    verticalAlign: "middle",
    lineHeight: "33px",
    padding: 0,
    textAlign: "center",
    textDecoration: "none",
    textShadow: "0 1px 1px rgba(34, 34, 34, 0.05)",
  };

  const kofiTextStyle = {
    color: "#fff",
    textDecoration: "none"
  };

  const buttonStyle = {
    boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.2)",
    lineHeight: "36px",
    minWidth: "150px",
    display: "inline-block",
    backgroundColor: color,
    padding: "2px 12px",
    textAlign: "center",
    borderRadius: "7px",
    color: "#fff",
    cursor: "pointer",
    overflowWrap: "break-word",
    verticalAlign: "middle",
    border: "0 none #fff",
    textDecoration: "none",
    textShadow: "none",
    fontWeight: "700",
    fontSize: "14px",
  };

  const kofiImgStyle = {
    height: "15px",
    width: "22px",
    display: "initial",
    animation: "kofi-wiggle 3s infinite"
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Quicksand:400,700" rel="stylesheet" type="text/css" />

      <style>
        {`
          .btn-container {
            display: inline-block!important;
            white-space: nowrap;
            min-width: 160px;
          }

          .kofitext img.kofiimg {
            height: 15px!important;
            width: 22px!important;
            display: initial;
            margin-right: 5px;
            animation: kofi-wiggle 3s infinite;
          }

          @keyframes kofi-wiggle {
            0% { transform: rotate(0) scale(1) }
            60% { transform: rotate(0) scale(1) }
            75% { transform: rotate(0) scale(1.12) }
            80% { transform: rotate(0) scale(1.1) }
            84% { transform: rotate(-10deg) scale(1.1) }
            88% { transform: rotate(10deg) scale(1.1) }
            92% { transform: rotate(-10deg) scale(1.1) }
            96% { transform: rotate(10deg) scale(1.1) }
            100% { transform: rotate(0) scale(1) }
          }
        `}
      </style>

      <div class="btn-container">
        <a title="Support me on ko-fi.com" class="kofi-button" style={buttonStyle} href={`https://ko-fi.com/${id}`} target="_blank">
          <span class="kofitext" style={{ ...widgetStyle, ...kofiTextStyle }}>
            <img src="https://storage.ko-fi.com/cdn/cup-border.png" alt="Ko-fi donations" class="kofiimg" style={kofiImgStyle} />
            {text}
          </span>
        </a>
      </div>
    </>
  );
};

export default KofiWidget;
