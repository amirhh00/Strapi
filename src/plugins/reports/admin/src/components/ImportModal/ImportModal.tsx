import { Button } from "@strapi/design-system/Button";
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Flex } from "@strapi/design-system/Flex";
import { Icon } from "@strapi/design-system/Icon";
import { Loader } from "@strapi/design-system/Loader";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system/ModalLayout";
import { Portal } from "@strapi/design-system/Portal";
import { Typography } from "@strapi/design-system/Typography";
import CheckCircle from "@strapi/icons/CheckCircle";
import IconFile from "@strapi/icons/File";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./style.css";
import ImportProxy from "../../importProxy";
import { useSlug } from "../../hooks/useSlug";
import { dataFormats } from "../../utils/dataFormats";
import useAlerts from "../../hooks/useAlerts";
import { handleRequestErr } from "../../utils/error";
import { useI18n } from "../../hooks/useI18n";
import { ImportEditor } from "./components/ImportEditor";

const ModalState = {
  SUCCESS: "success",
  PARTIAL: "partial",
  UNSET: "unset",
};

export const ImportModal = ({ onClose }) => {
  const { i18n } = useI18n();
  const { slug } = useSlug();
  const { notify } = useAlerts();
  const history = useHistory();

  const [data, setData] = useState("");
  const [options, setOptions] = useState({});
  const [dataFormat, setDataFormat] = useState(dataFormats.CSV);
  const [labelClassNames, setLabelClassNames] = useState(
    "plugin-ie-import_modal_input-label"
  );
  const [uploadSuccessful, setUploadSuccessful] = useState(ModalState.UNSET);
  const [uploadingData, setUploadingData] = useState(false);
  const [importFailuresContent, setImportFailuresContent] = useState("");

  const onDataChanged = (data) => {
    setData(data);
  };

  const onOptionsChanged = (options) => {
    setOptions(options);
  };

  const onReadFile = (e) => {
    const file = e.target.files[0];
    readFile(file);
  };

  const readFile = (file) => {
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setDataFormat(dataFormats.JSON);
    } else {
      throw new Error(`File type ${file.type} not supported.`);
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e?.target?.result;
      //@ts-ignore
      setData(text);
    };
    reader.readAsText(file);
  };

  const removeFile = () => {
    setData("");
  };

  const uploadData = async () => {
    setUploadingData(true);
    try {
      //@ts-ignore
      const res = await ImportProxy.importData({
        slug,
        data,
        format: dataFormat,
        ...options,
      });

      const { failures } = res;
      if (!failures.length) {
        setUploadSuccessful(ModalState.SUCCESS);
        notify(
          i18n("plugin.message.import.success.imported.title"),
          i18n("plugin.message.import.success.imported.message"),
          "success"
        );
        refreshView();
      } else {
        setUploadSuccessful(ModalState.PARTIAL);
        setImportFailuresContent(JSON.stringify(failures, null, "\t"));
        notify(
          i18n("plugin.message.import.error.imported-partial.title"),
          i18n("plugin.message.import.error.imported-partial.message"),
          "danger"
        );
      }
    } catch (err) {
      handleRequestErr(err, {
        403: () =>
          notify(
            i18n("plugin.message.import.error.forbidden.title"),
            i18n("plugin.message.import.error.forbidden.message"),
            "danger"
          ),
        413: () =>
          notify(
            i18n("plugin.message.import.error.payload-too-large.title"),
            i18n("plugin.message.import.error.payload-too-large.message"),
            "danger"
          ),
        default: () =>
          notify(
            i18n("plugin.message.import.error.unexpected.title"),
            i18n("plugin.message.import.error.unexpected.message"),
            "danger"
          ),
      });
    } finally {
      setUploadingData(false);
    }
  };

  const refreshView = () => {
    history.push("/tmp");
    history.goBack();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLabelClassNames(
      [
        labelClassNames,
        "plugin-ie-import_modal_input-label--dragged-over",
      ].join(" ")
    );
  };

  const handleDragLeave = () => {
    setLabelClassNames(
      labelClassNames.replace(
        "plugin-ie-import_modal_input-label--dragged-over",
        ""
      )
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDragLeave();
    const file = e.dataTransfer.files[0];
    readFile(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data);
    notify("Copied", "", "success");
  };

  const showLoader = uploadingData;
  const showFileDragAndDrop =
    !uploadingData && uploadSuccessful === ModalState.UNSET && !data;
  const showEditor =
    !uploadingData && uploadSuccessful === ModalState.UNSET && data;
  const showSuccess = !uploadingData && uploadSuccessful === ModalState.SUCCESS;
  const showPartialSuccess =
    !uploadingData && uploadSuccessful === ModalState.PARTIAL;

  const showImportButton = showEditor;
  const showRemoveFileButton = showEditor;

  return (
    <Portal>
      <ModalLayout onClose={onClose} labelledBy="title">
        <ModalHeader>
          <Typography
            fontWeight="bold"
            textColor="neutral800"
            as="h2"
            id="title"
          >
            {i18n("plugin.cta.import")}
          </Typography>
        </ModalHeader>
        <ModalBody className="plugin-ie-import_modal_body">
          {showFileDragAndDrop && (
            <Flex>
              <label
                className={labelClassNames}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <span style={{ fontSize: 80 }}>
                  <IconFile />
                </span>
                <Typography
                  style={{ fontSize: "1rem", fontWeight: 500 }}
                  textColor="neutral600"
                  as="p"
                >
                  {i18n("plugin.import.drag-drop-file")}
                </Typography>
                <input type="file" accept=".xlsx" onChange={onReadFile} />
              </label>
            </Flex>
          )}
          {showLoader && (
            <>
              <Flex justifyContent="center">
                <Loader>{i18n("plugin.import.importing-data")}</Loader>
              </Flex>
            </>
          )}
          {showEditor && (
            <ImportEditor
              data={data}
              dataFormat={dataFormat}
              slug={slug}
              onDataChanged={onDataChanged}
              onOptionsChanged={onOptionsChanged}
            />
          )}
          {showSuccess && (
            <>
              <EmptyStateLayout
                icon={
                  <Icon
                    width="6rem"
                    height="6rem"
                    color="success500"
                    as={CheckCircle}
                  />
                }
                content={i18n(
                  "plugin.message.import.success.imported-successfully"
                )}
                action={
                  <Button onClick={onClose} variant="tertiary">
                    {i18n("plugin.cta.close")}
                  </Button>
                }
              />
            </>
          )}
          {showPartialSuccess && (
            <>
              <Typography textColor="neutral800" fontWeight="bold" as="h2">
                {i18n("plugin.import.partially-failed")}
              </Typography>
              <Typography textColor="neutral800" as="p">
                {i18n("plugin.import.detailed-information")}
              </Typography>
              {/* <Editor content={importFailuresContent} language={'json'} readOnly /> */}
            </>
          )}
        </ModalBody>
        <ModalFooter
          startActions={
            <>
              {showRemoveFileButton && (
                <Button onClick={removeFile} variant="tertiary">
                  {i18n("plugin.cta.remove-file")}
                </Button>
              )}
            </>
          }
          endActions={
            <>
              {showImportButton && (
                <Button onClick={uploadData}>
                  {i18n("plugin.cta.import")}
                </Button>
              )}
              {showPartialSuccess && (
                <Button variant="secondary" onClick={copyToClipboard}>
                  {i18n("plugin.cta.copy-to-clipboard")}
                </Button>
              )}
            </>
          }
        />
      </ModalLayout>
    </Portal>
  );
};
