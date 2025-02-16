import {
  InterfaceMode,
  PacketType,
  ShiftUInterfaceSubmode,
} from "node-insim/packets";
import { type ReactNode, useState } from "react";
import { useConnectionScope, useOnPacket } from "react-node-insim";

type HideButtonsInAutocrossEditorProps = {
  children: ReactNode;
};

export function HideButtonsInAutocrossEditor({
  children,
}: HideButtonsInAutocrossEditorProps) {
  const connection = useConnectionScope();
  const [isInAutocrossEditor, setIsInAutocrossEditor] = useState(false);

  useOnPacket(PacketType.ISP_CIM, (packet) => {
    setIsInAutocrossEditor(
      packet.UCID === connection.UCID &&
        packet.Mode === InterfaceMode.CIM_SHIFTU &&
        packet.SubMode === ShiftUInterfaceSubmode.FVM_EDIT,
    );
  });

  if (isInAutocrossEditor) {
    return null;
  }

  return children;
}
