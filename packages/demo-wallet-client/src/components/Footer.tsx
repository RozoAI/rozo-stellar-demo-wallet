import { Layout, Modal, TextLink } from "@stellar/design-system";
import { ConfigurationModal } from "components/ConfigurationModal";
import { CSS_MODAL_PARENT_ID } from "demo-wallet-shared/build/constants/settings";
import { useRedux } from "hooks/useRedux";
import { useState } from "react";

export const Footer = () => {
  const [configModalVisible, setConfigModalVisible] = useState(false);

  const { account } = useRedux("account");

  const handleConfigModalClose = () => {
    setConfigModalVisible(false);
  };

  return (
    <>
      <Layout.Footer hideLegalLinks>
        <div className="Footer__links">
          <TextLink
            href="https://bridge.rozo.ai/faq"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--pal-text-secondary)" }}
          >
            FAQ
          </TextLink>
          <TextLink
            href="https://bridge.rozo.ai/terms"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--pal-text-secondary)" }}
          >
            Terms of Use
          </TextLink>
          <TextLink
            href="https://bridge.rozo.ai/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--pal-text-secondary)" }}
          >
            Privacy Policy
          </TextLink>
        </div>

        {/* {gitInfo?.commitHash ? (
          <div className="Footer__commitHash">{`Commit hash: ${gitInfo.commitHash}`}</div>
        ) : null} */}
        {account.isAuthenticated && (
          <div style={{ marginLeft: "auto" }}>
            <TextLink onClick={() => setConfigModalVisible(true)}>
              Configuration
            </TextLink>
          </div>
        )}
      </Layout.Footer>

      <Modal
        visible={configModalVisible}
        onClose={handleConfigModalClose}
        parentId={CSS_MODAL_PARENT_ID}
      >
        <ConfigurationModal onClose={handleConfigModalClose} />
      </Modal>
    </>
  );
};
