import { Button } from "@strapi/design-system/Button";
import Upload from "@strapi/icons/Upload";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useI18n } from "../../hooks/useI18n";

import { ImportModal } from "../ImportModal";

const getTrad = (id) => `InjectedImportButton.${id}`;
export const InjectedImportButton = ({ fullWidth = false }) => {
  const { formatMessage } = useIntl();
  const { i18n } = useI18n();

  const [importVisible, setImportVisible] = useState(false);

  const openImportModal = () => {
    setImportVisible(true);
  };

  const closeImportModal = () => {
    setImportVisible(false);
  };

  if (!window.location.pathname.includes("collectionType/api::product.product"))
    return <></>;

  return (
    <>
      <Button
        startIcon={<Upload />}
        onClick={openImportModal}
        fullWidth={fullWidth}
      >
        {i18n("plugin.cta.import")}
      </Button>

      {importVisible && <ImportModal onClose={closeImportModal} />}
    </>
  );
};
