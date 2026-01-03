import { Suspense } from "react";
import { DahboardTabs } from "../_components/dahboard-tabs";
import { UserInfo } from "../_components/user-info";

export default async function Page() {
  return (
    <main className="max-w-6xl mx-auto space-y-6">
      <Suspense fallback={<div>Loading...</div>}>
        <UserInfo />
      </Suspense>

      <DahboardTabs />
    </main>
  );
}
