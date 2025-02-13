import {
  type GarageInterfaceSubmode,
  InterfaceMode,
  type NormalInterfaceSubmode,
  PacketType,
  ShiftUInterfaceSubmode,
} from "node-insim/packets";
import { type ReactNode } from "react";
import { useState } from "react";
import { useOnPacket } from "react-node-insim";

import { useConnectionContext } from "@/global/ConnectionContext";

type HideAllButtonsProps = {
  children: ReactNode;
};

export function HideButtonsInSelectModes({ children }: HideAllButtonsProps) {
  const { connection } = useConnectionContext();
  const [mode, setMode] = useState<InterfaceMode>(0);
  const [submode, setSubmode] = useState<
    GarageInterfaceSubmode | ShiftUInterfaceSubmode | NormalInterfaceSubmode
  >(0);

  useOnPacket(PacketType.ISP_CIM, (packet) => {
    if (connection.UCID === packet.UCID) {
      setMode(packet.Mode);
      setSubmode(packet.SubMode);
    }
  });

  // Layout editor
  if (
    mode === InterfaceMode.CIM_SHIFTU &&
    submode === ShiftUInterfaceSubmode.FVM_EDIT
  ) {
    return null;
  }

  return children;
}
