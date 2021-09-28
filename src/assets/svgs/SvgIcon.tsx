import React from 'react';
import svgIcon from './Index';

interface IconProps {
  name: keyof typeof svgIcon;
  fill?: string;
  stroke?: string;
  onClick?: () => void;
}

const SvgIcon = ({
  name,
  fill,
  stroke,
  onClick,
}: IconProps): React.ReactElement => {
  const LogoIcon = svgIcon[name];

  return <LogoIcon fill={fill} stroke={stroke} onClick={onClick} />;
};

export default SvgIcon;

SvgIcon.defaultProps = {
  fill: null,
  stroke: null,
  onClick: null,
};
