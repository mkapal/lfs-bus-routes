import { Button } from "react-node-insim";

import { useConnectionContext } from "@/global/ConnectionContext";

export function UserStatus() {
  const { connection } = useConnectionContext();

  return (
    <Button
      top={0}
      left={80}
      width={20}
      height={5}
      variant="dark"
      UCID={connection.UCID}
    >
      {connection.UName}
    </Button>
  );
}
