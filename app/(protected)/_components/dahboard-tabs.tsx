"use client";

import { authClient } from "@/lib/auth-client";
import { Card, CardBody } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import {
  ProfileTab,
  AccountsTab,
  DangerZoneTab,
  SecurityTab,
  SessionsTab,
} from "./index";

export function DahboardTabs() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div>Loading...</div>;

  if (!session) return <div>Not logged in</div>;

  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="profile" title="Profile">
            <Card>
              <CardBody>
                <ProfileTab />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="security" title="Security">
            <Card>
              <CardBody>
                <SecurityTab />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="sessions" title="Sessions">
            <Card>
              <CardBody>
                <SessionsTab />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="accounts" title="Accounts">
            <Card>
              <CardBody>
                <AccountsTab />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="danger" title="Danger Zone">
            <Card>
              <CardBody>
                <DangerZoneTab />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
