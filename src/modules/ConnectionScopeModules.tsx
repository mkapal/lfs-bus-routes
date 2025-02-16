import { Lines } from "@/buttons/connection/Lines";
import { Stops } from "@/buttons/connection/Stops";
import { Welcome } from "@/buttons/global/Welcome";

export function ConnectionScopeModules() {
  return (
    <>
      <Welcome />
      <Stops />
      <Lines />
    </>
  );
}
