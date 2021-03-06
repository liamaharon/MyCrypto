import React from 'react';

import { discordURL } from 'config';
import { NewTabLink } from 'components/ui';
import './index.scss';

const LS_KEY = 'acknowledged-beta';

interface State {
  isFading: boolean;
  hasAcknowledged: boolean;
}
export default class BetaAgreement extends React.PureComponent<{}, State> {
  public state = {
    hasAcknowledged: !!localStorage.getItem(LS_KEY),
    isFading: false
  };

  public render() {
    if (this.state.hasAcknowledged) {
      return null;
    }

    const isFading = this.state.isFading ? 'is-fading' : '';

    return (
      <div className={`BetaAgreement ${isFading}`}>
        <div className="BetaAgreement-content">
          <h2>Welcome to the New MyCrypto Beta Release Candidate!</h2>
          <p>
            You are about to use the new MyCrypto Beta Release Candidate. Although this is a release
            candidate for production, we encourage caution while using this unreleased version of
            MyCrypto.
          </p>
          <p>We hope to move this version of MyCrypto into production in the near future!</p>
          <p>
            Feedback and bug reports are greatly appreciated. You can file issues on our{' '}
            <NewTabLink href="https://github.com/MyCryptoHQ/MyCrypto/issues">
              GitHub repository
            </NewTabLink>{' '}
            or join our <NewTabLink href={discordURL}>Discord server</NewTabLink> to discuss the
            beta.
          </p>
          <p>Are you sure you would like to continue?</p>

          <div className="BetaAgreement-content-buttons">
            <button
              className="BetaAgreement-content-buttons-btn is-continue"
              onClick={this.doContinue}
            >
              Yes, continue to the Beta RC
            </button>
            <button className="BetaAgreement-content-buttons-btn is-reject" onClick={this.reject}>
              No, take me to the production site
            </button>
          </div>
        </div>
      </div>
    );
  }

  private doContinue = () => {
    localStorage.setItem(LS_KEY, 'true');
    this.setState({ isFading: true });

    setTimeout(() => {
      this.setState({ hasAcknowledged: true });
    }, 1000);
  };

  private reject = () => {
    window.location.assign('https://mycrypto.com');
  };
}
