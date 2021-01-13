import React from "react";
import { Box } from "@chakra-ui/react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      mt={8}
      maxW={variant === "regular" ? "1000px" : "500px"}
      w="100%"
      mx="auto"
    >
      {children}
    </Box>
  );
};
