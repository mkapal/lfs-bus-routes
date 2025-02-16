import { Flex, type FlexProps } from "react-node-insim";

export function FullScreenFlex(props: Omit<FlexProps,'top'|'left'| 'width'|'height'>) {
  return (
    <Flex top={0} left={0} width={200} height={200} {...props} />)
}