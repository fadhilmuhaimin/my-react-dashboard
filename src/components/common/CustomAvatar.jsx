import React from "react";
import PropTypes from "prop-types";
import { Avatar as AntdAvatar } from "antd";
import { getRandomColorFromString } from "../../utils/get-random-color";
import { getNameInitials } from "../../utils/get-name-initials";



const CustomAvatarComponent = ({ name = "", style, ...rest }) => {
  return (
    <AntdAvatar
      alt={name}
      size="small"
      style={{
        backgroundColor: rest?.src
          ? "transparent"
          : getRandomColorFromString(name),
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style,
      }}
      {...rest}
    >
      {getNameInitials(name)}
    </AntdAvatar>
  );
};

// Tambahkan validasi properti menggunakan prop-types
CustomAvatarComponent.propTypes = {
  name: PropTypes.string, // Nama opsional (string)
  style: PropTypes.object, // Gaya opsional (object)
  src: PropTypes.string, // Sumber gambar opsional (string)
};

// Gunakan React.memo untuk optimalisasi
export const CustomAvatar = React.memo(
  CustomAvatarComponent,
  (prevProps, nextProps) => {
    return prevProps.name === nextProps.name && prevProps.src === nextProps.src;
  },
);
