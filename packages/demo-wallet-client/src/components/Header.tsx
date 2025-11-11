import { Modal, TextLink, ToggleDarkMode } from "@stellar/design-system";
import { SignOutModal } from "components/SignOutModal";
import { CSS_MODAL_PARENT_ID } from "demo-wallet-shared/build/constants/settings";
import { useRedux } from "hooks/useRedux";
import { useEffect, useMemo, useState } from "react";

export const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { account, contractAccount } = useRedux("account", "contractAccount");

  const rozoLogo = useMemo(() => {
    return isDarkMode
      ? "https://bridge.rozo.ai/rozo-white-transparent.png"
      : "https://bridge.rozo.ai/rozo-transparent.png";
  }, [isDarkMode]);

  // Check initial dark mode state from body class
  useEffect(() => {
    const isDark = document.body.classList.contains("dark-mode");
    setIsDarkMode(isDark);
  }, []);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleToggleDarkMode = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
          marginBottom: "1rem",
          paddingInline: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <TextLink
            href="https://bridge.rozo.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img src={rozoLogo} alt="Rozo" height={50} />
            <span
              style={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                color: "var(--pal-text-primary)",
                lineHeight: "1.5rem",
                marginLeft: "-1rem",
              }}
            >
              ROZO
            </span>
          </TextLink>
          <span
            style={{
              padding: "0.25rem 0.75rem",
              borderRadius: "0.5rem",
              backgroundColor: "var(--pal-brand-primary)",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Demo Wallet
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {(account.isAuthenticated || contractAccount.isAuthenticated) && (
            <TextLink
              onClick={() => setModalVisible(true)}
              style={{
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 500,
                color: "var(--pal-text-primary)",
              }}
            >
              Sign Out
            </TextLink>
          )}
          <ToggleDarkMode onToggleEnd={handleToggleDarkMode} />
        </div>
      </div>

      <Modal
        visible={modalVisible}
        onClose={handleCloseModal}
        parentId={CSS_MODAL_PARENT_ID}
      >
        <SignOutModal onClose={handleCloseModal} />
      </Modal>
    </>
  );
};
