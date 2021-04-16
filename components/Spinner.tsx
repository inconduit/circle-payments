import PropTypes from "prop-types";

interface SpinnerProps {
  size?: string;
  width?: string;
  height?: string;
  color?: string;
  thickness?: number;
  gap?: number;
  speed?: "fast" | "slow" | "default";
}

function speedSwitch(speed: string | undefined) {
  if (speed === "fast") return 600;
  if (speed === "slow") return 900;
  return 750;
}

const Spinner = ({
  color,
  speed,
  gap = 4,
  thickness = 4,
  size,
  ...props
}: SpinnerProps) => (
  <svg
    height={size}
    width={size}
    {...props}
    style={{ animationDuration: `${speedSwitch(speed)}ms` }}
    className="__react-svg-spinner_circle"
    role="img"
    aria-labelledby="title desc"
    viewBox="0 0 32 32"
  >
    <title id="title">Circle loading spinner</title>
    <desc id="desc">Image of a partial circle indicating "loading."</desc>
    <style
      dangerouslySetInnerHTML={{
        __html: `
      .__react-svg-spinner_circle{
          transition-property: transform;
          animation-name: __react-svg-spinner_infinite-spin;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
      }
      @keyframes __react-svg-spinner_infinite-spin {
          from {transform: rotate(0deg)}
          to {transform: rotate(360deg)}
      }
    `,
      }}
    />
    <circle
      role="presentation"
      cx={16}
      cy={16}
      r={16 - thickness / 2}
      stroke={color}
      fill="none"
      strokeWidth={thickness}
      strokeDasharray={Math.PI * 2 * (11 - gap)}
      strokeLinecap="round"
    />
  </svg>
);

Spinner.propTypes = {
  color: PropTypes.string,
  thickness: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),
  gap: PropTypes.oneOf([1, 2, 3, 4, 5]),
  speed: PropTypes.oneOf(["fast", "slow"]),
  size: PropTypes.string,
};

Spinner.defaultProps = {
  color: "rgba(0,0,0,0.4)",
  gap: 4,
  thickness: 4,
  size: "32px",
  speed: "slow",
  width: "32px",
  height: "32px",
};

export default Spinner;
