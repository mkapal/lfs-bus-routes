import { Flex, type FlexProps } from "react-node-insim";

export function FullWidthFlex(props: Omit<FlexProps, "left" | "width">) {
  return <Flex left={0} width={200} {...props} />;
}
