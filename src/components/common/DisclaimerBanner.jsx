import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <div className="disclaimer-banner">
      <AlertTriangle size={18} />
      <div>
        <strong>Official Advice Notice:</strong> {t('disclaimer')}
      </div>
    </div>
  );
}
