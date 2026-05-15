import { humanizeKey, formatValue, shorten, PRIMARY_METADATA_FIELDS } from '@/lib/brands';
import type { Product } from '@/types';

interface MetadataLedgerProps {
  product: Product;
}

export default function MetadataLedger({ product }: MetadataLedgerProps) {
  const meta = product.metadata ?? {};
  const primaryKeys = PRIMARY_METADATA_FIELDS[product.type];

  // Order: primary fields first (in defined order), then everything else
  const orderedKeys = [
    ...primaryKeys.filter((k) => k in meta),
    ...Object.keys(meta).filter((k) => !primaryKeys.includes(k)),
  ];

  if (orderedKeys.length === 0) {
    return (
      <div className="rule-t rule-b py-6 font-mono text-hairline text-ink-mute">
        No metadata recorded for this passport
      </div>
    );
  }

  return (
    <dl className="rule-t rule-b divide-y divide-rule">
      {orderedKeys.map((key) => {
        const raw = (meta as Record<string, unknown>)[key];
        const value = formatValue(raw);
        // Long opaque strings (contract addresses, hashes) get shortened + monospaced
        const isHashy =
          typeof raw === 'string' && raw.length > 24 && /^[0-9a-fA-FxX]+$/.test(raw);

        return (
          <div
            key={key}
            className="grid grid-cols-12 gap-4 py-3 sm:py-4"
          >
            <dt className="col-span-5 font-mono text-hairline text-ink-mute sm:col-span-4">
              {humanizeKey(key)}
            </dt>
            <dd
              className={`col-span-7 sm:col-span-8 ${
                isHashy ? 'font-mono text-sm text-ink' : 'text-ink'
              } break-words`}
              title={isHashy ? String(raw) : undefined}
            >
              {isHashy ? shorten(String(raw), 8, 6) : value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
