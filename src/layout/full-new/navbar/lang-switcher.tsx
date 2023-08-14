'use client';

import { Button, ButtonGroup } from '@nextui-org/button';

import EsFlag from '@/assets/spain-flag';
import EnFlag from '@/assets/usa-flag';
import { useChangeLocale, useCurrentLocale, useScopedI18n } from '@/i18n/client';

const LangSwitcher: React.FC = () => {
  const t = useScopedI18n('common.lang');
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  return (
    <ButtonGroup size="sm">
      <Button
        key="es"
        aria-label={t('es')}
        color={locale === 'es' ? 'primary' : 'default'}
        disabled={locale === 'es'}
        onClick={() => changeLocale('es')}
        isIconOnly
      >
        <EsFlag className="w-6 h-6" />
      </Button>
      <Button
        key="en"
        aria-label={t('en')}
        color={locale === 'en' ? 'primary' : 'default'}
        disabled={locale === 'en'}
        onClick={() => changeLocale('en')}
        isIconOnly
      >
        <EnFlag className="w-6 h-6" />
      </Button>
    </ButtonGroup>
  );
};

export { LangSwitcher };
