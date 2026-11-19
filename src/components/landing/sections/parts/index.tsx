import { copy } from '../../content';
import { Figure, FigureHeader } from '../../ui/figure';
import { Stage } from './stage';

export function Parts() {
  return (
    <Figure id="parts" aria-label="分层架构" status="4 层架构">
      <Stage header={<FigureHeader title={copy.parts.title} />} />
    </Figure>
  );
}
