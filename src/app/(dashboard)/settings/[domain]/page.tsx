import { onGetCurrentDomainInfo } from "@/actions/settings";
import React from "react";
import { redirect } from "next/navigation";
import InfoBar from "@/components/infobar";
import SettingsForm from "@/components/forms/settings/form";
import BotTrainingForm from "@/components/forms/settings/bot-training";

type Props = { params: { domain: string } };

const DomainSettingsPage = async ({ params }: Props) => {
  const domain = await onGetCurrentDomainInfo(params.domain);
  if (!domain) redirect("/dashboard");
  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <SettingsForm
          plan={domain.subscription?.plan!}
          chatBot={domain.domains[0].chatBot}
          id={domain.domains[0].id}
          name={domain.domains[0].name}
        />
        <BotTrainingForm id={domain.domains[0].id} />
      </div>
    </>
  );
};

export default DomainSettingsPage;
