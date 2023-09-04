import SaveIcon from '@mui/icons-material/Save';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

import { useScopedI18n } from '@/i18n/client';

type Props = LoadingButtonProps;

const SaveButton: React.FC<Props> = ({ variant = 'contained', ...buttonProps }) => {
  const t = useScopedI18n('common');

  return (
    <LoadingButton startIcon={<SaveIcon />} type="submit" variant={variant} {...buttonProps}>
      {t('save')}
    </LoadingButton>
  );
};

export { SaveButton };
