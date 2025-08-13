export default function TailwindTest() {
  return (
    <div className="test-page-container">
      <div className="test-page-wrapper">
        <div className="test-content-card">
          <img src="/img/logo.svg" className="test-logo-light" alt="Tailwind Play" />
          <img src="/img/logo-dark.svg" className="test-logo-dark" alt="Tailwind Play" />
          <div className="test-content-section">
            <p className="test-intro-text">An advanced online playground for Tailwind CSS, including support for things like:</p>
            <ul className="test-feature-list">
              <li className="test-feature-item">
                <svg className="test-feature-icon" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                  <circle cx="11" cy="11" r="11" className="test-icon-fill" />
                  <circle cx="11" cy="11" r="10.5" className="test-icon-stroke" />
                  <path d="M8 11.5L10.5 14L14 8" className="test-icon-check" />
                </svg>
                <p className="test-feature-text">
                  Customizing your theme with &nbsp;
                  <code className="test-code-inline">@theme</code>
                </p>
              </li>
              <li className="test-feature-item">
                <svg className="test-feature-icon" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                  <circle cx="11" cy="11" r="11" className="test-icon-fill" />
                  <circle cx="11" cy="11" r="10.5" className="test-icon-stroke" />
                  <path d="M8 11.5L10.5 14L14 8" className="test-icon-check" />
                </svg>
                <p className="test-feature-text">
                  Adding custom utilities with &nbsp;
                  <code className="test-code-inline">@utility</code>
                </p>
              </li>
              <li className="test-feature-item">
                <svg className="test-feature-icon" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                  <circle cx="11" cy="11" r="11" className="test-icon-fill" />
                  <circle cx="11" cy="11" r="10.5" className="test-icon-stroke" />
                  <path d="M8 11.5L10.5 14L14 8" className="test-icon-check" />
                </svg>
                <p className="test-feature-text">
                  Adding custom variants with &nbsp;
                  <code className="test-code-inline">@variant</code>
                </p>
              </li>
              <li className="test-feature-item">
                <svg className="test-feature-icon" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
                  <circle cx="11" cy="11" r="11" className="test-icon-fill" />
                  <circle cx="11" cy="11" r="10.5" className="test-icon-stroke" />
                  <path d="M8 11.5L10.5 14L14 8" className="test-icon-check" />
                </svg>
                <p className="test-feature-text">Code completion with instant preview</p>
              </li>
            </ul>
            <p className="test-outro-text">Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
          </div>
          <hr className="test-divider" />
          <p className="test-cta-text">Want to dig deeper into Tailwind?</p>
          <p className="test-cta-link-wrapper">
            <a href="https://tailwindcss.com/docs" className="test-cta-link">Read the docs &rarr;</a>
          </p>
        </div>
      </div>
      <div className="test-pattern-left"></div>
      <div className="test-pattern-right"></div>
      <div className="test-pattern-top"></div>
      <div className="test-pattern-bottom"></div>
    </div>
  );
}
