import {
  Heading3,
  Layout,
  Loader,
  Modal,
  TextLink,
} from "@stellar/design-system";
import { metrics } from "@stellar/frontend-helpers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ConnectAccount } from "components/ConnectAccount";
import { CreatePasskeyModal } from "components/CreatePasskeyModal";
import { AppDispatch } from "config/store";
import { METRIC_NAMES } from "demo-wallet-shared/build/constants/metricNames";
import { CSS_MODAL_PARENT_ID } from "demo-wallet-shared/build/constants/settings";
import { searchParam } from "demo-wallet-shared/build/helpers/searchParam";
import { createRandomAccount } from "ducks/account";
import { useRedux } from "hooks/useRedux";
import { ActionStatus, SearchParams } from "types/types";
import { connectPasskeyContract } from "../ducks/contractAccount";

export const Landing = () => {
  const { account, contractAccount } = useRedux("account", "contractAccount");
  const [isConnectAccountModalVisible, setIsConnectAccountModalVisible] =
    useState(false);
  const [isCreatePasskeyModalVisible, setIsCreatePasskeyModalVisible] =
    useState(false);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    metrics.emitMetric(METRIC_NAMES.viewHome);
  }, []);

  useEffect(() => {
    if (account.status === ActionStatus.SUCCESS && !account.isAuthenticated) {
      navigate(searchParam.update(SearchParams.SECRET_KEY, account.secretKey));
    }
  }, [account.secretKey, account.status, account.isAuthenticated, navigate]);

  useEffect(() => {
    if (
      contractAccount.status === ActionStatus.SUCCESS &&
      !contractAccount.isAuthenticated
    ) {
      // list XLM by default
      let newSearch = searchParam.update(
        SearchParams.CONTRACT_ASSETS,
        "XLM:native",
      );
      navigate(
        searchParam.update(
          SearchParams.CONTRACT_ID,
          contractAccount.contractId,
          new URLSearchParams(newSearch),
        ),
      );
    }
  }, [
    contractAccount,
    contractAccount.contractId,
    contractAccount.isAuthenticated,
    contractAccount.status,
    navigate,
  ]);

  const handleCreateAccount = () => {
    dispatch(createRandomAccount());
  };

  const isPending =
    account.status === ActionStatus.PENDING ||
    contractAccount.status === ActionStatus.PENDING;

  return (
    <Layout.Inset>
      <div className="Landing__container">
        <div className="Landing__section">
          <Heading3>Import or generate keypair</Heading3>

          <div className="Landing__buttons">
            <TextLink
              onClick={() => setIsConnectAccountModalVisible(true)}
              variant={TextLink.variant.secondary}
              disabled={isPending}
              underline
            >
              Provide a secret key (mainnet only)
            </TextLink>

            <div className="Layout__inline">
              <TextLink
                onClick={handleCreateAccount}
                variant={TextLink.variant.secondary}
                disabled={isPending}
                underline
              >
                Generate keypair for new account (mainnet only)
              </TextLink>

              {!isConnectAccountModalVisible && isPending && <Loader />}
            </div>
          </div>
        </div>

        <Modal
          visible={isConnectAccountModalVisible}
          onClose={() => setIsConnectAccountModalVisible(false)}
          parentId={CSS_MODAL_PARENT_ID}
        >
          <ConnectAccount />
        </Modal>

        <div className="Landing__section">
          <Heading3>Connect or create contract account</Heading3>

          <div className="Landing__buttons">
            <TextLink
              onClick={() => dispatch(connectPasskeyContract())}
              variant={TextLink.variant.secondary}
              disabled={isPending}
              underline
            >
              Connect existing contract account (mainnet only)
            </TextLink>

            <div className="Layout__inline">
              <TextLink
                onClick={() => setIsCreatePasskeyModalVisible(true)}
                variant={TextLink.variant.secondary}
                disabled={isPending}
                underline
              >
                Create new contract account using Passkey (mainnet only)
              </TextLink>
              {!isCreatePasskeyModalVisible && isPending && <Loader />}
            </div>
          </div>
        </div>

        <CreatePasskeyModal
          visible={isCreatePasskeyModalVisible}
          onClose={() => setIsCreatePasskeyModalVisible(false)}
        />
      </div>
    </Layout.Inset>
  );
};
