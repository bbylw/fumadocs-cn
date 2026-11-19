import { SiteHomeLayout } from '@/components/home';
import type { InkTable } from './sections/style/presets';
import { Hero } from './sections/hero';
import { Style } from './sections/style';
import { Write, type WriteCodeProps } from './sections/write';
import { Automate, type AutomateCodeProps } from './sections/automate';
import { Parts } from './sections/parts';
import { Integrations } from './sections/integrations';
import { Cli } from './sections/cli';
import { Proof } from './sections/proof';
import type { ProofMetrics } from './sections/proof/data';
import { Feedback, Wires } from './sections/feedback';
import { Start } from './sections/start';
import { StatusBar } from './ui/status-bar';

export interface LandingPageProps {
  pathname: string;
  params: Record<string, string | undefined>;
  table: InkTable;
  writeCode: WriteCodeProps;
  automateCode: AutomateCodeProps;
  metrics: ProofMetrics;
}

export function LandingPage({
  pathname,
  params,
  table,
  writeCode,
  automateCode,
  metrics,
}: LandingPageProps) {
  return (
    <SiteHomeLayout
      pathname={pathname}
      params={params}
      className="landing overflow-x-clip selection:bg-lp-yellow selection:text-lp-on-yellow sheet:[--fd-layout-width:calc(var(--lp-max)-2px-2*var(--lp-gutter)+32px)]"
    >
      <div
        data-sheet=""
        className="mx-auto w-full max-w-(--lp-max) flex-1 border-lp-line pb-(--lp-status-h) sheet:border-x"
      >
        <Hero />
        <Style table={table} />
        <Write code={writeCode} />
        <Automate code={automateCode} />
        <Parts />
        <Integrations />
        <Cli />
        <Wires>
          <Proof metrics={metrics} />
          <Feedback />
        </Wires>
        <Start />
      </div>
      <StatusBar />
    </SiteHomeLayout>
  );
}
