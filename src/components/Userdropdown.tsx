import React from "react";
import { createPopper } from "@popperjs/core";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  // const openDropdownPopover = () => {
  //   createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
  //     placement: "bottom-end"
  //   });
  //   setDropdownPopoverShow(true);
  // };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      
    </>
  );
};

export default UserDropdown;