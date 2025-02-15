import { Button } from "react-node-insim";

import { useConnectionScope } from "@/scopes/connectionScope";

export function UserName() {
  const { UCID, UName } = useConnectionScope();

  return (
    <>
      <Button
        top={0}
        left={80}
        width={20}
        height={5}
        variant="dark"
        UCID={UCID}
      >
        {UName}
      </Button>
    </>
  );
}
