import "./Error.scss";

function Error({ errorMessage }: { errorMessage: string }) {
  const goToHome = () => {
    window.location.pathname = "/";
  };

  return (
    <div className="error-page">
      <div id="error-message">
        <span>{errorMessage}</span>
        <button type="button" onClick={goToHome}>
          Reload
        </button>
      </div>
    </div>
  );
}

export default Error;
